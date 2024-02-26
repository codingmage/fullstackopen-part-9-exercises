import { Diagnosis, Patient } from "../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryDetails from "./Entries";

interface Props {
    patient: Patient | null
    diagnoses: Diagnosis[]
    loading: boolean
}

const SinglePatientPage = ({ patient, diagnoses, loading }: Props) => {

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!patient) {
        return <div>Patient not found!</div>;
    }


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

            <h4>Entries</h4>
                {patient.entries.map(entry => (
                    <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses}/>
                ))}
        </div>
    );
};

export default SinglePatientPage;