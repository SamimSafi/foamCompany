import { ReactNode } from 'react';
// @mui
import { Dialog, DialogTitle } from '@mui/material';

type Props = {
  children: ReactNode;
  open: boolean;
  onClose: VoidFunction;
  size: 'xs' | 'md' | 'lg' | 'xl';
  title: string;
};

export default function MyDialog({ children, open, onClose, size, title }: Props) {
  return (
    <Dialog fullWidth maxWidth={size}  open={open} onClose={onClose} >
      <DialogTitle>{title}</DialogTitle>
      {children}
    </Dialog>
  );
}
