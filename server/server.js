const express = require("express");
const cors = require("cors");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api", fileRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
