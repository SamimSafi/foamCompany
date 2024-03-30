export function convertPersianNumberToEnlgish(str: any) {
  const persianNumberArr = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
    arabicNumberArr = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
  if (typeof str === 'string') {
    let i = 0;
    for (; i < 10; i++) {
      str = str.replace(persianNumberArr[i], i).replace(arabicNumberArr[i], i);
    }
  }
  return str;
}


export function convertToPersianNumerals(num: any)  {
  const persianNumerals = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const strNum = num.toString();

  let persianNum = '';
  for (let i = 0; i < strNum.length; i++) {
    const digit = parseInt(strNum[i]);
    persianNum += persianNumerals[digit];
  }

  return persianNum;
};
