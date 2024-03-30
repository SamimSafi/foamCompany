import { ReactNode } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
// @mui
import { styled } from '@mui/material/styles';
import { Box, BoxProps, Typography } from '@mui/material';
//
import EditorToolbar, { formats, redoChange, undoChange } from './EditorToolbar';
//
import useLocales from 'src/hooks/useLocales';
import { language } from 'src/utils/general';
import { makeStyles } from '@mui/styles';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  '& .ql-container.ql-snow': {
    borderColor: 'transparent',
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily,
  },
  '& .ql-editor': {
    minHeight: 200,
    maxHeight: 640,
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.disabled,
    },
    '& pre.ql-syntax': {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900],
    },
  },
}));

// ----------------------------------------------------------------------

export interface Props extends ReactQuillProps {
  id?: string;
  error?: boolean;
  simple?: boolean;
  helperText?: ReactNode;
  sx?: BoxProps;
}

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  helperText,
  sx,
  ...other
}: Props) {
  const modules = {
    toolbar: {
      container: `#${id}`,
      handlers: {
        undo: undoChange,
        redo: redoChange,
      },
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };
  const { translate } = useLocales();
  const language = window.localStorage.getItem('i18nextLng');

  // const useStyles = makeStyles((theme) => ({
  //   quillContainer: {
  //     dir: language === 'en' ? 'ltr' : 'rtl',
  //   },
  //   placeholder: {
  //     direction: language === 'en' ? 'ltr' : 'rtl',
  //
  //   },
  // }));

  // Inside the component
  // const classes = useStyles();

  return (
    <div>
      <RootStyle
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} />
        {/* <div className={classes.quillContainer}> */}
        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={translate('InternalDocument.WriteCommentsHere')}
          //dir={language === 'en' ? 'ltr' : 'rtl'}
          {...other}
        />
        {/* {value === '' && (
            <div className={classes.placeholder}>
              {translate('InternalDocument.WriteCommentsHere')}
            </div>
          )}
        </div> */}
        {/* {value === '' && (
          <Typography
            color="text.secondary"
            dir={language === 'en' ? 'right' : 'left'}
            // sx={{
            //   textAlign: language === 'en' ? 'ltr' : 'rtl',
            // }}
          >
            {translate('InternalDocument.WriteCommentsHere')}
          </Typography>
        )} */}
      </RootStyle>

      {helperText && helperText}
    </div>
  );
}
