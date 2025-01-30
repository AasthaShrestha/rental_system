import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

// Prime number generation with randomization
function generateRandomPrime(min, max) {
  // Add timestamp to increase randomness
  const timestamp = Date.now();
  let num = Math.floor(Math.random() * (max - min + 1) + min + (timestamp % 100));
  
  function isPrime(n) {
      if (n <= 1) return false;
      if (n <= 3) return true;
      if (n % 2 === 0 || n % 3 === 0) return false;

      for (let i = 5; i * i <= n; i += 6) {
          if (n % i === 0 || n % (i + 2) === 0) return false;
      }
      return true;
  }

  // Keep generating until we find a prime
  while (!isPrime(num)) {
      num = Math.floor(Math.random() * (max - min + 1) + min);
      // Add user-specific variation
      num += (timestamp % 50);
  }
  return num;
}

// Extended Euclidean Algorithm
function modInverse(e, phi) {
  let d = 0;
  let x1 = 0;
  let x2 = 1;
  let y1 = 1;
  let tempPhi = phi;

  while (e > 0) {
      const temp1 = Math.floor(tempPhi / e);
      const temp2 = tempPhi - temp1 * e;
      tempPhi = e;
      e = temp2;

      const x = x2 - temp1 * x1;
      const y = d - temp1 * y1;

      x2 = x1;
      x1 = x;
      d = y1;
      y1 = y;
  }

  if (tempPhi === 1) {
      return d + phi;
  }
  return 0;
}

function gcd(a, b) {
  while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
  }
  return a;
}

// Generate unique key pair for each user
async function generateUniqueKeyPair(email) {
  // Use email and timestamp to create user-specific seed
  const seed = email + Date.now();
  
  // Generate prime numbers with user-specific randomization
  const min = Math.floor(Math.random() * 100) + 100;  // Random range for more variation
  const max = min + 400;
  
  let p = generateRandomPrime(min, max);
  let q = generateRandomPrime(min, max);
  
  // Ensure p and q are different
  while (p === q) {
      q = generateRandomPrime(min, max);
  }

  const n = p * q;
  const phi = (p - 1) * (q - 1);

  // Generate unique e based on user data
  let e = 65537;  // Start with common value
  const seedNum = parseInt(seed.replace(/[^0-9]/g, '').slice(0, 4));
  e += (seedNum % 100);  // Add user-specific variation
  
  while (e < phi && gcd(e, phi) !== 1) {
      e++;
  }

  const d = modInverse(e, phi);

  // Verify key uniqueness
  const publicKey = { n, e };
  const privateKey = { n, d };
  
  // Add metadata for verification
  const keyMetadata = {
      createdAt: new Date().toISOString(),
      userEmail: email,
      keyId: Math.random().toString(36).substring(7)
  };

  return {
      publicKey: { ...publicKey, ...keyMetadata },
      privateKey: { ...privateKey, ...keyMetadata }
  };
}

// Modified signup function with unique key generation
const signUp = async (req, res) => {
  try {
      const userExist = await User.findOne({
          email: req.body.email,
      });

      if (userExist) {
          return res.status(400).json({
              message: "User already exists. Please sign in.",
          });
      }

      // Generate unique RSA keys for this specific user
      const keyPair = await generateUniqueKeyPair(req.body.email);

      // Convert keys to base64 with metadata
      const privateKeyStr = Buffer.from(JSON.stringify(keyPair.privateKey)).toString('base64');
      const publicKeyStr = Buffer.from(JSON.stringify(keyPair.publicKey)).toString('base64');

      // Verify keys are unique
      const existingUser = await User.findOne({
          $or: [
              { publicKey: publicKeyStr },
              { privateKey: privateKeyStr }
          ]
      });

      if (existingUser) {
          // In the unlikely case of a collision, generate new keys
          return signUp(req, res);
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          privateKey: privateKeyStr,
          publicKey: publicKeyStr
      });

      return res.status(201).json({
          message: "Signed Up successfully"
      });

  } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({
          message: "Error during signup",
          error: error.message
      });
  }
};

// const signUp = async (req, res) => {
//   //req.body={name,email,password}
//   const userExist = await User.findOne({
//     email: req.body.email,
//   });
//   //keyPair.publicKey or keyPair.privateKey
//       const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//           modulusLength: 2048,
//           publicKeyEncoding: {
//               type: 'spki',
//               format: 'der',
//           },
//           privateKeyEncoding: {
//               type: 'pkcs8',
//               format: 'der',
//           }
//       })
//   if (userExist) {
//     res.status(400).json({
//       message: "User already exist. Please sign in.",
//     });
//     return;
//   }
//   const salt = bcrypt.genSaltSync(10);
//   const hashedPassword = bcrypt.hashSync(req.body.password, salt);

//   await User.create({
//     name: req.body.name,
//     email: req.body.email,
//     password: hashedPassword,
//     latitude: req.body.latitude,
//     longitude: req.body.longitude,
//     privateKey:privateKey.toString('base64'),
//     publicKey:publicKey.toString('base64'),
//   });
//   res.status(201).json({
//     message: "Signed Up successfully",
//   });
// };

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