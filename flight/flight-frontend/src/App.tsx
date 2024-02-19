import React, { useEffect, useState } from "react";
import "./App.css";
import { DiaryEntry, Visibility, Weather } from "./types";
import entryService from "./services/entries";
import axios from "axios";


function App() {
	const [entries, setEntries] = useState<DiaryEntry[]>();
	const [date, setDate] = useState<string>("");
	const [visibility, setVisibility] = useState<string>("");
	const [weather, setWeather] = useState<string>("");
	const [comment, setComment] = useState<string>("");
	const [error, setError] = useState<string>("");

	useEffect(() => {

		const fetchEntries = async () => {
			const flightEntries = await entryService.getAll();
			setEntries(flightEntries);
		};

		void fetchEntries();
	}, []);

	const createEntry = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		try {
			const addedEntry = await entryService.addEntry({date, comment,visibility: visibility as Visibility, weather: weather as Weather});
			// setEntries([...entries!, addedEntry]);
			const withEntry = entries?.concat(addedEntry);
			setEntries(withEntry);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(error.response?.data as string);
				setTimeout(() => {
					setError("");
				}, 5000);
			} else {
				setError("An unknown error has occurred.");
				setTimeout(() => {
					setError("");
				}, 5000);
			}
		}
	};

	return (
		<div>
			<div>
				<h3>Add new entries: </h3>
				{ error ? <span>{error}</span> : "" }
				<form onSubmit={createEntry}>
					<div> <label>date</label> <input value={date} onChange={(e) => setDate(e.target.value)} /> </div>
					<div> <label>visibility</label> <input value={visibility} onChange={(e) => setVisibility(e.target.value)}/> </div>
					<div> <label>weather </label> <input value={weather} onChange={(e) => setWeather(e.target.value)}/> </div>
					<div> <label>comment</label> <input value={comment} onChange={(e) => setComment(e.target.value)}/> </div>
					<button type='submit'>add</button>
				</form>
			</div>

			<div>
				<h3>Diary Entries</h3>
				{entries ? entries.map((entry) => (
					<div key={entry.id}>
						<h4>{entry.date}</h4>

						<div>visibility: {entry.visibility}</div>
						<div>weather: {entry.weather}</div>
					</div>
				)) : <div>Loading...</div>}
			</div>
		</div>

	);
}

export default App;
