import {Diagnosis, Discharge, EntryWithoutId, Gender, HealthCheckRating, NewPatient/* , Types */, newHealthCheck, newHospital, newOccupationalHealthcare} from "../src/types";

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

const isGender = (param: string): param is Gender => {
	return Object.values(Gender).map(v => v.toString()).includes(param);
};

/* const isType = (param: string): param is Types => {
	return Object.values(Types).map(t => t.toString()).includes(param);
} */

const isRating = (param: number): param is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(param);
}

/* const parseName = (name: unknown): string => {

}

const parseDateOfBirth = (dob: unknown): string => {

}

const parseOccupation = (occupation: unknown): string => {

}

const parseSSN = (ssn: unknown): string => {

} */

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
  
const parseDate = (date: unknown): string => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

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

/* const parseEntryType = (type: unknown): Types => {
	if(!isString(type) || !isType(type)) {
		throw new Error("Type missing or incorrect")
	}

	return type
} */

const parseHealthRating = (rating: unknown): HealthCheckRating => {
	if (!rating || isNaN(Number(rating)) || !isRating(Number(rating))) {
		throw new Error("Health rating missing or incorrect") 
	}

	return Number(rating)
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
	if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
	  // we will just trust the data to be in correct form
	  return [] as Array<Diagnosis['code']>;
	}
  
	return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (object: unknown): Discharge => {
	if (!object || typeof object !== 'object' || !('criteria' in object) || 
	!("date" in object) || !isString(object.criteria) || !isString(object.date)) {
		throw new Error("Discharge information missing") 
	}

	if (!isDate(object.date)) {
		throw new Error("Incorrect discharge date")
	}

	return object as Discharge 
}

const parseSickLeave = (object: unknown): {startDate: string, endDate: string} => {
	if(!object || typeof object !== 'object' || !("startDate" in object) || !("endDate" in object) || !isString(object.startDate) || !isString(object.endDate)) {
		throw new Error("Sick leave information missing")
	}

	if(!isDate(object.startDate) || !isDate(object.endDate)) {
		throw new Error("Sick leave date is malformatted")
	}

	return object as {startDate: string, endDate: string}
}


export const toNewPatient = (object: unknown) : NewPatient => {
	if (!object || typeof object !== "object") {
		throw new Error("Incorrect or missing data");
	}

	if ("name" in object && "dateOfBirth" in object && "occupation" in object && "gender" in object && "ssn" in object) {
		const newPerson: NewPatient = {
			name: parseDetail(object.name),
			dateOfBirth: parseDate(object.dateOfBirth),
			gender: parseGender(object.gender),
			occupation: parseDetail(object.occupation),
			ssn: parseDetail(object.ssn),
			entries: []
		};

		return newPerson;
	}

	throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
	if (!object || typeof object !== "object") {
		throw new Error("Incorrect or missing data");
	}

	if ("description" in object && "specialist" in object && "date" in object && "type" in object) {	
 		switch(object.type) {
			case "HealthCheck":
				if ("healthCheckRating" in object) {
					const newEntry: newHealthCheck = {
						date: parseDate(object.date),
						description: parseDetail(object.description),
						healthCheckRating: parseHealthRating(object.healthCheckRating),
						specialist: parseDetail(object.specialist),
						type: object.type,
					}
					if ("diagnosisCodes" in object) {
						newEntry.diagnosisCodes = parseDiagnosisCodes(object)
					}
					return newEntry;
				} else {
					throw new Error ("Health check rating missing")
				};
			case "Hospital":
				if("discharge" in object) {
					const newEntry: newHospital = {
						date: parseDate(object.date),
						description: parseDetail(object.description),
						specialist: parseDetail(object.specialist),
						type: object.type,
						discharge: parseDischarge(object.discharge)
					}
					if ("diagnosisCodes" in object) {
						newEntry.diagnosisCodes = parseDiagnosisCodes(object)
					}
					return newEntry;
				} else {
					throw new Error ("Discharge information missing")
				}
			case "OccupationalHealthcare":
				if("employerName" in object) {
					const newEntry: newOccupationalHealthcare = {
						date: parseDate(object.date),
						description: parseDetail(object.description),
						specialist: parseDetail(object.specialist),
						type: object.type,
						employerName: parseDetail(object.employerName)
					}
					if ("diagnosisCodes" in object) {
						newEntry.diagnosisCodes = parseDiagnosisCodes(object)
					}
					if ("sickLeave" in object && object.sickLeave && typeof object.sickLeave === "object" ) {
						if ("startDate" in object.sickLeave && "endDate" in object.sickLeave) {
							newEntry.sickLeave = parseSickLeave(object.sickLeave)
						} else {
							throw new Error ("Date missing")
						}
					}
					return newEntry
				} else {
					throw new Error ("Occupational Healthcare information missing.")
				}
			default:
				throw new Error ("Unknown entry type");
		}
	}
	
	throw new Error("Incorrect data: some fields are missing");
}

/* export default toNewPatient; */