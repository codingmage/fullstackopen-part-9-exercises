import { Diagnosis, Entry } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

type HospitalType = Extract<Entry, {type: "Hospital"}>;

interface HospitalProps {
    entry: HospitalType;
    diagnoses: Diagnosis[];
}

type HealthCheckType = Extract<Entry, {type: "HealthCheck"}>;

interface HealthCheckProps {
    entry: HealthCheckType;
    diagnoses: Diagnosis[];
}

type OccupationalType = Extract<Entry, {type: "OccupationalHealthcare"}>;

interface OccupationalProps {
    entry: OccupationalType;
    diagnoses: Diagnosis[];
}

const HospitalEntry = ({entry, diagnoses}: HospitalProps) => {

    return (
        <div className="boxWithBorder">
            <p className="dateWithIcon">
                {entry.date}
                <LocalHospitalIcon />
            </p>
            <span>{entry.description}</span>

            <ul>
                {entry.diagnosisCodes?.map(code => (
                    <li key={code}>{code} {diagnoses.map(c => c.code === code ? c.name : null)}</li>
                ))}
            </ul>

            <div>
                Discharge date: {entry.discharge.date} - Criteria: {entry.discharge.criteria} 
            </div>
            
            <p>Diagnosed by {entry.specialist}</p>
        </div>
    );
};

const HealthEntry = ({entry, diagnoses}: HealthCheckProps) => {


    let heartColor;
    
    switch (entry.healthCheckRating) {
        case 0:
            heartColor = "green";
            break;
        case 1:
            heartColor = "yellow";
            break;
        case 2:
            heartColor = "orange";
            break;
        default:
            heartColor = "red";
            break;
    }

    return (
        <div className="boxWithBorder">
            <p className="dateWithIcon">
                {entry.date} 
                <MedicalServicesIcon />
            </p>
            <span>{entry.description}</span>

            <ul>
                {entry.diagnosisCodes?.map(code => (
                    <li key={code}>{code} {diagnoses.map(c => c.code === code ? c.name : null)}</li>
                ))}
            </ul>

            <FavoriteIcon sx={{color: heartColor}}/>
            
            <p>Diagnosed by {entry.specialist}</p>
        </div>
    );
};

const OccupationalEntry = ({entry, diagnoses}: OccupationalProps ) => {

    return (
        <div className="boxWithBorder">
            <p className="dateWithIcon">
                {entry.date}
                <WorkIcon />
            </p>
            <span>{entry.description}</span>

            <ul>
                {entry.diagnosisCodes?.map(code => (
                    <li key={code}>{code} {diagnoses.map(c => c.code === code ? c.name : null)}</li>
                ))}
            </ul>

            <p>Employer: {entry.employerName}</p>
            <div>
                Sick leave: 
                {entry.sickLeave ? <span>{entry.sickLeave.startDate} - {entry.sickLeave.endDate}</span> : "None"}
            </div>

            <p>Diagnosed by {entry.specialist}</p>
        </div>
    );

};

const EntryDetails: React.FC<{ entry: Entry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
        case "HealthCheck":
            return <HealthEntry entry={entry} diagnoses={diagnoses} />;
        case "OccupationalHealthcare":
            return <OccupationalEntry entry={entry} diagnoses={diagnoses} />;
        default:
            return `Unknown entry type`;
    }
};

export default EntryDetails;