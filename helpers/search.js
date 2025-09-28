module.exports = (query) => {
  let objSearch = {
    keyword: ""     // luu tu khoa nguoi dung nhap vao o tim kiem
  }

  if(query.keyword){
    objSearch.keyword = query.keyword

    const regex = new RegExp(objSearch.keyword , "i") // tim tat ca cac san pham lien quan , (i : k phan biet hoa thuong)

    objSearch.regex = regex  // truyen keyword la title de loc ra san pham
  }

  return objSearch
}