export interface Feedback {
  comment: string;
  type: "positive" | "negative";
}

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  feedback?: Feedback;
  agentResponse?: string;
  timestamp: string;
}

export type AgentType = "PFC" | "General";

export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
export type KeyboardSubmitEvent = React.KeyboardEvent<HTMLInputElement>;
export type SubmitEvent = FormSubmitEvent | KeyboardSubmitEvent;
