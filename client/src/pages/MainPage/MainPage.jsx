import React from "react";
import { Grid } from "@mui/material";
import DocumentPreview from "../../components/DocumentPrview/DocumentPrview";

const testDocuments = Array.from({ length: 9 }, (_, i) => ({
  fileName: `Document ${i + 1}.pdf`,
  uploadDate: `2025-01-${10 + i}`,
}));

const MainPage = () => {
  return (
    <Grid container spacing={2} p={6}>
      {testDocuments.map((doc, index) => (
        <Grid item xs={12} sm={4} lg={2} key={index}>
          <DocumentPreview fileName={doc.fileName} uploadDate={doc.uploadDate} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MainPage;
