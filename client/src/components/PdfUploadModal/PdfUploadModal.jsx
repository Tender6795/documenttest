import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`;

const PdfUploadModal = ({
  open,
  handleClose,
  index,
  selectedFile,
  setSelectedFile,
  handleFileUpload,
}) => {
  const [error, setError] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (!open) {
      setPdfUrl(null);
      setSelectedFile(null);
      setPageNumber(1);
      setNumPages(null);
    }
  }, [open, setSelectedFile]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]?.type !== "application/pdf") {
        setError("Please select a valid PDF file.");
        setSelectedFile(null);
        setPdfUrl(null);
      } else {
        setError("");
        setSelectedFile(acceptedFiles[0]);
        const fileUrl = URL.createObjectURL(acceptedFiles[0]);
        setPdfUrl(fileUrl);
      }
    },
  });

  const handleSubmit = () => {
    if (selectedFile) {
      handleFileUpload(selectedFile);
    }
  };

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    if (!selectedFile) {
      console.log("No file selected.");
    } else {
      console.log("Selected file:", selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      console.log("Generated file URL:", fileUrl);
      setPdfUrl(fileUrl);
    }
  }, [selectedFile]);

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
            position: "relative",
            overflow: "hidden",
          }}
        >
          <input {...getInputProps()} />
          {selectedFile ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                height: "100%",
                overflow: "auto",
              }}
            >
              {pdfUrl ? (
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onLoadSuccess}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "100%",
                  }}
                >
                  <Page pageNumber={pageNumber} />
                </Document>
              ) : (
                <Typography variant="body1" color="error">
                  Failed to load PDF URL.
                </Typography>
              )}
            </div>
          ) : (
            <Typography variant="body1" color="textSecondary">
              Drag and drop a PDF file here or click to select
            </Typography>
          )}
        </div>

        {error && (
          <Typography
            variant="body2"
            color="error"
            style={{ marginTop: "10px" }}
          >
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
