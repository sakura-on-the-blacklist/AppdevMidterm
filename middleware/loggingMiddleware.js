//every time the user login or register, console will give logs

const logMessage = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

module.exports = { logMessage };

