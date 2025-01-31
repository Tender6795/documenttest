import React, { useState } from "react";
import { Box } from "@mui/material";
import DocumentPreview from "../../components/DocumentPrview/DocumentPrview";
import PdfUploadModal from "../../components/PdfUploadModal/PdfUploadModal";
import Header from "../../components/Header/Header";
import { uploadFile } from "../../services/fileService";

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
    const doc = testDocuments.find((document) => document.id === id);
    setSelectedIndex(id);
    setSelectedFile(doc?.file || null);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedFile(null);
    setSelectedIndex(null);
  };

  const handleFileUpload = async (file) => {
    try {
      const response = await uploadFile(
        file,
      );
      const updatedDocs = [...testDocuments];
      updatedDocs[selectedIndex - 1] = {
        ...updatedDocs[selectedIndex - 1],
        fileName: response.name,
        uploadDate: response.createdAt,
        file: file,
      };
      setTestDocuments(updatedDocs);
      setOpenModal(false);
      setSelectedFile(null);
      setSelectedIndex(null);
      console.log(response);
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  return (
    <div>
      <Header />
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
              number={doc.id}
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
