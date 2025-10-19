// Xử lý các logic cho danh sách sản phẩm , sửa xoá , thay đổi trạng thái hoạt động

// Change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")
if(buttonChangeStatus.length > 0){

  const formChangeStatus = document.querySelector("#form-change-status")
  const dataPath = formChangeStatus.getAttribute("data-path")

  console.log(dataPath)

  buttonChangeStatus.forEach(button => {
    button.addEventListener('click' , () => {
      const statusCurrent = button.getAttribute("data-status")
      const id = button.getAttribute("data-id")

      let statusChange = statusCurrent == "active" ? "inactive" : "active"

      // console.log(statusCurrent)
      // console.log(id)
      // console.log(statusChange)

      ///admin/products/change-status/active/2313
      const action = dataPath + `/${statusChange}/${id}?_method=PATCH` // update 1 field data
      
      // truyền lại action vào form để gửi đi
      formChangeStatus.action = action // action trong form bằng action vừa tạo 

      // sau đó gửi form đi
      formChangeStatus.submit()
    })
  })
}
// End change status

// Delete item
const buttonDelete = document.querySelectorAll("[button-delete]") 
if(buttonDelete.length > 0){

  const formDeleteItem = document.querySelector("#form-delete-item")
  const path = formDeleteItem.getAttribute("data-path")

  buttonDelete.forEach(button => {
    button.addEventListener("click" , () => {
      // in ra thong bao co muon xoa san pham nay hay khong 
      const isConfirm = confirm("Bạn có muốn xoá sản phẩm này hay không?")

      if(isConfirm){
        // lay ra id cua san pham can xoa 
        const id = button.getAttribute("data-id")
        
        // route hoan chinh de xoa 1 san pham
        const action = `${path}/${id}?_method=DELETE`
        formDeleteItem.action = action
        formDeleteItem.submit()
      }
    })
  })
}
// End delete item