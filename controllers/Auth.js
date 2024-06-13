import User from "../models/UserModel.js";
import argon2 from "argon2";

// Register
// export const Register = async (req, res) => {
//   const { name, email, password, confPassword } = req.body;
//   if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
//   const hashPassword = await argon2.hash(password);
//   try {
//     const userExists = await User.findOne({ where: { email } });
//     if (userExists) return res.status(400).json({ msg: "Email sudah terdaftar" });

//     await User.create({
//       name,
//       email,
//       password: hashPassword,
//     });
//     res.status(201).json({ msg: "Registrasi berhasil" });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// Login
export const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    req.session.userId = user.uuid;
    res.status(200).json({
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get Current User
export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  try {
    const user = await User.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.session.userId,
      },
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Logout
export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
