const User = require('../models/userModel');

exports.getUserProfile = async (req, res) => {
    try {
    const user = await User.findById(req.user._id);
  
    if (user) {
      res.json({
        name: user.name,
        followers: user.followers,
        follows:user.follows,
        bio:user.bio,
        picture: user.picture ? `http://your-domain.com/uploads/${path.basename(user.picture)}` : null, // Adjust domain and path as necessary
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }catch (error) {
    res.status(500).json({ message: 'Server error', error });
  };

  
exports.uploadPicture = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.picture = req.file.path; // Save the file path or URL to the user's picture field
    await user.save();

    res.status(200).json({ message: 'Picture uploaded successfully', picture: user.picture });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getPicture = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || !user.picture) {
      return res.status(404).json({ message: 'User or picture  not found' });
    }

    res.sendFile(path.resolve(user.picture), { root: '.' }); // Adjust the root directory as necessary
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
