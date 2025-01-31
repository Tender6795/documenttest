const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("File upload failed");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };
  
  export { uploadFile };
  