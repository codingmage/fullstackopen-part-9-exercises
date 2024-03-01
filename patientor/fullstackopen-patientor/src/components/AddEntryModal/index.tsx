import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import { EntryWithoutId } from "../../types";

interface Props {
    entryModalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryWithoutId) => void;
    error?: string;
}

const AddEntryModal = ({ entryModalOpen, onClose, onSubmit, error }: Props) => (
    <Dialog fullWidth={true} open={entryModalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new patient</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {/* <AddPatientForm onSubmit={onSubmit} onCancel={onClose}/> */}
      </DialogContent>
    </Dialog>
  );
  
  export default AddEntryModal;
  