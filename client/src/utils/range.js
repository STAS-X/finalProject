// hello.js
module.exports = (req, res, next) => {
    res.header("Content-Range", "posts 0-10/20");
    next();
};
