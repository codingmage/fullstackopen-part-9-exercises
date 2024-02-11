import patients from "../../data/patients";

import { EditedPatient, Patient, NewPatient } from "../types";
import { v4 as uuid } from "uuid";

const getPatientsWithoutSSN = (): EditedPatient[] => {
	return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	})
	);
};

const addPatient = (patientData: NewPatient): Patient => {
	const newPatient = {
		id: uuid(),
		...patientData
	};

	patients.push(newPatient);
	return newPatient;
};

export default {getPatientsWithoutSSN, addPatient};