import { Button, Dialog, DialogTitle, DialogActions, TextField, Box } from '@mui/material';

interface Props {
  date: any;
}

export const DateConverter: any = ({ date }: Props) => {
  const getlanguageFromLocalStorage = localStorage.getItem('i18nextLng');
  const changeDateToDateFormat = new Date(date!);
  let changeDateToLocale = '';
  let day = '';
  if (getlanguageFromLocalStorage !== 'en') {
    changeDateToLocale = changeDateToDateFormat.toLocaleDateString('fa-IR');
    day = changeDateToDateFormat.toLocaleString('fa-IR', { weekday: 'long' });
  } else {
    changeDateToLocale = changeDateToDateFormat.toLocaleDateString('en-US');
    day = changeDateToDateFormat.toLocaleString('en-US', { weekday: 'long' });
  }
  return changeDateToLocale;
};
