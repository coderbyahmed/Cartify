import { getProfile } from "../../services/auth.service.js";

const profile = async (req, res) => {
  try {
    const user = await getProfile(req.user.userId);

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export default profile;