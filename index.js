const path = require("path");
const multer = require("multer");
const fs = require("fs/promises");
const express = require("express");

const uploadDir = path.join(__dirname, "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

async function run() {
  await fs.mkdir(uploadDir, { recursive: true });

  const app = express();

  app.use(express.urlencoded({ extended: true }));

  app.get("/upload", (req, res) => {
    res.send(`
      <form action="/upload" method="POST" enctype="multipart/form-data">
        <input name="wasm" type="file" />
        <button>Submit</button>
      </form>
    `)
  })

  app.post("/upload", upload.single("wasm"), (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    res.sendStatus(200);
  });

  app.get("/random", async (req, res) => {
    const readdirRes = await fs.readdir(uploadDir);
    if (readdirRes.length === 0) {
      return res.sendStatus(400);
    }

    const randomIndex = Math.floor(Math.random() * readdirRes.length);
    res.setHeader("content-type", "application/wasm");
    const filePath = readdirRes[randomIndex];
    res.sendFile(filePath, {root: uploadDir});
  });

  app.use(express.static("public"));
  app.use("/uploads", express.static("public"));

  app.listen(process.env.PORT || 8080);
}

run();
