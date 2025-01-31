import React, { useState } from "react";
import { Box } from "@mui/material";
import DocumentPreview from "../../components/DocumentPrview/DocumentPrview";
import PdfUploadModal from "../../components/PdfUploadModal/PdfUploadModal";

const MainPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [testDocuments, setTestDocuments] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      fileName: "",
      uploadDate: "",
      file: null,
    }))
  );

  const handleClickOpen = (id) => {
    setSelectedIndex(id);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedFile(null);
    setSelectedIndex(null);
  };

  const handleFileUpload = (file) => {
    const updatedDocs = [...testDocuments];
    updatedDocs[selectedIndex - 1] = {
      ...updatedDocs[selectedIndex - 1],
      fileName: file.name,
      uploadDate: new Date().toISOString().split("T")[0],
      file: file,
    };
    setTestDocuments(updatedDocs);
    setOpenModal(false);
  };

  return (
    <div>
      <Box display="flex" flexWrap="wrap" justifyContent="flex-start" p={6}>
        {testDocuments.map((doc) => (
          <Box
            key={doc.id}
            onClick={() => handleClickOpen(doc.id)}
            sx={{
              minWidth: "200px",
              cursor: "pointer",
              marginRight: "16px",
              marginBottom: "16px",
            }}
          >
            <DocumentPreview
              fileName={doc.fileName}
              uploadDate={doc.uploadDate}
            />
          </Box>
        ))}
      </Box>

      <PdfUploadModal
        open={openModal}
        handleClose={handleClose}
        index={selectedIndex}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        handleFileUpload={handleFileUpload}
      />
    </div>
  );
};

export default MainPage;
