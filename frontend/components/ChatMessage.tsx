'use client'

import { memo } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { BotAvatar } from './BotAvatar'
import { User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatMessageTime } from '@/lib/date-utils'
import type { Message } from '@/types/chat'
import { MessageActions } from './MessageActions'

interface ChatMessageProps {
  message: Message
  isPartOfGroup: boolean
  showTimestamp: boolean
  onDelete?: (id: string) => void
  className?: string
}

function ChatMessageComponent({ 
  message, 
  isPartOfGroup, 
  showTimestamp, 
  onDelete, 
  className 
}: ChatMessageProps) {
  const isUser = message.isUser
  const alignmentClass = isUser ? 'justify-end' : 'justify-start'
  const messageBgClass = isUser 
    ? 'bg-blue-500 text-white' 
    : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'

  return (
    <li 
      className={cn(
        'flex items-end gap-2',
        alignmentClass,
        isPartOfGroup ? 'mt-1' : 'mt-4',
        className
      )}
      aria-label={`Message from ${isUser ? 'You' : 'Assistant'}`}
    >
      {!isUser && (
        <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
          <AvatarFallback>
            <BotAvatar />
          </AvatarFallback>
        </Avatar>
      )}
      <div className={cn(
        'relative group',
        'max-w-[75%] sm:max-w-[70%] break-words',
        'rounded-2xl p-3',
        messageBgClass,
        'shadow-sm',
        'transition-all duration-200'
      )}>
        <p className="text-sm sm:text-base whitespace-pre-wrap">{message.content}</p>
        {showTimestamp && (
          <time 
            dateTime={message.timestamp}
            className="absolute bottom-0 right-0 -mb-5 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {formatMessageTime(message.timestamp)}
          </time>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <MessageActions message={message} onDelete={onDelete} />
        </div>
      </div>
      {isUser && (
        <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
          <AvatarFallback>
            <User className="w-5 h-5 text-gray-600" />
          </AvatarFallback>
        </Avatar>
      )}
    </li>
  )
}

export const ChatMessage = memo(ChatMessageComponent) 