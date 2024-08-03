const bcrypt = require('bcryptjs');

const matchPassword = async (enteredPassword, storedPassword) => {
    return await bcrypt.compare(enteredPassword, storedPassword);
  };

  module.exports=(matchPassword);