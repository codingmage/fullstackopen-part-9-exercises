import patients from "../../data/patients";

import { EditedPatient } from "../types";

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

export default {getPatientsWithoutSSN};