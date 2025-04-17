import React, { useState } from "react";

function ChatComponent() {
    const [prompt, setPrompt] = useState('');
    const [chatResponse, setChatResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const askAI = async () => {
        if (!prompt.trim()) return; // Do nothing if the input is empty

        setLoading(true);
        setChatResponse('');

        try {
            const response = await fetch(`http://localhost:8081/ask-ai?prompt=${encodeURIComponent(prompt)}`);
            const data = await response.text();
            setChatResponse(data);
        } catch (error) {
            console.error("Error generating response:", error);
            setChatResponse("❌ An error occurred while querying the AI.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <h2>💬 Chat with the AI</h2>

            <input
                type="text"
                className="chat-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask your question here..."
            />

            <button className="chat-button" onClick={askAI} disabled={loading}>
                {loading ? "⏳ In Progress..." : "Send"}
            </button>

            <div className="chat-response">
                {chatResponse && (
                    <>
                        <h3>🧠 AI Response:</h3>
                        <p>{chatResponse}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default ChatComponent;
