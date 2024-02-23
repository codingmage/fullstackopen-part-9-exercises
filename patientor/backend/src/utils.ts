import {Gender, NewPatient} from "../src/types";

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender).map(v => v.toString()).includes(param);
};

/* const parseName = (name: unknown): string => {

}

const parseDateOfBirth = (dob: unknown): string => {

}

const parseOccupation = (occupation: unknown): string => {

}

const parseSSN = (ssn: unknown): string => {

} */

const parseDetail = (detail: unknown): string => {
	if (!detail || !isString(detail)) {
		throw new Error("Invalid data or missing field.");
	}

	return detail;
};

const parseGender = (gender: unknown): Gender => {
	if(!isString(gender) || !isGender(gender)) {
		throw new Error("Gender missing or unavailable");
	}
    
	return gender;
};

const toNewPatient = (object: unknown) : NewPatient => {
	if (!object || typeof object !== "object") {
		throw new Error("Incorrect or missing data");
	}

	if ("name" in object && "dateOfBirth" in object && "occupation" in object && "gender" in object && "ssn" in object) {
		const newPerson: NewPatient = {
			name: parseDetail(object.name),
			dateOfBirth: parseDetail(object.dateOfBirth),
			gender: parseGender(object.gender),
			occupation: parseDetail(object.occupation),
			ssn: parseDetail(object.ssn),
			entries: []
		};

		return newPerson;
	}

	throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatient;