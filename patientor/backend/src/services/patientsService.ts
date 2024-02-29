import patients from "../../data/patients";

import { EditedPatient, Patient, NewPatient, EntryWithoutId, Entry } from "../types";
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
	const patient = patients.find(p => p.id = id)

	if (patient) {

		const newEntry = {
			id: uuid(),
			...entryData
		}
		patient.entries.push(newEntry)
		return newEntry
	}

	throw new Error ("Patient not found.")
}

export default {getPatientsWithoutSSN, addPatient, getSpecificPatient, addEntryToPatient};