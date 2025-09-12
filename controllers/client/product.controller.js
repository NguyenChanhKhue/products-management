module.exports.index =  (req, res) => {
    res.render("client/pages/products/index",{
        pageTitle: "trang san pham"
    })
}

module.exports.create =  (req, res) => {
    res.render("client/pages/products/create"),{
        pageTitle:"trang create"
    }
}