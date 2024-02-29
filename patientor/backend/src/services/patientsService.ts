import patients from "../../data/patients";

import { EditedPatient, Patient, NewPatient, EntryWithoutId } from "../types";
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

const getSpecificPatient = (id: string): Patient | null => {
	const thisPatient = patients.find((p) => p.id === id)

	if (thisPatient) {
		return thisPatient
	} else {
		return null
	}

}

const addPatient = (patientData: NewPatient): Patient => {
	const newPatient = {
		id: uuid(),
		...patientData
	};

	patients.push(newPatient);
	return newPatient;
};

const addEntryToPatient = (id: string, entryData: EntryWithoutId): Entry => {
	
}

export default {getPatientsWithoutSSN, addPatient, getSpecificPatient};