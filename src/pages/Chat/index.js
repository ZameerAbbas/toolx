import React  ,{ useState } from "react";

function Chat() {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
  
    const openaiApiKey = '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';
  
    const handleUserInput = (event) => {
      setUserInput(event.target.value);
    };
  
    const handleSendMessage = async () => {
      // Make API request to OpenAI GPT-3.5
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          prompt: userInput,
          max_tokens: 150,
        }),
      });
  
      const data = await response.json();
      const botReply = data.choices[0]?.text.trim();
  
      setChatHistory([...chatHistory, { role: 'user', content: userInput }]);
      setChatHistory([...chatHistory, { role: 'bot', content: botReply }]);
      setUserInput('');
    };
  
    return (
      <div>
        <div className="text-[white]">
          {chatHistory.map((message, index) => (
            <div key={index} className={message.role}>
              {message.content}
            </div>
          ))}
        </div>
        <div>
          <input type="text" value={userInput} onChange={handleUserInput}  className="text-[black]" />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    );
  };

export default Chat;