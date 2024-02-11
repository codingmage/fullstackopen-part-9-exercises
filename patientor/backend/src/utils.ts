import {Gender, NewPatient} from "../src/types";

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if(!isString(gender) || !isGender(gender)) {
		throw new Error("Gender missing or unavailable");
	}
    
	return gender;
};

const toNewPatient = (object: unknown) : NewPatient => {

};

export default toNewPatient;