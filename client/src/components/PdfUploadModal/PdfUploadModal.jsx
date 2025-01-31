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

  useEffect(() => {
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setPdfUrl(fileUrl);
    }
  }, [selectedFile]);

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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          maxHeight: "80vh",
          borderRadius: "12px", 
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        Upload PDF file for Document {index}
      </DialogTitle>
      <DialogContent sx={{ overflow: "auto", height: "80vh" }}>
        {selectedFile ? (
          <div style={{ textAlign: "center" }}>
            <Document
              file={pdfUrl}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              style={{
                width: "80%",
                height: "auto",
                maxHeight: "500px",
              }}
            >
              <Page pageNumber={pageNumber} />
            </Document>
            <Typography variant="h6" style={{ marginTop: "10px" }}>
              Page {pageNumber} of {numPages}
            </Typography>
          </div>
        ) : (
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #1976d2",
              borderRadius: "8px",
              padding: "40px",
              textAlign: "center",
              cursor: "pointer",
              height: "80%", 
              position: "relative",
              overflow: "hidden",
            }}
          >
            <input {...getInputProps()} />
            <Typography variant="body1" color="textSecondary">
              Drag and drop a PDF file here or click to select
            </Typography>
          </div>
        )}

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
          sx={{
            backgroundColor: "#f44336",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!selectedFile}
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PdfUploadModal;
