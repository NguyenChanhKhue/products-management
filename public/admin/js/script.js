// File này không trực tiếp vào phàn product , chỉ lọc sản phẩm, ...



// Button status (dùng để lọc các sản phẩm theo status)
const buttonStatus = document.querySelectorAll("[button-status]")

if(buttonStatus.length > 0){

  let url = new URL(location.href) // lay ra url hien tai cua trang, class URL có những method có thể set được params cho url

  buttonStatus.forEach(button =>{
    button.addEventListener('click' , () =>{
      const status = button.getAttribute('button-status') // active, inactive , " "

      if(status){
        url.searchParams.set('status' , status) // set phần status thành status mình muốn status="active
      }
      else{
        url.searchParams.delete('status') // chọn tất cả sản phẩm
      }
      location.href = url.href // chuyển hướng các url theo button
    })
  })
}
//End button status


// form search
  const formSearch = document.querySelector('#form_search')
  if(formSearch){
    let url = new URL(location.href)
    formSearch.addEventListener("submit" , (e) => {
      e.preventDefault()
      const keyword = e.target.elements.keyword.value
      if(keyword){
        url.searchParams.set('keyword' , keyword) // set phần keyword tren url
      }
      else{
        url.searchParams.delete('keyword')
      }
      location.href = url.href
    })
  }
// end form search


// pagination
const buttonPaginations = document.querySelectorAll("[button-pagination]")
if(buttonPaginations){
  let url = new URL(location.href) 
  buttonPaginations.forEach(button => {
    button.addEventListener('click' , () => {
      const pageNum = button.getAttribute("button-pagination")
      url.searchParams.set('page' , pageNum)
      location.href = url.href
    })
  })
}
// end pagination


// upload image

const uploadImgage = document.querySelector("[upload-image]")
const uploadImgInput = document.querySelector("[upload-img-input]")
const uploadImgPreview = document.querySelector("[upload-img-preview]")

if(uploadImgage){
  uploadImgInput.addEventListener("change" , (e) => {
    console.log(e)
    const file = e.target.files[0] // lay ra anh dau tien , 1 object
    if(file){
      uploadImgPreview.src = URL.createObjectURL(file) // truyen file vao src
    }
  })
}

// cancel image
const cancelImage = document.querySelector("#cancel-image")
if(cancelImage){
  cancelImage.addEventListener("click" , (e) => {
    uploadImgInput.value = ""
    uploadImgPreview.src = ""
  })
}

// end cancel image
// end upload image



// Sort
const sort = document.querySelector("[sort]")
let url = new URL(location.href) 
if(sort){
  const sortSelect = sort.querySelector("[sort-select]")

  sortSelect.addEventListener('change', (e)=>{
    let value = e.target.value.split("-")
    let sortKey = value[0]
    let sortValue = value[1]

    url.searchParams.set("sortKey", sortKey)
    url.searchParams.set("sortValue", sortValue)

    location.href = url.href
  })
}

// button clear
const buttonClear = document.querySelector("[sort-clear]")

buttonClear.addEventListener("click",()=>{
  url.searchParams.delete("sortKey")
  url.searchParams.delete("sortValue")

  location.href = url.href
})
// end button clear

// them selected cho option (hien thi select sau khi load lai trang khi chon option)
const sortSelect = document.querySelector("[sort-select]")

const sortKey = url.searchParams.get("sortKey")
const sortValue = url.searchParams.get("sortValue")

if(sortKey && sortValue){
  const stringSort = `${sortKey}-${sortValue}`

  const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`)
  optionSelected.selected = true;
}
// End Sort