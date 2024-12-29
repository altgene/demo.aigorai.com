import Link from 'next/link'

interface MessageBubbleProps {
  content: string
  isUser: boolean
}

export function MessageBubble({ content, isUser }: MessageBubbleProps) {
  const renderContent = () => {
    const parts = content.split(/(<Link.*?<\/Link>)/);
    return parts.map((part, index) => {
      if (part.startsWith('<Link')) {
        const href = part.match(/href="(.*?)"/)?.[1] || '';
        const text = part.match(/>(.+?)</)?.[1] || '';
        return (
          <Link key={index} href={href} className="text-blue-500 hover:underline">
            {text}
          </Link>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[85%] rounded-lg px-4 py-2 ${
          isUser ? 'bg-[#9FC4E5] text-black' : 'bg-gray-200 text-gray-800'
        } whitespace-pre-wrap break-words`}
      >
        {renderContent()}
      </div>
    </div>
  );
}

