// hello.js
module.exports = (req, res, next) => {
    // res.header("Content-Range", "users 0-5/10");
    next();
};
