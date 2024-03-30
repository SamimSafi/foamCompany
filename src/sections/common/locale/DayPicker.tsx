import React from 'react';

interface DayProps {
  date: any;
}

export const DayPicker: React.FC<DayProps> = ({ date }) => {
  const getlanguageFromLocalStorage = localStorage.getItem('i18nextLng');
  const changeDateToDateFormat = new Date(date);
  let day = '';

  if (getlanguageFromLocalStorage !== 'en') {
    day = changeDateToDateFormat.toLocaleString('fa-IR', { weekday: 'long' });
  } else {
    day = changeDateToDateFormat.toLocaleString('en-US', { weekday: 'long' });
  }

  return <span>{day}</span>;
};
