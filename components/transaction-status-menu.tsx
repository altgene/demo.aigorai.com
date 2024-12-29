import * as React from "react"
import Link from 'next/link'
import { ClipboardList, ShoppingBag, RotateCcw } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useLanguage } from '../contexts/language-context'

export function TransactionStatusMenu() {
  const { language } = useLanguage()

  const translations = {
    en: {
      transactionStatus: 'Transaction Status',
      sourcingDesk: 'Sourcing Desk',
      purchases: 'Purchases',
      returns: 'Returns',
    },
    de: {
      transactionStatus: 'Transaktionsstatus',
      sourcingDesk: 'Beschaffungsdesk',
      purchases: 'Einkäufe',
      returns: 'Rückgaben',
    },
    fr: {
      transactionStatus: 'État des transactions',
      sourcingDesk: 'Bureau d\'approvisionnement',
      purchases: 'Achats',
      returns: 'Retours',
    },
    es: {
      transactionStatus: 'Estado de transacciones',
      sourcingDesk: 'Mesa de abastecimiento',
      purchases: 'Compras',
      returns: 'Devoluciones',
    },
    pl: {
      transactionStatus: 'Status transakcji',
      sourcingDesk: 'Dział zaopatrzenia',
      purchases: 'Zakupy',
      returns: 'Zwroty',
    }
  }

  const t = translations[language as keyof typeof translations]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">{t.transactionStatus}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t.transactionStatus}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/transaction-status/sourcing-desk">
            <ClipboardList className="mr-2 h-4 w-4" />
            <span>{t.sourcingDesk}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/transaction-status/purchases">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>{t.purchases}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/transaction-status/returns">
            <RotateCcw className="mr-2 h-4 w-4" />
            <span>{t.returns}</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

