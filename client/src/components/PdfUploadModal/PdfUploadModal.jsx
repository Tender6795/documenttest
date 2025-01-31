import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

const PdfUploadModal = ({ open, handleClose, index, selectedFile, setSelectedFile }) => {
  const [error, setError] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]?.type !== "application/pdf") {
        setError("Please select a valid PDF file.");
        setSelectedFile(null);
      } else {
        setError("");
        setSelectedFile(acceptedFiles[0]);
      }
    },
  });

  const handleSubmit = () => {
    console.log("Submitted file:", selectedFile);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Upload PDF file for Document {index}</DialogTitle>
      <DialogContent>
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #1976d2",
            borderRadius: "8px",
            padding: "40px",
            textAlign: "center",
            cursor: "pointer",
            height: "400px",
          }}
        >
          <input {...getInputProps()} />
          {selectedFile ? (
            <Typography variant="body1" color="textPrimary">
              {selectedFile.name}
            </Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">
              Drag and drop a PDF file here or click to select
            </Typography>
          )}
        </div>

        {error && (
          <Typography variant="body2" color="error" style={{ marginTop: "10px" }}>
            {error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          style={{
            backgroundColor: "#f44336",
            color: "#fff",
            fontWeight: "bold",
            padding: "8px 16px",
            borderRadius: "4px",
            textTransform: "none",
            marginRight: "10px",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!selectedFile}
          style={{
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            padding: "8px 16px",
            borderRadius: "4px",
            textTransform: "none",
            marginLeft: "10px",
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PdfUploadModal;
