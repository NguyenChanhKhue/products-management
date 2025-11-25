module.exports.createPost = (req, res, next) => {
    // check xem nếu chưa điền title
    if (!req.body.title) {
        res.redirect("create") // quay lại trang chính nó 
        return
    }
    next() // nếu ok thì tiếp tục
}