const express = require("express");
const { addImage, getAllImages, getImageById, updateImage, deleteImage } = require("../controllers/ImageGalleryController");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads/gallery/");
    console.log("Upload path:", uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/add", upload.single("image"), addImage);
router.get("/", getAllImages);
router.get("/:id", getImageById);
router.put("/update/:id", upload.single("image"), updateImage);
router.delete("/delete/:id", deleteImage);

module.exports = router;
