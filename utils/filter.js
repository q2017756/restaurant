// ---------------NumberFormat---------------

//将金额形式转换成数字形式
export const currencyToNormal = stringNum => {
  return stringNum.replace(/[^\d\.-]/g, "");
};

//把不是数字的当0返回
export const naN = num => {
  if (Number.isNaN(num)) return 0;
  return num;
};

// ---------------StringFormat---------------

//获取最后几位字符
const DEFAULT_LAST_CHAR = 4;
export const lastChar = (str, length = DEFAULT_LAST_CHAR) => {
  str = String(str);
  return str.substring(str.length - length);
};

// ---------------TimeFormat---------------
export const normalTime = time => {
  if (time) {
    const oDate = new Date();
    oDate.setTime(time);
    const y = oDate.getFullYear();
    const month = oDate.getMonth() + 1;
    const d = oDate.getDate();
    const h = oDate.getHours();
    const m = oDate.getMinutes();
    const s = oDate.getSeconds();
    return y + "-" + month + "-" + d + " " + h + ":" + m + ":" + s;
  }
};

export const dateFormat = timeString => {
  let formatString = String(timeString).split("T");
  return formatString[0];
};

export const dateTimeFormat = timeString => {
  let formatString = String(timeString).replace("T", " ");
  return formatString;
};

// ---------------XXXFormat---------------
