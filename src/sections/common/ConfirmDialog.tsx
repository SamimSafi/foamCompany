import { Button, Dialog, DialogTitle, DialogActions, TextField, Box } from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  onClose: VoidFunction;
  onYes: VoidFunction;
  message: string;
}

export default function ConfirmDialog({ open, onClose, onYes, message }: ConfirmDialogProps) {
  return (
    <Dialog open={open} fullWidth maxWidth="xs" onClose={onClose}>
      <DialogTitle>{message}</DialogTitle>
      <Box sx={{ ml: 4, mt: 4 }}>
        <TextField
          margin="dense"
          size="small"
          id="outlined-basic"
          label="Remarks"
          variant="outlined"
        />
      </Box>

      <DialogActions>
        <Button variant="contained" onClick={onYes}>
          Yes
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
