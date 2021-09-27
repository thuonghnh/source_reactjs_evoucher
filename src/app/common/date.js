const FORTMAT_DATE = "yyyy-mm-ddThh:ii:ss";
export const valueOfWeek = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6
};
const pad = number => {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}
export const convertJStoCwithString = (date = new Date()) => {
    let offset = date.getTimezoneOffset();
    offset = ((offset < 0 ? '+' : '-') + // Note the reversed sign!
        pad(parseInt(Math.abs(offset / 60)), 2) + ":" +
        pad(Math.abs(offset % 60), 2));
    let dd = pad(date.getUTCDate());
    let mm = pad(date.getMonth() + 1);
    let yyyy = date.getFullYear();
    let hour = pad(date.getHours());
    let minutes = pad(date.getMinutes());
    let mili = pad(date.getSeconds());
    let dp = (date.getMilliseconds() / 1000).toFixed(6).slice(2, 8) + offset;
    return yyyy + '-' + mm + '-' + dd + 'T' + hour + ':' + minutes + ':' + mili + '.' + dp;
}

export const formatDateYYYYMMDD = function (date) {
    if (isNaN(date.getDate())) return "";
    let dd = pad(date.getDate());
    let mm = pad(date.getMonth() + 1);
    let yyyy = date.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

export const MMDDYYYY = "mm/dd/yyyy";

export const get_current_day = function () {
    return new Date();
}

export const get_string_current_date_full = (date = new Date()) => {
    // let date = new Date();
    let dd = pad(date.getDate());
    let mm = pad(date.getMonth() + 1);
    let yyyy = date.getFullYear();
    let hour = pad(date.getHours());
    let minutes = pad(date.getMinutes());
    let mili = pad(date.getSeconds());
    return dd + '/' + mm + '/' + yyyy + " " + hour + ":" + minutes + ":" + mili;
}

export const get_string_current_date_custom = (dt = new Date()) => {
    if (!dt) return "";
    let date;
    if (typeof dt == "number") {
        date = new Date(dt);
    } else {
        date = dt;
    }
    let dd = pad(date.getDate());
    let mm = pad(date.getMonth() + 1);
    let yyyy = date.getFullYear();
    let hour = pad(date.getHours());
    let minutes = pad(date.getMinutes());
    let mili = pad(date.getSeconds());
    return dd + '-' + mm + '-' + yyyy + ' ' + hour + ':' + minutes + ':' + mili;
};

export const getTimestamp = function (date = new Date()) {
    return date.getTime();
}

export const formatDateFullWithHourFirst = function (date) {
    if (isNaN(date.getDate())) return "";
    let dd = pad(date.getDate());
    let mm = pad(date.getMonth() + 1);
    let yyyy = date.getFullYear();
    let hour = pad(date.getHours());
    let minutes = pad(date.getMinutes());
    let mili = pad(date.getSeconds());
    return hour + ":" + minutes + ":" + mili + " " + dd + '/' + mm + '/' + yyyy;
}


export const formatDateFull = function (date) {
    if (!date) return "";
    let dd = pad(date.getDate());
    let mm = pad(date.getMonth() + 1);
    let yyyy = date.getFullYear();
    let hour = pad(date.getHours());
    let minutes = pad(date.getMinutes());
    let mili = pad(date.getSeconds());
    return hour + ":" + minutes + ":" + mili + " " + dd + '/' + mm + '/' + yyyy;
}

export const formatDateMMDDYYYY = function (date) {
    if (!date) return "";
    let dd = pad(date.getDate());
    let mm = pad(date.getMonth() + 1);
    let yyyy = date.getFullYear();
    let hour = pad(date.getHours());
    let minutes = pad(date.getMinutes());
    let mili = pad(date.getSeconds());
    return mm + '-' + dd + '-' + yyyy + ' ' + hour + ":" + minutes + ":" + mili;
}

export const formatDateFirstMMDDYYYY = function (date) {
    if (!date) return "";
    let dd = pad(date.getDate());
    let mm = pad(date.getMonth() + 1);
    let yyyy = date.getFullYear();
    let hour = pad(date.getHours());
    let minutes = pad(date.getMinutes());
    let mili = pad(date.getSeconds());
    return mm + '-' + dd + '-' + yyyy + ' ' + "00:00:00";
}

export const formatDateLastMMDDYYYY = function (date) {
    if (!date) return "";
    let dd = pad(date.getDate());
    let mm = pad(date.getMonth() + 1);
    let yyyy = date.getFullYear();
    let hour = pad(date.getHours());
    let minutes = pad(date.getMinutes());
    let mili = pad(date.getSeconds());
    return mm + '-' + dd + '-' + yyyy + ' ' + "23:59:59";
}


export const formatDate = function (date) {
    if (!date) return "";
    let dd = pad(date.getDate());
    let mm = pad(date.getMonth() + 1);
    let yyyy = date.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}

export const getFormatDDMM = function (date) {
    if (!date) return "";
    let dd = pad(date.getDate());
    let mm = pad(date.getMonth() + 1);
    return dd + '/' + mm;
}

export const getFormatMMYY = function (date) {
    if (!date) return "";
    let mm = pad(date.getMonth() + 1);
    let yyyy = date.getFullYear();
    return mm + '/' + yyyy;
}

export const get_current_time = function () {
    //return current time with formate hh:mm
    let date = get_current_day();
    let hour = pad(date.getHours());
    let minutes = pad(date.getMinutes());
    return hour + ":" + minutes;
}

export const get7Days = function () {
    let result = [];
    for (let i = 0; i < 7; i++) {
        let d = new Date();
        d.setDate(d.getDate() - i);
        result.push(formatDate(d))
    }
    return (result.join(','));
}

export const convert_format_DateFull = function (date, formatDate = FORTMAT_DATE) {
    let day = pad(date.getDate());
    let month = pad(date.getMonth() + 1);
    let year = date.getFullYear();
    let hours = pad(date.getHours());
    let mins = pad(date.getMinutes());
    let mili = pad(date.getSeconds());
    return day + "/" + month + "/" + year + " " + hours + ":" + mins + ":" + mili;
}

export const convert_format_DDMMYY = function (date) {
    if (!date) return "";
    let day = pad(date.getDate());
    let month = pad(date.getMonth() + 1);
    let year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

export const convert_format_YYMMDD = function (date) {
    if (!date) return "";
    let day = pad(date.getDate());
    let month = pad(date.getMonth() + 1);
    let year = date.getFullYear();
    return year + "/" + month + "/" + day;
}

export const convert_format_DDMM = function (date) {
    if (!date) return "";
    let day = pad(date.getDate());
    let month = pad(date.getMonth() + 1);
    return day + "/" + month;
}

export const convert_format_MMYY = function (date) {
    let month = pad(date.getMonth() + 1);
    let year = date.getFullYear();
    return month + "/" + year;
}

export const convert_format_HHMM = function (date) {
    if (!date) return "";
    let hours = pad(date.getHours());
    let mins = pad(date.getMinutes());
    return hours + "h" + mins + "'";
}

export const get_display_day_of_week = function (date = new Date()) {
    let numberDayOfWeek = date.getDay();
    let displayDayOfWeek = "";
    switch (numberDayOfWeek) {
        case valueOfWeek.SUNDAY:
            displayDayOfWeek = "Chủ nhật";
            break;
        case valueOfWeek.MONDAY:
            displayDayOfWeek = "Thứ hai";
            break;
        case valueOfWeek.TUESDAY:
            displayDayOfWeek = "Thứ ba";
            break;
        case valueOfWeek.WEDNESDAY:
            displayDayOfWeek = "Thứ tư";
            break;
        case valueOfWeek.THURSDAY:
            displayDayOfWeek = "Thứ năm";
            break;
        case valueOfWeek.FRIDAY:
            displayDayOfWeek = "Thứ sáu";
            break;
        default:
            displayDayOfWeek = "Thứ bảy";
            break;
    }
    return displayDayOfWeek;
}

export const toDate = function (format) {
    if (!format) return "";
    let normalized = this.replace(/[^a-zA-Z0-9]/g, '-');
    let normalizedFormat = format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    let formatItems = normalizedFormat.split('-');
    let dateItems = normalized.split('-');

    let monthIndex = formatItems.indexOf("mm");
    let dayIndex = formatItems.indexOf("dd");
    let yearIndex = formatItems.indexOf("yyyy");
    let hourIndex = formatItems.indexOf("hh");
    let minutesIndex = formatItems.indexOf("ii");
    let secondsIndex = formatItems.indexOf("ss");

    let today = new Date();

    let year = yearIndex > -1 ? dateItems[yearIndex] : today.getFullYear();
    let month = monthIndex > -1 ? dateItems[monthIndex] - 1 : today.getMonth() - 1;
    let day = dayIndex > -1 ? dateItems[dayIndex] : today.getDate();

    let hour = hourIndex > -1 ? dateItems[hourIndex] : today.getHours();
    let minute = minutesIndex > -1 ? dateItems[minutesIndex] : today.getMinutes();
    let second = secondsIndex > -1 ? dateItems[secondsIndex] : today.getSeconds();

    return new Date(year, month, day, hour, minute, second);
};

export const checkExpriedTime = (fomatDate) => {
    return new Promise((resolve, reject) => {
        try {
            let date_time = fomatDate.split(" ");
            let day_month_year = date_time[0].split("/");
            let hour_minute = date_time[1].split(":");
            let expriedTime = new Date(day_month_year[2], parseInt(day_month_year[1]) - 1, day_month_year[0], hour_minute[0], hour_minute[1], 0).getTime();
            let currentTime = new Date().getTime();
            let isExpried = expriedTime < currentTime
            resolve(isExpried)
        } catch (error) {
            reject(error)
        }
    });
}

export const convertFormatMMDD = function (fomatDate) {
    let date = new Date(fomatDate);
    if (isNaN(date.getTime())) {
        date = new Date();
    }
    let dd = pad(date.getDate());
    let mm = pad(date.getMonth() + 1);
    return mm + '-' + dd;
}

export const getWYearByFormat = function (wYear = 0, fomatDate = "") {
    let date = new Date(fomatDate);
    if (isNaN(date.getTime())) {
        date = new Date();
    }
    return date.getFullYear() + wYear
}

export const DateDiff = (date1, date2) => {
    date1.setHours(0);
    date1.setMinutes(0, 0, 0);
    date2.setHours(0);
    date2.setMinutes(0, 0, 0);
    var datediff = Math.abs(date1.getTime() - date2.getTime()); // difference 
    return parseInt(datediff / (24 * 60 * 60 * 1000), 10); //Convert values days and return value      
}

const dayInMonth = (y, m) => new Date(y, m, 0).getDate();

export const getNext30Days = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month > 11) {
        year += 1;
        month = 1;
        let d = dayInMonth(year, month)
        day = (30 + day) - d;
    } else {
        month += 1;
        let d = dayInMonth(year, month)
        day = (30 + day) - d;
    }

    let dt = pad(month) + '-' + pad(day) + '-' + year;
    return new Date(dt)
}

export const getPrev30Days = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 2) {
        year -= 1;
        month = 12;
        let d = dayInMonth(year, month)
        day = (d + day) - 30;
    } else {
        month -= 1;
        let d = dayInMonth(year, month)
        day = (d + day) - 30;
    }

    let dt = pad(month) + '-' + pad(day) + '-' + year;
    return new Date(dt)
}