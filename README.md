# Fashion

Fashion is a full-stack fashion storefront built with Next.js. It lets customers browse a clothing catalog, manage an account and shopping cart, and place orders using cash on delivery or Stripe Checkout. Store administrators can manage products and orders through protected admin pages.

This README describes the implementation in this repository. It is not a deployment or business policy specification: where the code does not enforce a behavior, that is stated explicitly.

## Project overview

The application brings together a customer-facing storefront, account and order management, and an administration area. Its main objectives are to:

- Present products with category/type filters, sorting, images, sizes, colors, and stock information.
- Support email/password accounts and Google sign-in through Better Auth.
- Persist a cart in the browser and guide signed-in customers through checkout.
- Create orders and track their payment and fulfillment status.
- Give administrators product, order, and dashboard views.

The project uses Next.js App Router for pages and server endpoints, Prisma for PostgreSQL persistence, Better Auth for authentication, Cloudinary for product images, and Stripe for online checkout and payment confirmation.

## Project context and workflows

### Browse and select products

The home page highlights the latest collection and best sellers. The shop page can filter by the `MEN`, `WOMEN`, or `CHILDREN` category and by product type, and sort by price or creation date. A product page presents its product details and available images, sizes, and colors. Products and their options are stored in the database; product image files are uploaded to Cloudinary.

The cart is a client-side Zustand store persisted in browser storage under `cart-storage`. A cart line includes the selected product, size, and color. The cart store calculates item count and subtotal; it is not a database entity.

### Sign in and manage an account

Better Auth handles email/password and Google sign-in. Its Next.js handler is mounted at `/api/auth/[...all]`. A signed-in customer can view and update profile information, a default shipping address, and their own orders. The account and checkout pages redirect unauthenticated visitors to sign-in.

### Checkout and order lifecycle

Checkout requires an authenticated customer and collects shipping details. It offers:

1. **Cash on delivery:** the server checks product availability, creates an order with pending payment status, and reduces product stock.
2. **Stripe:** the server creates a Stripe Checkout Session using current database product prices and includes the shipping details and cart lines as session metadata. Stripe's `checkout.session.completed` webhook creates the order only after Stripe reports the session as paid. The success page waits for that webhook-created order before redirecting to its detail page.

Order totals and line-item prices are computed from products fetched from the database, rather than trusting prices in the browser cart. The order creation path currently sets shipping to zero and calculates tax at 5%. The checkout UI currently displays tax at 8%, so the displayed estimate can differ from the persisted order and Stripe charge. Confirm the intended tax rate and reconcile these paths before relying on the displayed total.

When creating an order, the server uses the customer's first default address if one exists; otherwise, it creates a default address from the submitted checkout details. It does not create a separate address for each order. A submitted address that differs from an existing default is therefore not automatically used as that order's linked address.

Order status and payment status are separate. Order status supports `PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`, and `CANCELLED`; payment status supports `PENDING`, `PAID`, `FAILED`, and `REFUNDED`. Admin order pages can view orders and update order status.

### Administration

Admin pages are guarded by `requireAdmin`, which checks the current user's `role`. Administrators can view dashboard counts, product and order pages, and add products. Product creation uploads between one and four images to Cloudinary and saves image metadata, sizes, colors, category, type, price, and stock in PostgreSQL.

## Entities and models

All persistent models below are defined in [`prisma/schema.prisma`](./prisma/schema.prisma). Prisma model names are shown in **bold**; the database table names are shown in parentheses.

### Identity and account

- **User** (`user`) — a customer or administrator. Fields: `id` (string primary key), `name`, unique `email`, `emailVerified` (default `false`), optional `image`, optional `phone`, `role` (`USER` by default), `createdAt`, and `updatedAt`. A user owns sessions, auth accounts, addresses, and orders. The schema does not define a separate customer or admin model; the role distinguishes them.
- **Session** (`session`) — Better Auth session state. Fields: `id`, `expiresAt`, unique `token`, `createdAt`, `updatedAt`, optional `ipAddress`, optional `userAgent`, and required `userId`. The user relation is indexed and cascades on user deletion.
- **Account** (`account`) — authentication-provider account and credential/token data. Fields: `id`, `accountId`, `providerId`, `userId`, optional `accessToken`, `refreshToken`, `idToken`, `accessTokenExpiresAt`, `refreshTokenExpiresAt`, `scope`, and `password`, plus `createdAt` and `updatedAt`. `userId` is indexed and cascades on user deletion.
- **Verification** (`verification`) — a verification value for an `identifier`, with `id`, `value`, `expiresAt`, `createdAt`, and `updatedAt`. `identifier` is indexed. No foreign key to `User` is defined.

### Store, catalog, and fulfillment

- **Address** (`address`) — a user's saved shipping address. Fields: `id` (CUID), `firstName`, `lastName`, `phone`, `street`, `state`, optional `postalCode`, `city`, `county`, `isDefault` (default `false`), and required `userId`. `county` is the schema field used by the application for the submitted country value. An address belongs to one user and may be linked to multiple orders.
- **Product** (`product`) — a catalog item. Fields: `id` (CUID), `name`, `description`, `price` (`Decimal(10,2)`), `stock` (integer, default `0`), `category`, `productType`, `bestSeller` (default `false`), `createdAt`, and `updatedAt`. A product has image, size, and color records and may be referenced by order items.
- **ProductImage** (`productImage`) — image metadata for one product: `id` (CUID), `imageUrl`, Cloudinary `publicId`, `productId`, and `createdAt`. Deleting the product cascades to its images.
- **ProductSize** (`productSize`) — one size option for a product: `id` (CUID), `size`, `productId`, and `createdAt`. Deleting the product cascades to its size options.
- **ProductColor** (`productColor`) — one color option for a product: `id` (CUID), `name`, `value`, `productId`, and `createdAt`. Deleting the product cascades to its color options.
- **Order** (`order`) — a purchase placed by one user for one address. Fields: auto-increment integer `id`, unique `orderNumber`, optional unique `stripeSessionId`, `subtotal`, `shipping`, `tax`, and `total` (`Decimal(10,2)`), `paymentMethod`, `paymentStatus` (default `PENDING`), `status` (default `PENDING`), `createdAt`, `updatedAt`, required `userId`, and required `addressId`. An order has order items.
- **OrderItem** (`orderItem`) — a line item associating an order with a product and preserving purchase-time `quantity`, `price` (`Decimal(10,2)`), `size`, and `color`. Fields: `id` (CUID), those line-item values, optional `productId`, optional integer `orderId`, and `createdAt`. The optional product relation uses `SET NULL` on product deletion; the optional order relation cascades on order deletion. Because the product relation is optional, a line can remain even if its product is deleted.

### Enumerations

The schema restricts these fields to the following values:

| Enum | Values |
|---|---|
| `Role` | `USER`, `ADMIN` |
| `Category` | `MEN`, `WOMEN`, `CHILDREN` |
| `ProductType` | `T_SHIRTS`, `SHIRTS`, `HOODIES`, `JACKETS`, `JEANS`, `TROUSERS`, `SHORTS`, `SHOES` |
| `Size` | `XS`, `S`, `M`, `L`, `XL`, `XXL` |
| `PaymentMethod` | `STRIPE`, `CASH_ON_DELIVERY` |
| `PaymentStatus` | `PENDING`, `PAID`, `FAILED`, `REFUNDED` |
| `OrderStatus` | `PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED` |

## Database schema and relationships

The database is PostgreSQL, as declared by the Prisma datasource and migration lock. Primary keys and foreign keys enforce the relations below. Prisma maps model names to the table names in parentheses above.

```mermaid
erDiagram
    User ||--o{ Session : has
    User ||--o{ Account : has
    User ||--o{ Address : saves
    User ||--o{ Order : places
    Address ||--o{ Order : ships
    Product ||--o{ ProductImage : has
    Product ||--o{ ProductSize : offers
    Product ||--o{ ProductColor : offers
    Product o|--o{ OrderItem : referenced_by
    Order o|--o{ OrderItem : contains
    Verification {
        string id PK
        string identifier
        string value
        datetime expiresAt
    }
```

`Verification` is shown without a relationship because the schema defines no foreign key from it to another model.

### Cardinality and behavior

- **One-to-many:** one `User` can have many `Session`, `Account`, `Address`, and `Order` records. One `Address` can be associated with many `Order` records. One `Product` can have many `ProductImage`, `ProductSize`, `ProductColor`, and `OrderItem` records. One `Order` can have many `OrderItem` records.
- **Many-to-many through a model:** products and orders are related through `OrderItem`. Each order item has purchase-specific quantity, price, size, and color. This is not a direct Prisma many-to-many relation.
- **One-to-one:** no one-to-one relation is declared in the Prisma schema.
- **Optional references:** `OrderItem.productId` and `OrderItem.orderId` are nullable in the schema. The normal order-creation flow creates order items nested under an order, but the database schema itself does not require every order item to reference one.
- **Delete behavior:** deleting a user cascades to sessions, accounts, and addresses. Orders reference users and addresses with restrictive deletion behavior. Deleting a product cascades to its images, sizes, and colors; an order item's product reference is set to null. Deleting an order cascades to its order items.
- **Uniqueness and indexes:** user email, session token, order number, and Stripe session ID are unique. `Session.userId`, `Account.userId`, and `Verification.identifier` are indexed. Product size/color combinations are not declared unique, and the schema does not enforce that a user can have only one default address.
- **Other constraints:** prices and order totals use `Decimal(10,2)`; product `stock` defaults to `0`; the address `postalCode` and user's phone/image are nullable. There are no schema-level checks for positive quantities, non-negative stock, or total arithmetic.

## Architecture and components

The application uses the Next.js App Router. Server components/pages load data and compose the route UI; client components handle interactive forms, cart state, filtering, and navigation. Server actions encapsulate most database-backed operations. API route handlers integrate Better Auth, product creation, and Stripe webhooks.

| Path | Responsibility |
|---|---|
| `app/` | Route pages and layouts: home, shop, products, cart, sign-in/sign-up, protected account and checkout, and admin pages. `app/api/` contains the auth handler, product creation endpoint, and Stripe webhook. |
| `components/` | Reusable UI grouped by storefront, home page, product, shop, checkout, user, order, admin, and shared UI. |
| `server-actions/` | Server-side operations for auth checks, profiles, product queries/deletion, dashboard counts, and order creation, lookup, listing, and status updates. |
| `services/` | Integrations and focused workflows, including Google sign-in and Cloudinary image uploads. |
| `lib/` | Shared Better Auth configuration/client, Prisma client, Stripe client, and Cloudinary configuration. |
| `store/` and `providers/` | Zustand persisted cart state and client-side cart hydration. |
| `prisma/` | PostgreSQL Prisma schema and committed SQL migrations. Generated Prisma client output is placed in `app/generated/prisma` and is ignored by Git. |
| `public/` | Static images and assets served by Next.js. |

Prisma is initialized with the PostgreSQL adapter in `lib/prisma.ts`, using `DATABASE_URL`. The auth adapter shares that Prisma client. Cloudinary stores uploaded image assets while the database stores their URL and public ID. Stripe Checkout Session creation is handled server-side; the Stripe webhook verifies the signature and records paid orders.

## Key features

- Responsive storefront with featured/latest products, shop filters and sort options, and product detail pages.
- Product categories, product types, available sizes and colors, stock count, and best-seller flag.
- Browser-persisted cart with quantity controls and subtotal calculation.
- Email/password registration and login, plus Google sign-in.
- Customer profile editing, a default saved shipping address, and order history/detail views.
- Cash-on-delivery order placement and Stripe Checkout with webhook-based paid-order creation.
- Order and payment lifecycle statuses, customer order tracking, and admin order management.
- Admin dashboard counts and product creation with Cloudinary image uploads.

## Setup and usage

### Prerequisites

- Node.js and npm (the repository does not pin a Node.js version).
- A PostgreSQL database and its connection URL.
- Cloudinary credentials for product image uploads.
- Stripe credentials for Stripe checkout and webhook processing.
- Google OAuth credentials if Google sign-in is to be used.

### Install

```bash
npm ci
```

### Configure environment

Create a `.env` file in the repository root. There is no checked-in environment template; provide values for the integrations you intend to use:

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Required to use Stripe checkout and process its webhook
STRIPE_SECRET_KEY="..."
STRIPE_WEBHOOK_SECRET="..."

# Required to upload product images
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Required to use Google sign-in
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

Use real credentials from your own service accounts; do not commit `.env`. `DATABASE_URL` is read by both the Prisma client and Prisma CLI configuration. `NEXT_PUBLIC_APP_URL` is used to construct Stripe success and cancel URLs. Stripe's webhook signing secret must match the endpoint configured to call `/api/stripe/webhook`.

### Initialize the database

Generate the Prisma client and apply the repository's migrations to your development database:

```bash
npx prisma generate
npx prisma migrate dev
```

The committed migrations create the auth, catalog, address, and order tables. There is no seed script in `package.json`; create or register a user and add products through the application/admin workflow or your own database tooling. To use admin pages, the user's `role` must be `ADMIN`; new users default to `USER`.

### Run the application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a production build and server:

```bash
npm run build
npm run start
```

Run the configured linter with:

```bash
npm run lint
```

The repository does not define a test script. Stripe checkout depends on a reachable webhook at `/api/stripe/webhook`; local Stripe webhook forwarding setup is not included in the repository.

## Routes at a glance

| Route | Purpose |
|---|---|
| `/` | Storefront home |
| `/shop` | Product catalog with filters and sorting |
| `/products/[productId]` | Product details |
| `/cart` | Browser cart |
| `/signin`, `/signup` | Authentication |
| `/account`, `/account/edit` | Customer account and profile |
| `/account/orders`, `/account/orders/[orderId]` | Customer order list and detail |
| `/checkout`, `/checkout/success` | Checkout and Stripe return flow |
| `/admin` | Admin dashboard |
| `/admin/products`, `/admin/add-product` | Admin product management |
| `/admin/orders`, `/admin/orders/[orderId]` | Admin order management |
| `/api/auth/[...all]` | Better Auth endpoint |
| `/api/products` | Admin product creation endpoint |
| `/api/stripe/webhook` | Stripe webhook endpoint |

## Notes and implementation boundaries

- The enum declarations and Prisma schema describe supported values; they do not by themselves establish additional business policies such as a valid status-transition graph.
- The migrations and schema contain no currency column; Stripe checkout currently uses USD.
- The browser cart is persisted locally, not stored per-user in PostgreSQL.
- The current checkout UI tax estimate and server-side order/Stripe tax calculation differ (8% versus 5%), as described above.
