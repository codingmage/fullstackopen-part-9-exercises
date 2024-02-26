import { useState, useEffect } from "react";
import axios from "axios";
import { /* BrowserRouter as Router, */ Route, Link, Routes, useMatch } from "react-router-dom";
import "./index.css";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import diagnosesService from "./services/diagnoses";
import SinglePatientPage from "./components/SinglePatientPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagonoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState(false);

  const match = useMatch("/patients/:id");

/*   const patient = match 
    ? patients.find(p => p.id === match.params.id)
    : null; */
  
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    void fetchPatientList();

    const fetchDiagnoses = async () => {
      const diagnosesArray = await diagnosesService.getDiagnosis();
      setDiagonoses(diagnosesArray);
    };

    fetchDiagnoses();
  }, []);

  useEffect(() => {
    if (match) {
      const fetchPatient = async () => {
        setLoading(true);
        try {
          const patient = await patientService.getPatient(match.params.id!);
          setPatient(patient);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };

      fetchPatient();
    }
  }, [match]);
  
  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} onClick={() => setPatient(null)} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<SinglePatientPage patient={patient} diagnoses={diagnoses} loading={loading}/>} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
