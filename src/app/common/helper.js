import Cookies from "universal-cookie";


//////////////////////////////////////////////////////////////////////
export function isObject(obj) {
    return obj !== undefined && obj !== null && obj.constructor === Object;
}

export function isArray(obj) {
    return obj !== undefined && obj !== null && obj.constructor === Array;
}

export function isBoolean(obj) {
    return obj !== undefined && obj !== null && obj.constructor === Boolean;
}

export function isFunction(obj) {
    return obj !== undefined && obj !== null && obj.constructor === Function;
}

export function isNumber(obj) {
    return obj !== undefined && obj !== null && obj.constructor === Number;
}

export function isString(obj) {
    return obj !== undefined && obj !== null && obj.constructor === String;
}

export function isJSON(str) {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}

export function isInstanced(obj) {
    if (obj === undefined || obj === null) { return false; }

    if (isArray(obj)) { return false; }
    if (isBoolean(obj)) { return false; }
    if (isFunction(obj)) { return false; }
    if (isNumber(obj)) { return false; }
    if (isObject(obj)) { return false; }
    if (isString(obj)) { return false; }

    return true;
}


export const isEmpty = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


export const IsEmptyObject = (obj) => isEmpty(obj);
export const IsEmptyArray = (arr) => isArray(arr) && arr.length === 0;
export const IsEmptyString = (string) => isString(string) && string.trim().length === 0;
export const IsNonStringEmpty = (string) => isString(string) && string.trim().length > 0;
export const IsNonArrayEmpty = (arr) => isArray(arr) && arr.length > 0;

// Return Boolean 
export function IsValidateObject(object) {
    return (object !== undefined && object !== null);
}

// Return Boolean 
export function hasProperty(object, property) {
    return (IsValidateObject(object) && object.hasOwnProperty(property) && IsValidateObject(object[property]));
}

//Return value object 
export function emptyItem(item) {
    if (!IsValidateObject(item)) {
        return '';
    }
    return item;
}

///////////////////cookie/////////////////////////
const cookie = new Cookies();
export const setCookie = (key, value, options) => {
    return cookie.set(key, value, options)
}

export const getCookie = (key) => {
    return cookie.get(key)
}

export const removeCookie = (key) => {
    cookie.remove(key);
}

///////////////////////////////////////////////////


//sort
export const dynamicSort = (property) => {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return (a, b) => {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
//sort mutiple params
export const dynamicSortMultiple = (params) => {
    let props = params;
    return (obj1, obj2) => {
        var i = 0, result = 0, numberOfProperties = props.length;
        while (result === 0 && i < numberOfProperties) {
            result = this.dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

//ex: param = 'column1'
export const sort = (data, param) => {
    return data.sort(this.dynamicSort(param));
}

//ex: params = ['column1', 'column2']
export const sortMutiple = (data, params) => {
    return data.sort(this.dynamicSortMultiple(params));
}

export const toFixedSpecial = function (n) {
    let str = this.toFixed(n).replace(/\.?0+$/, "");
    if (str.indexOf('e+') < 0)
        return str;

    // if number is in scientific notation, pick (b)ase and (p)ower
    return str.replace('.', '').split('e+').reduce(function (p, b) {
        return p + Array(b - p.length + 2).join(0);
    }) + '.' + Array(n + 1).join(0);
};

export const convertNum = function (n, isShowFormat = true) {
    if (!isNumber(n)) return convertNum(0);
    let newNumber = parseInt(n);
    if (isShowFormat) return newNumber.toFixedSpecial(3).replace('.', ',') // replace decimal point character with ,
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '??';
    return newNumber.toFixedSpecial(3).replace('.', ',') // replace decimal point character with ,
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const convertDecimal = (value) => {
    return value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}

export const validateNumber = (value) => {
    return value.replace(/[^0-9]/g, '');
}

export const removeAccent = (str) => {
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
    str = str.replace(/??|??|???|???|??/g, "i");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
    str = str.replace(/???|??|???|???|???/g, "y");
    str = str.replace(/??/g, "d");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "A");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "E");
    str = str.replace(/??|??|???|???|??/g, "I");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "O");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "U");
    str = str.replace(/???|??|???|???|???/g, "Y");
    str = str.replace(/??/g, "D");
    return str;
}

export const compare2Array = function (before, after) {
    // console.log("compare:::::::");
    // console.log("compare:::::::", before);
    // console.log("compare:::::::", after);
    if (!isArray(before) || !isArray(after)) return true;
    if (before.length !== after.length) return true;
    let changed = after.filter(function (p, idx) {
        return Object.keys(p).some(function (prop) {
            return p[prop] !== before[idx][prop];
        })
    });
    // console.log("compare:::::::", changed);
    if (changed.length === 0) return true;
    return false;
}

export const countProps = function (obj) {
    var count = 0;
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            count++;
        }
    }
    return count;
};

const checkIgnoreProperty = (property, ignorePropertys) => IsEmptyArray(ignorePropertys) ? true : ignorePropertys.findIndex(p => p === property) === -1;

//so s??nh 2 object
export const objectEquals = function (v1, v2, ignorePropertys = []) {

    if (typeof (v1) !== typeof (v2)) {
        return false;
    }

    if (typeof (v1) === "function") {
        return v1.toString() === v2.toString();
    }

    if ((v1 instanceof Object && v2 instanceof Object)) {
        console.log("objectEquals:", countProps(v1), countProps(v2));
        if (countProps(v1) !== countProps(v2)) {
            return false;
        }
        var r = true;
        for (let k in v1) {
            if (v1[k] instanceof Array && v2[k] instanceof Array) return true;
            r = objectEquals(v1[k], v2[k]);
            let shouldBeIgnore = checkIgnoreProperty(k, ignorePropertys);
            if (!r && shouldBeIgnore) {
                return false;
            }
        }
        return true;
    } else {
        return v1 === v2;
    }
}
//convert 1 property trong object c???a arr th??nh 1 chu???i c??ch nhau d???u ,
export const convertPropertyInArrToString = (arr, property) => {
    if (!arr) return "";
    return arr.map((x) => {
        return x[property];
    }).join();
}

export const convertPropertyInArrToList = (arr, property) => {
    if (!arr) return "";
    return arr.map((x) => {
        return x[property];
    });
}

const maskString = (result) => {
    let dataFormat = ""
    if (result.length > 0) {
        dataFormat = result[0];
        for (let i = 1; i < result.length; i++) {
            dataFormat += ("," + result[i]);
        }
    }
    return dataFormat
}

const sliceString = (data) => {
    let newData = data.toString();
    let result = [];
    if (isString(newData) && (newData !== '0')) {
        let len = newData.length;
        let mod = Math.floor(len / 3);
        for (let index = mod; index >= 0; index--) {
            let begin = -(index + 1) * 3;
            let end = len - index * 3
            let subString3 = newData.slice(begin, end);
            if (subString3) {
                result.push(subString3)
            }
        }
    }
    return result;
}

export const convertMaskString = (strNumber) => {
    return maskString(sliceString(strNumber));
}

export const removeMaskString = (maskNumber) => {
    let result = "";
    if (isString(maskNumber)) {
        result = maskNumber.replace(/[,]/g, "");
    }
    return result;
}

export const replaceSpace = (text) => {
    if (!text) return "";
    return text.replaceAll(" ", "");
}


//k?? t??? nh???p v??o ph???i thu???c chu???i cho tr?????c
export const replaceCharacter = (text, str) => {
    if (!text) return "";
    let arr = text.split("");
    let term = "";
    arr.forEach(x => {
        if (str.includes(x.toUpperCase())) {
            term += x;
        }
    })
    return term;
}

//ch??? ???????c nh???p ch??? v?? s???
export const validateCharAndNum = (value) => {
    return value.replace(/[^a-z0-9]/gi, '');
}
//ch??? ???????c nh???p ch???
export const validateChar = (value) => {
    return value.replace(/[^a-z]/gi, '');
}
//lo???i b??? k?? t??? tr??ng trong m???ng
export const uniqueList = (arr) => {
    return Array.from(new Set(arr)) //
}

