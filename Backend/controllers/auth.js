// // controllers/auth.controller.js
// const User = require('../model/user');

// exports.syncUser = async (req, res) => {
//   const firebaseUser = req.firebaseUser;
//   const { email, name, uid } = firebaseUser;

//   try {
//     let user = await User.findOne({ email });

//     if (!user) {
//       // Create user if not exists
//       user = await User.create({
//         email,
//         name: name || '',
//         role: 'VOTER' // default role
//       });
//     }

//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };




// const User = require('../model/user');

// exports.syncUser = async (req, res) => {
//   const firebaseUser = req.firebaseUser;
//   const { email, name } = firebaseUser;

//   try {
//     let user = await User.findOne({ email });

//     if (!user) {
//       // Create user if not exists
//       user = await User.create({
//         email,
//         name: name?.trim() || 'Unnamed User', // ✅ Fallback for missing name
//         role: 'VOTER'
//       });
//     }

//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error("❌ Error syncing user:", error); // ✅ helpful for debugging
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// const User = require('../model/user');

// exports.syncUser = async (req, res) => {
//   const firebaseUser = req.firebaseUser;
//   const { email, name, uid, role } = { ...firebaseUser, ...req.body };
//   console.log("Email:", email); // Debugging line to check the email
//   console.log("Name:", name); // Debugging line to check the name
//   console.log("UID:", uid); // Debugging line to check the UID
  
//   try {
//     let user = await User.findOne({ email });

//     if (!user) {
//       user = await User.create({
//         email,
//         name: name,
//         firebaseUid: uid, 
//         role: role
//       });
//     }

//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error("❌ Error syncing user:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


//controllers/auth.js
const User = require('../model/user');
const Candidate = require('../model/candidate');

exports.syncUser = async (req, res) => {
  const firebaseUser = req.firebaseUser;
  const { email, uid } = firebaseUser;
  const { name, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // Step 1: Create User
      user = await User.create({
        email,
        name: name || '',
        role: (role || 'VOTER').toUpperCase(),
        firebaseUid: uid,
      });

      // Step 2: If role is candidate, create Candidate profile
      if ((role || '').toUpperCase() === 'CANDIDATE') {
        await Candidate.create({
          user: user._id,
          election: null, // or you can require frontend to send this later
          name: user.name,
          bio: '', // to be filled later by user
          vision: '', // to be filled later by user
        });
      }
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.warn('❌ Error syncing user:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

