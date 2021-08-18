const getFilterFields = (filterString = {}) => {
  const obj = {};
  const arr = filterString.split(";");
  for (let i of arr) {
    let childArr = i.split(":");
    obj[childArr[0]] = childArr[1];
  }
  return obj;
};

const a2b = str => Buffer.from(str, 'base64').toString('binary');
const b2a = str => new Buffer.from(str, 'binary').toString('base64');

module.exports = { getFilterFields, a2b, b2a};


