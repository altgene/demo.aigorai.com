'use client'

import { useState } from 'react'
import { useCart } from '../../contexts/cart-context'
import { StepOne } from '../../components/cart/step-one'
import { StepTwo } from '../../components/cart/step-two'
import { StepThree } from '../../components/cart/step-three'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

export default function Cart() {
  const { items, approvalStatus, setApprovalStatus, setOrderPlaced, submitForApproval } = useCart()
  const [step, setStep] = useState(1)

  const handleSubmitForApproval = () => {
    submitForApproval();
    console.log('Order submitted for approval:', items);
  }

  return (
    <>
      <div className="p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h1>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {approvalStatus === 'not_submitted' && (
              <>
                {step === 1 && <StepOne onNext={() => setStep(2)} />}
                {step === 2 && <StepTwo onPrevious={() => setStep(1)} onNext={() => setStep(3)} />}
                {step === 3 && <StepThree onPrevious={() => setStep(2)} onSubmitForApproval={handleSubmitForApproval} />}
              </>
            )}
            {approvalStatus === 'pending' && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Approval Pending</AlertTitle>
                <AlertDescription>
                  Your order has been submitted for approval. This process can take up to two days. We'll notify you once a decision has been made.
                </AlertDescription>
              </Alert>
            )}
          </>
        )}
      </div>
    </>
  )
}

