import crypto from "crypto";

function modPow(base, exponent, modulus) {
  base = BigInt(base);
  exponent = BigInt(exponent);
  modulus = BigInt(modulus);
  
  if (modulus === 1n) return 0n;
  
  let result = 1n;
  base = base % modulus;
  
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    base = (base * base) % modulus;
    exponent = exponent / 2n;
  }
  return result;
}

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // Take only the first 2 bytes to ensure it fits within our small modulus
  return hashArray.slice(0, 2);
}

async function signPayload(payload, privateKeyBase64) {
  try {
    const privateKeyObj = JSON.parse(Buffer.from(privateKeyBase64, 'base64').toString());
    const { n, d } = privateKeyObj;
    
    const hash = await sha256(payload);
    const messageNumber = BigInt('0x' + hash.map(b => b.toString(16).padStart(2, '0')).join(''));
    
  
    
    // Ensure message is smaller than modulus
    const message = messageNumber % BigInt(n);

    
    const signature = modPow(message, d, n);
   
    
    return Buffer.from(signature.toString()).toString('base64');
  } catch (error) {
    console.error('Error in signPayload:', error);
    console.log(error);
  }
}

async function verifySignature(payload, signature, publicKeyBase64) {
  try {
    const publicKeyObj = JSON.parse(atob(publicKeyBase64));
    const { n, e } = publicKeyObj;
    
    const signatureNumber = BigInt(Buffer.from(signature, 'base64').toString());
    
    
    const decryptedHash = modPow(signatureNumber, e, n);
    
    
    const hash = await sha256(payload);
    const originalHash = BigInt('0x' + hash.map(b => b.toString(16).padStart(2, '0')).join(''));
    const messageHash = originalHash % BigInt(n);
    
    return decryptedHash === messageHash;
  } catch (error) {
   
    console.log(error);
  }
}


export {signPayload, verifySignature};

