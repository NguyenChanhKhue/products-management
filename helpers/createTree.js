function createTree(arr, parentID = "") {
  const tree = [];

  arr.forEach(item => {
    
    if (String(item.parent_id) === String(parentID)) {
      
      const newItem = item.toObject();

      const children = createTree(arr, String(item._id));
      if (children.length > 0) {
        newItem.children = children;
      }

      tree.push(newItem);
    }
  });

  return tree;
}

module.exports = {
  createTree
};
