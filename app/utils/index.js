const getFilterFields = (filterString = {}) => {
  const obj = {};
  const arr = filterString.split(";");
  for (let i of arr) {
    let childArr = i.split(":");
    obj[childArr[0]] = childArr[1];
  }
  return obj;
};

module.exports = { getFilterFields };
