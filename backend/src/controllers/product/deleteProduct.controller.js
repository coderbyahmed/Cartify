import { getProductById, deleteProduct } from "../../services/product.service.js";
import { deleteFromCloudinary } from "../../utils/cloudinaryUpload.js";

const deleteProductController = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    const publicId = product.image?.publicId;

    if (publicId) {
      await deleteFromCloudinary(publicId);
    }

    await deleteProduct(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default deleteProductController;