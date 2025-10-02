module.exports = (objPagination , query , countProducts) => {
   
  if(query.page){
    objPagination.currentPage = parseInt(query.page)
  }
  objPagination.skip = (objPagination.currentPage - 1) * objPagination.itemsLimit


  const totalPage = Math.ceil(countProducts / objPagination.itemsLimit)
  objPagination.totalPages = totalPage

  return objPagination
}