import { Dialog, DialogTitle, DialogContent, Divider, Alert, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Input, Select, SelectChangeEvent, MenuItem, InputLabel, Box, Button } from '@mui/material';
import { Diagnosis, EntryWithoutId, HealthCheckRating, newHealthCheck, newHospital, newOccupationalHealthcare } from "../../types";
import { SyntheticEvent, useState } from 'react';

interface Props {
    entryModalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: EntryWithoutId) => void;
    entryError?: string;
    codes: string[]
}

const AddEntryModal = ({ entryModalOpen, onClose, onSubmit, entryError, codes }: Props) => {

  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("Hospital");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"][]>([]);
  const [healthRating, setHealthRating] = useState<0 | 1 | 2 | 3>(0);
  const [discharge, setDischarge] = useState<{date: string, criteria: string}>({date: "", criteria:""});
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeave, setSickLeave] = useState<{startDate: string, endDate: string}>({startDate: "", endDate: ""});

  const resetState = () => {
    setDate("");
    setDescription("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setHealthRating(0);
    setDischarge({date: "", criteria:""});
    setEmployerName("");
    setSickLeave({startDate: "", endDate: ""});
  };

  const ratings = [0, 1, 2, 3];

  const changeCodes = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const value = event.target.value;
    if (typeof value === "string") {
      setDiagnosisCodes([value]);
    } else {
      setDiagnosisCodes(value);
    }
  };

  const changeRating = (event: SelectChangeEvent<HealthCheckRating>) => {
    event.preventDefault();
    const value = event.target.value;
    const number = Number(value);

    if (number === 0 || number === 1 || number === 2 || number === 3) {
      setHealthRating(number);
    }
  };



  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    switch (type) {
      case "Hospital":
        const newHospitalEntry: newHospital = {
          date,
          description,
          discharge,
          specialist,
          type,
          diagnosisCodes
        };

        onSubmit(newHospitalEntry);
        break;

      case "HealthCheck":
        const newHealthCheckEntry: newHealthCheck = {
          date,
          description,
          healthCheckRating: healthRating,
          specialist,
          type,
          diagnosisCodes
        };
        onSubmit(newHealthCheckEntry);
        break;

      case "OccupationalHealthcare":
        const newOccupationalEntry: newOccupationalHealthcare = {
          date,
          description,
          employerName,
          specialist,
          type,
          diagnosisCodes,
          sickLeave: sickLeave.startDate !== "" && sickLeave.endDate !== "" ? sickLeave : undefined
        };
        onSubmit(newOccupationalEntry);
        break;

      default:
        throw new Error("Unknown entry type");
    }};

  return (
      <Dialog fullWidth={true} open={entryModalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a new entry</DialogTitle>
        <Divider />
        <DialogContent>
          {entryError && <Alert severity="error">{entryError}</Alert>}
          <div>
            <form onSubmit={addEntry}>
                <FormLabel>Entry type</FormLabel>
                <RadioGroup
                  row
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <FormControlLabel value="Hospital" control={<Radio />} label="Hospital" />
                  <FormControlLabel value="HealthCheck" control={<Radio />} label="HealthCheck" />
                  <FormControlLabel value="OccupationalHealthcare" control={<Radio />} label="OccupationalHealthcare" />
                </RadioGroup>

                <Input onChange={(e) => setDate(e.target.value)} value={date} type='date' />

                <TextField
                  label="Description"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <TextField
                  label="Specialist"
                  fullWidth
                  value={specialist}
                  onChange={(e) => setSpecialist(e.target.value)}
                />

                {type === "Hospital" ? 
                <div>
                  <InputLabel id="discharge-label">Discharge</InputLabel>

                  <Box sx={{border: "1px solid gray", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                    <InputLabel id="dischargeDate-label">Date</InputLabel>
                    <Input onChange={(e) => setDischarge(oldState => ({...oldState, date: e.target.value}))} value={discharge.date} type='date' />
                    <TextField
                      label="Criteria"
                      fullWidth
                      value={discharge.criteria}
                      onChange={(e) => setDischarge(oldState => ({...oldState, criteria: e.target.value}))}
                    />
                  </Box>
                  
                </div> : null}

                {type === "HealthCheck" ? 
                <div>
                  <InputLabel id={"rating-label"}>Health Check Rating</InputLabel>
                  <Select
                    label="Health Check Rating"
                    value={healthRating}
                    onChange={changeRating}
                  >
                    {ratings.map(rating => (
                      <MenuItem key={rating} value={rating}>{rating}</MenuItem>
                    ))}

                  </Select>
                  
                </div> : null}

                {type === "OccupationalHealthcare" ? 
                  <div>
                    <TextField
                      label="Employer Name"
                      fullWidth
                      value={employerName}
                      onChange={(e) => setEmployerName(e.target.value)}
                    />

                    <Box sx={{border: "1px solid gray", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                      <InputLabel id="startDate-label">Start Date</InputLabel>
                      <Input onChange={(e) => setSickLeave(oldState => ({...oldState, startDate: e.target.value}))} value={sickLeave?.startDate} type='date' />
                      <InputLabel id="endDate-label">End Date</InputLabel>
                      <Input onChange={(e) => setSickLeave(oldState => ({...oldState, endDate: e.target.value}))} value={sickLeave?.endDate} type='date' />
                    </Box>


                  </div> : null}

                <div>
                  <InputLabel id="code-label">Diagnosis Codes</InputLabel>
                  <Select
                    labelId="code-label"
                    label="Diagnosis Codes"
                    fullWidth
                    multiple
                    value={diagnosisCodes}
                    onChange={changeCodes}
                  >
                    {codes.map((c) => (
                      <MenuItem key={c} value={c}> {c} </MenuItem>
                    ))}

                  </Select>
                </div>

                <div>
                  <Button onClick={resetState} variant="outlined">Reset</Button>
                  <Button type='submit' variant="contained">Submit</Button>

                </div>

            </form>
          </div>
        </DialogContent>
      </Dialog>
);};
  
  export default AddEntryModal;
  