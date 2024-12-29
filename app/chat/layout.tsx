import { Header } from '../../components/header'
import { Sidebar } from '../../components/sidebar'

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 flex flex-col bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}

