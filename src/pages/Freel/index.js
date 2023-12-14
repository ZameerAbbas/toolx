
import { useState } from "react";
import axios from "axios";

function Freel() {


    const [videoUrl, setVideoUrl] = useState('');

    const handleDownload = async () => {
      try {
        const response = await axios.get(videoUrl, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'video.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (error) {
        alert('Error downloading video:', error);
      }
    };
  
    return (
        <div>
            <h1>download on one click</h1>

            <div>
      <input
      className="text-[black]"
        type="text"
        placeholder="Enter video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <button onClick={handleDownload}>Download Video</button>
    </div>
        </div>
    );
}

export default Freel;