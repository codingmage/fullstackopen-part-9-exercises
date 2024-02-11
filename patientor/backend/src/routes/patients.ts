import express from "express";
import patientsService from "../services/patientsService";
import toNewPatient from "../utils";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
	res.send(patientsService.getPatientsWithoutSSN());
});

patientRouter.post("/", (req, res) => {

	/* 	const {name, dateOfBirth, gender, occupation, ssn} = req.body;

	const addedPatient = patientsService.addPatient({
		name,
		dateOfBirth,
		gender,
		occupation,
		ssn
	}); */
	try {
		const newPatient = toNewPatient(req.body);

		const addedPatient = patientsService.addPatient(newPatient);

		res.json(addedPatient);
		
	} catch (error: unknown) {
		let errorMessage = "Error: ";
		if(error instanceof Error) {
			errorMessage += error.message;
		}
		res.status(400).send(errorMessage);
	}
	
});

export default patientRouter;