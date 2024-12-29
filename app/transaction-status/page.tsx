'use client'

import Link from 'next/link'

export default function TransactionStatus() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="space-y-4 w-64">
        <Link
          href="/transaction-status/sourcing-desk"
          className="block w-full py-3 px-6 text-center text-white bg-[#4A90E2] hover:bg-[#357ABD] rounded-full transition-colors"
        >
          Sourcing Desk
        </Link>
        <Link
          href="/transaction-status/purchases"
          className="block w-full py-3 px-6 text-center text-white bg-[#4A90E2] hover:bg-[#357ABD] rounded-full transition-colors"
        >
          Purchases
        </Link>
        <Link
          href="/transaction-status/returns"
          className="block w-full py-3 px-6 text-center text-white bg-[#4A90E2] hover:bg-[#357ABD] rounded-full transition-colors"
        >
          Returns
        </Link>
      </div>
    </div>
  )
}

