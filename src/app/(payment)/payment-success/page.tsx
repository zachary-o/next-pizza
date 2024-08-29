export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string }
}) {
  return (
    <div className="flex items-center justify-center flex-col mt-10">
      <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
      <h2 className="text-2xl">You successfully sent</h2>
      <div className="bg-primary p-2 rounded-md text-secondary-foreground">${amount}</div>
    </div>
  )
}
