const bcrypt = require('bcryptjs');

// Fonction pour hasher le mot de passe
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = {
  hashPassword
};
