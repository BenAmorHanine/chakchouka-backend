const User = require('../models/userModel');
const path = require('path');

exports.getUserProfile = async (req, res) => {
    try {
    const user = await User.findById(req.user._id);
  
    if (user) {
      res.json({
        name: user.name,
        followers: user.followers,
        follows:user.follows,
        bio:user.bio,
        picture: user.picture ? `http://localhost:3000/uploads/${path.basename(user.picture)}` : null,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }};

  
exports.uploadPicture = async (req, res) => {
    console.log('Request user:', req.user);
  try {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.picture =  path.join('uploads', req.file.filename);
    await user.save();

    res.status(200).json({ message: 'Picture uploaded successfully', picture: user.picture });
  } catch (error) {
    console.error('Error uploading picture:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getPicture = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || !user.picture) {
      return res.status(404).json({ message: 'User or picture  not found' });
    }

    res.sendFile(path.join(__dirname, '..', user.picture));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
