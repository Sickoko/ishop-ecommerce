import express from "express";
import Users from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRole from "../models/userRole";

const authRouter = express.Router();

authRouter.post("/register", async (request, response) => {
  const data = request.body;
  console.log(data);
  if (data) {
    const oldUser = await Users.findOne({ email: data.email });
    if (oldUser) {
      return response
        .status(400)
        .json({ success: false, status: "Already registered,Please log in" });
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    try {
      const user = await Users.create(data);
      const result = await user.populate("UserRole");
      response.status(201).json({
        message: "Successfully registered",
        data: result,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        error: error,
      });
    }

    // Users.create(data)
    //   .then((data) => {
    //     response.status(201).json({
    //       message: "Хэрэглэгч амжилттай үүслээ.",
    //       data,
    //     });
    //     return;
    //   })
    //   .catch((error) => {
    //     response.status(500).json({
    //       success: false,
    //       error: error,
    //     });
    //   });
  } else {
    return response.json({ error: "Input field is empty" });
  }
});
authRouter.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!(email && password)) {
      return response.status(400).json({
        message: "Утгуудыг бүрэн оруулна уу",
      });
    }
    const user = await Users.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, user?.password);
    if (user && isMatch) {
      const jwtBody = { user_id: user._id, email: email };
      const token = jwt.sign(jwtBody, "DontMessWithThis", { expiresIn: "24h" });
      return response.status(200).json({
        success: true,
        status: "Амжилттай нэвтэрлээ.",
        data: user,
        token: token,
      });
    }
    response.status(400).json({
      status: "Нууц үг нэр хоорондоо таарахгүй байна.",
    });
  } catch (error) {
    response.status(500).json({
      data: "Алдаа гарлаа",
      error: error,
    });
  }
});
authRouter.get("/role/list", async (req, res) => {
  const result = await UserRole.find({});
  res.status(200).json({
    data: result,
  });
});
authRouter.post("/role/create", async (req, res) => {
  const { name } = req.body;
  const result = await UserRole.create({ name });
  res.status(200).json({
    data: result,
  });
});
module.exports = authRouter;
