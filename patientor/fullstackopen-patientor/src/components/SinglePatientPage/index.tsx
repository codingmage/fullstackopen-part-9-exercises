import { Diagnosis, Entry, EntryWithoutId, Patient } from "../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryDetails from "./Entries";
import { useState } from "react";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@mui/material";
import patientService from "../../services/patients";
import axios from 'axios';

interface Props {
    patient: Patient | null
    diagnoses: Diagnosis[]
    loading: boolean
}

const SinglePatientPage = ({ patient, diagnoses, loading}: Props) => {

    const [entryModalOpen, setEntryModalOpen] = useState<boolean>(false);
    const [entryError, setEntryError] = useState<string>();
    const [updatedEntries, setUpdatedEntries] = useState<Entry[]>();
  
    const openModal = (): void => setEntryModalOpen(true);
  
    const closeModal = (): void => {
      setEntryModalOpen(false);
      setEntryError(undefined);
    };

    const codeList = diagnoses.map(code => code.code);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!patient) {
        return <div>Patient not found!</div>;
    }

    const submitNewEntry = async (data: EntryWithoutId) => {
        try {
           const newEntry = await patientService.createEntry(patient?.id, data);
           if(!updatedEntries) {
            const entriesWithNew = patient.entries.concat(newEntry);
            setUpdatedEntries(entriesWithNew);
           } else {
            setUpdatedEntries([...updatedEntries, newEntry]);
           }
           
           setEntryModalOpen(false);
       } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error?.response?.data && typeof error?.response?.data === "string") {
              const message = error.response.data.replace('Something went wrong. Error: ', '');
              console.error(message);
              setEntryError(message);
            } else {
              setEntryError("Unrecognized axios error");
            }
          } else {
            console.error("Unknown error", error);
            setEntryError("Unknown error");
          }
       }
   };

    return (
        <div>
            <h3>
                {patient.name} 
                {patient.gender === "male" ? <MaleIcon /> : null}
                {patient.gender === "female" ? <FemaleIcon /> : null}
            </h3>

            <div>
                <p>DoB: {patient.dateOfBirth ? patient.dateOfBirth : "Unknown"}</p>
                <p>ssh: {patient.ssn ? patient.ssn : "Unknown"}</p>
                <p>occupation: {patient.occupation}</p>
            </div>

            <AddEntryModal codes={codeList} entryModalOpen={entryModalOpen} onClose={closeModal} onSubmit={submitNewEntry} entryError={entryError} />

            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>

            <h4>Entries</h4>
                {!updatedEntries ?
                patient.entries.map(entry => (
                    <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses}/>
                ))
                : updatedEntries.map(entry => (
                    <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses}/>
                ))
                }
        </div>
    );
};

export default SinglePatientPage;