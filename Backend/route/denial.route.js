import express from "express";
import crypto from "crypto";
import { format } from "path";
import orderModel from "../model/order.model.js";
import { verifySignature } from "../controller/rsa.controller.js";

const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('denial.route', { title: 'Express' });
});
// router.get('/generate-key-pair', (req, res) => {
//     //keyPair.publicKey or keyPair.privateKey
//     const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//         modulusLength: 2048,
//         publicKeyEncoding: {
//             type: 'spki',
//             format: 'der',
//         },
//         privateKeyEncoding: {
//             type: 'pkcs8',
//             format: 'der',
//         }
//     })
//     res.send({ publicKey: publicKey.toString('base64'), privateKey: privateKey.toString('base64') })
// })
// router.post('/sign', (req, res) => {
//     let data = req.body.data
//     let privateKey = req.body.privateKey
//     privateKey = crypto.createPrivateKey({
//         key: Buffer.from(privateKey, 'base64'),
//         type: 'pkcs8',
//         format: 'der',
//     })
//     const sign = crypto.createSign('SHA256')
//     sign.update(data)
//     sign.end()
//     const signature = sign.sign(privateKey).toString('base64')
//     res.send({ data, signature })
// })

router.get('/verify', async(req, res) => {
    let {  payload,signature ,order_Id} = req.query
    const order=await orderModel.findOne({_id:order_Id}).populate("user")
    // console.log("Payload matra:",payload)
    // console.log("Order ko payload",order.payload)
    // console.log("Signature matra:",signature)
    // console.log("Yo chai order ko signature",order.signature)
    // console.log(typeof decodeURI(payload))
    

    // const publicKey = crypto.createPublicKey({
    //     key: Buffer.from(order.user.publicKey, 'base64'),
    //     type: 'spki',
    //     format: 'der',
    // })
    // let payload = req.query.payload.replace(/\+/g, '%20');
    const verify=await verifySignature(decodeURIComponent(payload), decodeURIComponent(signature), order.user.publicKey)
    
    console.log(order.user.publicKey)
    // console.log(order.user.privateKey)
    res.send({verify})
})
// router.post('/verify', (req, res) => {
//     let { data, publicKey, signature } = req.body
//     publicKey = crypto.createPublicKey({
//         key: Buffer.from(publicKey, 'base64'),
//         type: 'spki',
//         format: 'der',
//     })
//     const verify=crypto.createVerify("SHA256")
//     verify.update(data)
//     verify.end()
//     let result=verify.verify(publicKey,Buffer.from(signature, 'base64'))

//     res.send({verify:result})
// })




//used for sign and verify
// Function to perform modular exponentiation (used in signing/verification)
// function modExp(base, exponent, modulus) {
//     let result = 1n;
//     base = base % modulus;
    
//     while (exponent > 0n) {
//       if (exponent % 2n === 1n) {
//         result = (result * base) % modulus;
//       }
//       exponent = exponent / 2n;
//       base = (base * base) % modulus;
//     }
    
//     return result;
//   }
  
//   // Function to sign a message using private key (d, n)
//   function signMessage(message, privateKey) {
//     const [d, n] = privateKey.split(',').map(BigInt);
//     const messageHash = BigInt("0x" + Buffer.from(message).toString('hex')); // Convert message to hash
//     return modExp(messageHash, d, n); // Sign using modular exponentiation
//   }
  
//   // Function to verify a signature using public key (e, n)
//   function verifySignature(message, signature, publicKey) {
//     const [e, n] = publicKey.split(',').map(BigInt);
//     const messageHash = BigInt("0x" + Buffer.from(message).toString('hex')); // Convert message to hash
//     const computedSignature = modExp(signature, e, n); // Verify using modular exponentiation
//     return computedSignature === messageHash;
//   }
  


//to verify sign route
// router.get('/verify', async (req, res) => {
//     let { payload, signature, order_Id } = req.query;
//     const order = await orderModel.findOne({ _id: order_Id }).populate("user");
  
//     // Decode and verify the signature using the user's public key
//     const publicKey = order.user.publicKey;  // e,n from DB (Base64)
//     const decodedSignature = BigInt(signature);  // Convert signature from string to BigInt
  
//     // Verify the signature using the public key (e,n)
//     const isValid = verifySignature(payload, decodedSignature, publicKey);
  
//     res.send({ verify: isValid });
//   });
  
export default router;