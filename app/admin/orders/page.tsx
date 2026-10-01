import Link from "next/link"
import { FiEye } from "react-icons/fi"

const orders = [
    {
        id: "#1001",
        customer: "John Doe",
        total: 149.99,
        items: 3,
        payment: "Paid",
        status: "Delivered",
        date: "Jul 17, 2026"
    },
    {
        id: "#1002",
        customer: "Jane Smith",
        total: 84.5,
        items: 2,
        payment: "Paid",
        status: "Processing",
        date: "Jul 16, 2026"
    },
    {
        id: "#1003",
        customer: "Micheal Johnson",
        total: 219.99,
        items: 5,
        payment: "Pending",
        status: "Pending",
        date: "Jul 15, 2026"
    },
    {
        id: "#1004",
        customer: "Sarah Wilson",
        total: 59.99,
        items: 1,
        payment: "Refunded",
        status: "Cancelled",
        date: "Jul 14, 2026"
    },
]

const page = () => {
    return (
        <section>
            <div>
                <h2 className="text-3xl font-semibold">Orders</h2>

                <p className="mt-2 text-muted-foreground">
                    View and manage customer orders.
                </p>
            </div>

            {/* table */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-background">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="border-b border-border bg-surface">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Order
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Customer
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Items
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Total
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Payment
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                    Date
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                orders.map(order => (
                                    <tr
                                        key={order.id}
                                        className="border-b border-border last:border-0 hover:bg-surface/50">
                                        <td className="px-6 py-5">
                                            <div>
                                                <p className="font-medium">
                                                    {order.id}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {order.date}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            {order.customer}
                                        </td>
                                        <td className="px-6 py-5">
                                            {order.items}
                                        </td>
                                        <td className="px-6 py-5">
                                            ${order.total.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium ${order.payment === "Paid" ? "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400" : order.payment === "Pending" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400" : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"}`}>
                                                {order.payment}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="rounded-full px-3 py-1 text-xs font-medium">
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            {order.date}
                                        </td>
                                        <td className="px-6 py-5">
                                            <Link href={`/admin/orders/orderId`}>
                                                <button className="rounded-lg p-4 transition hover:bg-surface">
                                                    <FiEye/>
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default page