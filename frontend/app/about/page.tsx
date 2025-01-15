export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
        About SCANUEV
      </h1>
      <p className="mb-8 max-w-2xl text-center text-xl">
        SCANUEV is an advanced conversational AI platform that allows users to interact with
        different types of AI agents. Our platform leverages cutting-edge natural language
        processing technologies to provide intelligent and context-aware responses.
      </p>
      <h2 className="mb-4 mt-8 text-2xl font-semibold">Key Features:</h2>
      <ul className="list-inside list-disc text-lg">
        <li>Multiple AI agent types (PFC and General)</li>
        <li>Real-time conversation with AI</li>
        <li>Dark mode for comfortable viewing</li>
        <li>Emoji support for expressive communication</li>
        <li>Feedback system for continuous improvement</li>
      </ul>
    </main>
  );
}
