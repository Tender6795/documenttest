import React, { useState } from "react";
import { Box } from "@mui/material";
import DocumentPreview from "../../components/DocumentPrview/DocumentPrview";
import PdfUploadModal from "../../components/PdfUploadModal/PdfUploadModal";

const testDocuments = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  fileName: `Document ${i + 1}.pdf`,
  uploadDate: `2025-01-${10 + i}`,
}));

const MainPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClickOpen = (id) => {
    setSelectedIndex(id);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedFile(null);
    setSelectedIndex(null);
  };

  return (
    <div>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        p={6}
      >
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
      />
    </div>
  );
};

export default MainPage;
