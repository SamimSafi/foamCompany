import React, { useCallback, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Iconify from 'src/components/Iconify';
// import Iconify from 'react-iconify';

interface CustomButtonProps {
  editMode: boolean;
  translate: (key: string) => string;
  isSubmitting: boolean;
  saveLabel: string;
  updateLabel: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  editMode,
  translate,
  isSubmitting,
  saveLabel,
  updateLabel,
}) => {
  const [disabled, setDisabled] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const debouncedHandleClick = useCallback(() => {
    handleClick();
  }, []);

  const handleClick = () => {
    if (isSubmittingForm) return;

    setIsSubmittingForm(true);

    // submit form

    setTimeout(() => {
      setIsSubmittingForm(false);
    }, 1000);
  };

  return (
    <>
      {isSubmittingForm ? (
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          loading={isSubmitting}
          onClick={debouncedHandleClick}
          startIcon={
            !editMode ? <Iconify icon="eva:plus-fill" /> : <Iconify icon="eva:edit-fill" />
          }
        >
          {!editMode ? saveLabel : updateLabel}
        </LoadingButton>
      ) : (
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={isSubmittingForm}
          onClick={debouncedHandleClick}
          startIcon={
            !editMode ? <Iconify icon="eva:plus-fill" /> : <Iconify icon="eva:edit-fill" />
          }
        >
          {/* {!editMode ? `${translate('CRUD.Save')}` : `${translate('CRUD.Update')}`} */}
          {!editMode ? saveLabel : updateLabel}
        </LoadingButton>
      )}
    </>
  );
};

export default CustomButton;
