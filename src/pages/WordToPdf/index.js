import React, { useState } from 'react';
import mammoth from 'mammoth';
import * as html2pdf from 'html2pdf.js';


function WordToPdf() {

    const [wordFile, setWordFile] = useState(null);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setWordFile(file);
    };
  
    const convertToPdf = async () => {
      if (wordFile) {
        // Convert Word to HTML
        const reader = new FileReader();
        reader.onload = async (e) => {
          const html = await mammoth.extractRawText({ arrayBuffer: e.target.result });
          
          // Convert HTML to PDF
          const pdfBlob = await html2pdf(html);
          
          // Create a download link
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(pdfBlob);
          downloadLink.download = 'converted_document.pdf';
          downloadLink.click();
        };
        reader.readAsArrayBuffer(wordFile);
      }
    };
    return (
        <div>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      <button onClick={convertToPdf}>Convert to PDF</button>
    </div>
    );
}

export default WordToPdf;