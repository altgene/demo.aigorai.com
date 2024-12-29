export function Sidebar() {
  const actions = [
    { label: 'Track Orders', href: '/track-orders' },
    { label: 'Order History', href: '/order-history' },
    { label: 'Returns', href: '/returns' },
    { label: 'Claim', href: '/claim' },
  ]

  return (
    <aside className="w-64 p-6">
      <nav className="space-y-4">
        {actions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            className="block w-full py-2 px-4 text-center text-white bg-[#4A90E2] rounded-md hover:bg-blue-600 transition-colors"
          >
            {action.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}

