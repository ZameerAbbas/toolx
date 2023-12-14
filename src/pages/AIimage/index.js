import  { useState } from 'react';


function Aiimage() {

    const [text, setText] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');
  
    const handleTextChange = (event) => {
      setText(event.target.value);
    };
  
    const generateImage = async () => {
      const resp = await fetch('https://api.deepai.org/api/text2img', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'YOUR_API_KEY',
        },
        body: JSON.stringify({
          text: text,
        }),
      });
  
      const data = await resp.json();
      setGeneratedImage(data.output_url); // assuming the API response has an 'output_url' field
    };
  
    return (
      <div>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter your text here"
        />
        <button onClick={generateImage}>Generate Image</button>
  
        {generatedImage && (
          <div>
            <p>Generated Image:</p>
            <img src={generatedImage} alt="Generated" />
          </div>
        )}
      </div>
    );
  };

export default Aiimage;


