import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

const PdfUploadModal = ({ open, handleClose, index, selectedFile, setSelectedFile }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Загрузите PDF файл для документа {index }</DialogTitle>
      <DialogContent>
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #1976d2",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <input {...getInputProps()} />
          {selectedFile ? (
            <Typography variant="body1" color="textPrimary">
              {selectedFile.name}
            </Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">
              Перетащите PDF файл сюда или кликните для выбора
            </Typography>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PdfUploadModal;
