import { Patient } from "../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

interface Props {
    patient: Patient | null
}

const SinglePatientPage = ({ patient }: Props) => {

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

            <ul>
                <li>DoB: {patient.dateOfBirth ? patient.dateOfBirth : "Unknown"}</li>
                <li>ssh: {patient.ssn ? patient.ssn : "Unknown"}</li>
                <li>occupation: {patient.occupation}</li>
            </ul>
        </div>
    );
};

export default SinglePatientPage;