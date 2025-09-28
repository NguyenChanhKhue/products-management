module.exports = (query) => {
  // lưu các trạng thái button để render ra giao diện

  let fillterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    }
  ]

  // xử lý hiển thị màu cho button khi ấn vào
  if (query.status){
    const index = fillterStatus.findIndex(item => item.status == query.status); // tìm ra nút có status == status truyền vào url (khi ấn button)
    fillterStatus[index].class = "active"; // truyền active cho class đó
  }else{
    const index = fillterStatus.findIndex(item => item.status == ""); // button "tất cả"  
    fillterStatus[index].class = "active";
  }

  return fillterStatus
}