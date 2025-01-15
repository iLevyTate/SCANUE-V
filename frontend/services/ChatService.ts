import type { Message, AgentType } from "@/types/chat";

interface ChatResponse {
  message: string;
  agentResponse: string;
}

export class ChatService {
  readonly MAX_MESSAGES = 50;
  private readonly TIMEOUT_MS = 10000;

  async sendMessage(message: string, agentType: AgentType): Promise<Message> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, agent: agentType }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as ChatResponse;
      return this.formatResponse(data);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private formatResponse(data: ChatResponse): Message {
    return {
      id: crypto.randomUUID(),
      content: data.message,
      isUser: false,
      agentResponse: data.agentResponse,
      timestamp: new Date().toISOString(),
    };
  }

  trimMessages(messages: Message[]): Message[] {
    return messages.length > this.MAX_MESSAGES
      ? messages.slice(-this.MAX_MESSAGES)
      : messages;
  }
}
