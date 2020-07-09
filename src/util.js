/**
* Determine whether two values of any type are equal
* 
* @param {*} val1 The first value being checked for equality
* @param {*} val2 The second value being checked for equality
* @returns {boolean} whether the values are equal
*/
const equals = (val1, val2) => {
    if (val1 === val2) return true;
    if (val1.isEqual) return val1.isEqual(val2); //if object contains isEqual method, compare using isEqual()
    return false;
}

module.exports = {
    "equals": equals
}