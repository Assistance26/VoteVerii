// middleware/auth.js
const admin = require('../config/firebaseAdmin');

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  console.log("token at backend:", token);
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.firebaseUser = decoded; // Add Firebase user info to request 
    console.log("fb user: ", req.firebaseUser);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyFirebaseToken;


// const admin = require('../config/firebaseAdmin');
// const Candidate = require('../model/candidate'); // adjust path if needed

// const verifyFirebaseToken = async (req, res, next) => {
//   const token = req.headers.authorization?.split('Bearer ')[1];
//   console.log("🔐 Token received in backend:", token);

//   if (!token) {
//     console.log("❌ No token provided in Authorization header");
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     const decoded = await admin.auth().verifyIdToken(token);
//     console.log("✅ Firebase token decoded:", decoded);

//     // Look up candidate by Firebase UID
//     const candidate = await Candidate.findOne({ firebaseUid: decoded.uid });
//     if (!candidate) {
//       console.log("❌ No candidate found for Firebase UID:", decoded.uid);
//       return res.status(403).json({ message: 'Candidate not found in system' });
//     }

//     // Attach user with candidateId
//     req.user = {
//       firebaseUid: decoded.uid,
//       email: decoded.email,
//       candidateId: candidate._id,
//     };

//     console.log("✅ Authenticated user attached to req.user:", req.user);
//     next();
//   } catch (err) {
//     console.error("❌ Error verifying Firebase token:", err);
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// module.exports = verifyFirebaseToken;
