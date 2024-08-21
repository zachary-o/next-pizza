import React from "react"

interface Props {
  orderId: number
  totalAmount: number
  paymentUrl?: string
}

export const PayOrderEmailTemplate: React.FC<Props> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => {
  return (
    <div>
      <h1>Order N#{orderId}</h1>

      <p>
        Pay for the order of ${totalAmount}. <a href={paymentUrl}>Click here</a>{" "}
        to pay.
      </p>
    </div>
  )
}
