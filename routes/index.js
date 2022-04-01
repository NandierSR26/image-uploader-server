const { Router } = require("express");
const { uploadImage } = require("../controllers/uploadController");

const router = Router();

router.post('/', uploadImage);

module.exports = router;