import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

const DocumentPreview = ({ number = "", fileName = "", uploadDate = "" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ cursor: "pointer" }}
    >
      <Card sx={{ width: 270, height: 350, boxShadow: 3, borderRadius: 2 }}>
        <div
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "10px",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <Typography variant="h6" component="div" fontWeight="bold">
            Legal Document {number}
          </Typography>
        </div>
        <CardContent>
          <div style={{ marginBottom: "10px" }}>
            <Typography variant="body2" color="textSecondary">
              File Name:
            </Typography>
            <Typography variant="h6">{fileName || "N/A"}</Typography>
          </div>
          <div>
            <Typography variant="body2" color="textSecondary">
              Upload Date:
            </Typography>
            <Typography variant="h6">{uploadDate || "N/A"}</Typography>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DocumentPreview;
