'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export function SideNavigation() {
  const pathname = usePathname()

  return (
    <div className="space-y-2">
      <Link 
        href="/sourcing-desk"
        className="block w-full py-3 px-6 text-center text-white bg-[#4A90E2] hover:bg-[#357ABD] rounded-full transition-colors"
      >
        Sourcing Desk
      </Link>
      <Link 
        href="/purchases"
        className="block w-full py-3 px-6 text-center text-white bg-[#4A90E2] hover:bg-[#357ABD] rounded-full transition-colors"
      >
        Purchases
      </Link>
      <Link 
        href="/returns"
        className="block w-full py-3 px-6 text-center text-white bg-[#4A90E2] hover:bg-[#357ABD] rounded-full transition-colors"
      >
        Returns
      </Link>
    </div>
  )
}

