import React, { useState } from "react";
import Compressor from "compressorjs";

const ImageCompresser = () => {
  const [compressedFile, setCompressedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCompressedUpload = (e) => {
    setLoading(true);
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.2,
      success: (compressedResult) => {
        setCompressedFile(compressedResult);
        setLoading(false);
      },
    });
  };

  const downloadCompressedImage = () => {
    if (compressedFile) {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(compressedFile);
      downloadLink.download = "compressed_image.jpg";
      downloadLink.click();
    }
  };

  return (
    <div>
      <div>
        <input
          accept="image/*,capture=camera"
          capture="camera"
          type="file"
          onChange={(event) => handleCompressedUpload(event)}
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : compressedFile ? (
        <div>
          <button onClick={downloadCompressedImage}>Download Compressed Image</button>
        </div>
      ) : null}
    </div>
  );
};

export default ImageCompresser;
