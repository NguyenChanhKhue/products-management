// Button status
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