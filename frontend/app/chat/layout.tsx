import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat - SCANUEV",
  description: "Chat with our AI agents",
  openGraph: {
    title: "Chat - SCANUEV",
    description: "Chat with our AI agents",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <main className="h-screen overflow-hidden">{children}</main>;
}
