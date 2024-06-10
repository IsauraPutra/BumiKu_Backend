import express from "express";
import multer from "multer";
import { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from "../controllers/Products.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

// Atur penyimpanan multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rute untuk membuat produk dengan unggahan gambar
router.post("/products", verifyUser, upload.single('image'), createProduct);

router.get("/products", verifyUser, getProducts);
router.get("/products/:id", verifyUser, getProductById);
router.post("/products", verifyUser, createProduct);
router.patch("/products/:id", verifyUser, updateProduct);
router.delete("/products/:id", verifyUser, deleteProduct);

export default router;
