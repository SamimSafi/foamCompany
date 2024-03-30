import useSettings from 'src/hooks/useSettings';

export function language(setCookie?: boolean) {
  let language = window.localStorage.getItem('i18nextLng');
  if (setCookie) {
    if (language === 'en') {
      language = 'c%3Den%7Cuic%3Den';
    } else if (language === 'ps') {
      language = 'c%3Dps-AF%7Cuic%3Dps-AF';
    } else if (language === 'dr') {
      language = 'c%3Dfa-IR%7Cuic%3Dfa-IR';
    }
  } else {
    if (language === 'en') {
      language = 'en';
    } else if (language === 'ps') {
      language = 'ps-AF';
    } else if (language === 'dr') {
      language = 'fa-IR';
    }
  }
  return language;
}
export function getCurrentDay() {
  let weekday = [''];
  if (language() == 'en') {
    weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  } else {
    weekday = ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهار شنبه', 'پنج شنبه', 'جمع', 'شنبه'];
  }

  const d = new Date();
  let day = weekday[d.getDay()];
  return day;
}

export function getIDforHiglightTableRecord() {
  return parseInt(window.localStorage.getItem('hilightID')!);
}
export function removeIDforHiglightTableRecord() {
  window.localStorage.removeItem('hilightID');
}

export function themeMode() {
  const obj = window.localStorage.getItem('settings')?.toString();
  const theme = JSON.parse(obj!);
  return theme.themeMode;
}
//themeMode() === 'light' ? '' : ''
export const highlightColor = {
  lightGreen: '#29b6f6',
  darkGreen: '#006064',
};

export const COLOR_OPTIONS = [
  //'#00AB55', // theme.palette.primary.main,
  // '#1890FF', // theme.palette.info.main,
  '#54D62C', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  //'#04297A', // theme.palette.info.darker
  //'#7A0C2E', // theme.palette.error.darker
];
// Time Getting From Date
export function getTimeFromDate(dateTimeString: any) {
  const timeIndex = dateTimeString.indexOf('T') + 1;
  return dateTimeString.substring(timeIndex);
}

// Getting Date from DateTime string
export function getDateFromDateTime(dateTimeString: any) {
  const date = new Date(dateTimeString);
  return date.toISOString().split('T')[0];
}

export function stripHtmlTags(html: any, isSubstring?: boolean) {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return isSubstring != false ? temp.textContent!.substring(0, 30) : temp.textContent!;
}
