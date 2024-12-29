interface ChatMessageProps {
  content: string
  isUser?: boolean
  actions?: Array<{
    label: string
    onClick: () => void
  }>
}

export function ChatMessage({ content, isUser = false, actions }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] rounded-lg p-4 ${
        isUser ? 'bg-blue-100' : 'bg-gray-300'
      }`}>
        <p className="text-gray-800">{content}</p>
        {actions && (
          <div className="flex flex-col gap-2 mt-3">
            {actions.map((action) => (
              <button
                key={action.label}
                onClick={action.onClick}
                className="bg-blue-200 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-300 transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

