import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const signUp = async (req, res) => {
  //req.body={name,email,password}
  const userExist = await User.findOne({
    email: req.body.email,
  });
  //keyPair.publicKey or keyPair.privateKey
      const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 2048,
          publicKeyEncoding: {
              type: 'spki',
              format: 'der',
          },
          privateKeyEncoding: {
              type: 'pkcs8',
              format: 'der',
          }
      })
  if (userExist) {
    res.status(400).json({
      message: "User already exist. Please sign in.",
    });
    return;
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    privateKey:privateKey.toString('base64'),
    publicKey:publicKey.toString('base64'),
  });
  res.status(201).json({
    message: "Signed Up successfully",
  });
};

const logIn = async (req, res) => {
  //we can send directly req.body in findOne but we need to make sure only those two fields are coming from the frontend.[we need to validate as well]
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    res.status(400).json({
      message: "Invalid Credentials",
    });
    return;
  }
  const isPasswordCorrect = bcrypt.compareSync(
    req.body.password,
    user.password,
  );
  if (isPasswordCorrect) {
    const updateduser = await User.updateOne({
      email: req.body.email,
    },{latitude: req.body.latitude,
      longitude: req.body.longitude});
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        roles: user.roles,
        kycVerified: user.kycVerified
      },
      JWT_ACCESS_SECRET,
      { expiresIn: "20d" }
    );
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 20);

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   expires: expiresAt,
    // });

    res.status(200).json({
      message: "Logged In Successfully",
      token,
      data: user,
    });
    return;
  }
  res.status(400).json({
    message: "Invalid Credentials",
  });
};


const imageUploader = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is available in req.user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: `/uploads/profile/${req.file.filename}` },
      { new: true }
    );

    res.status(200).json({
      message: "Image uploaded successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating user image" });
  }
}


const myData= async (req,res)=>{
  const userId = req.user._id; 
  const updatedUser = await User.findOne({_id:userId});
  res.status(200).json({
    message: " successfull",
    data: updatedUser,
  });
}


export { signUp, logIn ,imageUploader, myData};
