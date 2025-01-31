import React, { useState } from "react";
import { Grid } from "@mui/material";
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
      <Grid container spacing={2} p={6}>
        {testDocuments.map((doc) => (
          <Grid
            item
            xs={12}
            sm={4}
            lg={2}
            key={doc.id}
            onClick={() => handleClickOpen(doc.id)}
          >
            <DocumentPreview
              fileName={doc.fileName}
              uploadDate={doc.uploadDate}
            />
          </Grid>
        ))}
      </Grid>

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
