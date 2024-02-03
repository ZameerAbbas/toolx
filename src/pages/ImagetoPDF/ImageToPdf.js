import React, { useState } from "react";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import { saveAs } from "file-saver";
import Dropzone from "react-dropzone";

const ImageToPdf = () => {
  const [imageFile, setImageFile] = useState(null);

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageFile(file);

    const pdfDoc = await convertImageToPdf(file);

    const pdfBytes = await pdfDoc.save();
    saveAs(new Blob([pdfBytes], { type: "application/pdf" }), "converted-document.pdf");
  };

  const convertImageToPdf = async (imageFile) => {
    const pdfDoc = await PDFDocument.create();
    const imageBytes = await readFileAsArrayBuffer(imageFile);

    const image = await pdfDoc.embedPng(imageBytes);
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const { width: imageWidth, height: imageHeight } = image.scale(0.5);

    page.drawImage(image, {
      x: width / 2 - imageWidth / 2,
      y: height / 2 - imageHeight / 2,
      width: imageWidth,
      height: imageHeight,
    });

    return pdfDoc;
  };

  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div>
      <Dropzone onDrop={handleDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} style={dropzoneStyle}>
              <input {...getInputProps()} />
              <p>
                Drag and drop an image file here, or click to select one
              </p>
            </div>
          </section>
        )}
      </Dropzone>

      {imageFile && (
        <div>
          <h2>Uploaded Image:</h2>
          <p>{imageFile.name}</p>
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

export default ImageToPdf;
