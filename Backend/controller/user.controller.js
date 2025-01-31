import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bigInt from "big-integer";

dotenv.config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
// Function to compute (base^exp) % mod (Modular Exponentiation)
function modExp(base, exp, mod) {
  let result = bigInt(1);
  base = base.mod(mod);
  while (exp.greater(0)) {
      if (exp.isOdd()) {
          result = result.multiply(base).mod(mod);
      }
      exp = exp.divide(2);
      base = base.multiply(base).mod(mod);
  }
  return result;
}

// Extended Euclidean Algorithm to find modular inverse
function modInverse(e, phi) {
  let [a, b, x0, x1] = [phi, e, bigInt(0), bigInt(1)];
  while (b.notEquals(0)) {
      let q = a.divide(b);
      [a, b] = [b, a.mod(b)];
      [x0, x1] = [x1, x0.subtract(q.multiply(x1))];
  }
  return x0.lesser(0) ? x0.add(phi) : x0;
}

// Function to compute GCD
function gcd(a, b) {
  while (!b.equals(0)) {
      [a, b] = [b, a.mod(b)];
  }
  return a;
}

// Generate large prime numbers
function generateLargePrime(bits) {
  while (true) {
      let p = bigInt.randBetween(bigInt(2).pow(bits - 1), bigInt(2).pow(bits).subtract(1));
      if (p.isPrime()) return p;
  }
}

// Function to generate RSA key pair (2048-bit primes)
function generateRSAKeys() {
  let p = generateLargePrime(1024); // Generate first prime
  let q = generateLargePrime(1024); // Generate second prime
  let N = p.multiply(q);
  let phi = p.subtract(1).multiply(q.subtract(1));

  let e = bigInt(65537); // Common public exponent
  while (gcd(e, phi).notEquals(1)) {
      e = e.next(); // If gcd is not 1, find the next prime
  }

  let d = modInverse(e, phi); // Compute private exponent

  return { publicKey: { e, N }, privateKey: { d, N } };
}

const signUp = async (req, res) => {
  //req.body={name,email,password}
  const userExist = await User.findOne({
    email: req.body.email,
  });
  //keyPair.publicKey or keyPair.privateKey
  // const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  //   modulusLength: 2048,
  //   publicKeyEncoding: {
  //     type: 'spki',
  //     format: 'der',
  //   },
  //   privateKeyEncoding: {
  //     type: 'pkcs8',
  //     format: 'der',
  //   }
  // })


  const { publicKey, privateKey } = generateRSAKeys();
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
    privateKey: JSON.stringify(privateKey),
    publicKey: JSON.stringify(publicKey),
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
    }, {
      latitude: req.body.latitude,
      longitude: req.body.longitude
    });
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


const myData = async (req, res) => {
  const userId = req.user._id;
  const updatedUser = await User.findOne({ _id: userId });
  res.status(200).json({
    message: " successfull",
    data: updatedUser,
  });
}


export { signUp, logIn, imageUploader, myData };