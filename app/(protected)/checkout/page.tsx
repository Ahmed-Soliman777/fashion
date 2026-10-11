import CheckoutPageComponent from '@/components/checkout/page'
import { getProfile } from '@/server-actions/user/getProfile'
import { redirect } from 'next/navigation'

const page = async () => {

  const user = await getProfile()

  if (!user) {
    redirect("/signin")
  }

  return (
    <CheckoutPageComponent user={user} />
  )
}

export default page