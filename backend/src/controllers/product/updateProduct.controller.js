
import { getProductById, updateProduct } from "../../services/product.service.js";
import uploadToCloudinary, { deleteFromCloudinary } from "../../utils/cloudinaryUpload.js";

const updateProductController = async (req, res) => {
  try {
    const existingProduct = await getProductById(req.params.id);

    const oldPublicId = existingProduct.image?.publicId;

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
    };

    if (image) {
      productData.image = image;
    }

    const product = await updateProduct(
      req.params.id,
      productData
    );

    if (image && oldPublicId && oldPublicId !== image.publicId) {
      await deleteFromCloudinary(oldPublicId);
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
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

export default updateProductController;





// router.put(
//   "/:id",
//   verifyToken,
//   upload.single("image"),
//   validate(updateProductSchema),
//   updateProduct
// );




// ```js
// import upload from "../middlewares/upload.middleware.js";
// ```
