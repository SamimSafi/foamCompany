import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  fieldset: {
    borderWidth: '1px',
    borderColor: 'info',
    borderRadius: '12px',
    padding: '36px',
    marginBottom: '6px',
  },
  legend: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '6px',
    color: 'info',
  },
});

interface FieldsetProps {
  legend: string;
}

const Fieldset: React.FC<FieldsetProps> = ({ legend, children }) => {
  const classes = useStyles();

  return (
    <fieldset className={classes.fieldset}>
      <legend className={classes.legend}>{legend}</legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;
