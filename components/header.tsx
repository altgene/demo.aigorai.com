'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../contexts/cart-context'
import { useLanguage } from '../contexts/language-context'
import { ProfileMenu } from './profile-menu'
import { TransactionStatusMenu } from './transaction-status-menu'
import { AnalyticsMenu } from './analytics-menu'

export function Header() {
  const { getCartCount, orderPlaced } = useCart()
  const { language } = useLanguage()

  const translations = {
    en: {
      home: 'Home',
      catalogue: 'Catalogue',
      settings: 'Settings',
    },
    de: {
      home: 'Startseite',
      catalogue: 'Katalog',
      settings: 'Einstellungen',
    },
    fr: {
      home: 'Accueil',
      catalogue: 'Catalogue',
      settings: 'Paramètres',
    },
    es: {
      home: 'Inicio',
      catalogue: 'Catálogo',
      settings: 'Configuración',
    },
    pl: {
      home: 'Strona główna',
      catalogue: 'Katalog',
      settings: 'Ustawienia',
    }
  }

  const t = translations[language as keyof typeof translations]

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="https://cdn.durable.co/blocks/3YPbMP54XDFmzvgkGv4EHb2fwFq0VJKI64nHYUQk1fQPNLQxzFf5HUKXIm6E0UQY.png"
              alt="Aigorai"
              width={180}
              height={60}
              priority
            />
          </Link>
          <nav className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900"
            >
              {t.home}
            </Link>
            <TransactionStatusMenu />
            <AnalyticsMenu />
            <Link
              href="/catalogue"
              className="text-gray-600 hover:text-gray-900"
            >
              {t.catalogue}
            </Link>
            <Link
              href="/settings"
              className="text-gray-600 hover:text-gray-900"
            >
              {t.settings}
            </Link>
            <ProfileMenu />
            <Link
              href="/cart"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ShoppingCart className="h-5 w-5" />
              {!orderPlaced && getCartCount() > 0 && (
                <span className="ml-1 bg-blue-500 text-white rounded-full px-2 py-0.5 text-xs">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

