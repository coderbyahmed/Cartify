import { createProduct } from "../../services/product.service.js";
import uploadToCloudinary from "../../utils/cloudinaryUpload.js";


const createProductController = async (req, res) => {
  try {
    let image;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.path);

      image = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    const productData = {
      ...req.body,
      image,
    };

    const product = await createProduct(productData);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {

      console.error("Create Product Error:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }


export default createProductController;