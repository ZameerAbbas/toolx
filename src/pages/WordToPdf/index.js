import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import Dropzone from "react-dropzone";

const WordToPdf = () => {
  const [wordFile, setWordFile] = useState(null);
  const [pdfBytes, setPdfBytes] = useState(null);

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setWordFile(file);

    const wordBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.create();

    const wordDoc = await PDFDocument.load(wordBuffer);
    const [wordPage] = await pdfDoc.copyPages(wordDoc, [0]);

    pdfDoc.addPage(wordPage);
    const pdfBytes = await pdfDoc.save();

    setPdfBytes(pdfBytes);
  };

  const handleDownload = () => {
    if (pdfBytes) {
      saveAs(
        new Blob([pdfBytes], { type: "application/pdf" }),
        "converted-document.pdf"
      );
    }
  };




  console.log(handleDownload)

  return (
    <div>
      <Dropzone onDrop={handleDrop} accept=".doc, .docx">
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} style={dropzoneStyle}>
              <input {...getInputProps()} />
              <p>
                Drag and drop a Word document file here, or click to select one
              </p>
            </div>
          </section>
        )}
      </Dropzone>

      {wordFile && (
        <div>
          <h2>Uploaded Word Document:</h2>
          <p>{wordFile.name}</p>
          <button onClick={handleDownload} style={color}>
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};
const color = {
  color: "white",
  border:"2px solid red",
  borderRadius:"10px",
  padding:"5px 3px"

};

export default WordToPdf;
