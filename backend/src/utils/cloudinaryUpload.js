import fs from "fs/promises";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "Cartify/products",
      resource_type: "image",
    });

    return result;
  } finally {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error("Temporary file cleanup failed:", error.message);
    }
  }
};

const deleteFromCloudinary = async (publicId) => {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });

  if (result?.result !== "ok" && result?.result !== "not found") {
    throw new Error(
      `Cloudinary image deletion failed: ${
        result?.error?.message || result?.result || "unknown error"
      }`
    );
  }

  if (result?.result === "not found") {
    console.warn(`Cloudinary image not found for publicId: ${publicId}`);
  }

  return result;
};

export { deleteFromCloudinary };
export default uploadToCloudinary;