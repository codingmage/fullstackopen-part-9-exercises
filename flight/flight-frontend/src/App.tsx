import React, { useEffect, useState } from "react";
import "./App.css";
import { DiaryEntry, Visibility, Weather } from "./types";
import entryService from "./services/entries";
import axios from "axios";


function App() {
	const [entries, setEntries] = useState<DiaryEntry[]>();
	const [date, setDate] = useState<string>("");
	const [visibility, setVisibility] = useState<keyof typeof Visibility>();
	const [weather, setWeather] = useState<keyof typeof Weather>();
	const [comment, setComment] = useState<string>("");
	const [error, setError] = useState<string>("");

	useEffect(() => {

		const fetchEntries = async () => {
			const flightEntries = await entryService.getAll();
			setEntries(flightEntries);
		};

		void fetchEntries();

	}, []);

	const visibilityKeys = Object.keys(Visibility);

	const weatherKeys = Object.keys(Weather);

	const createEntry = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		if (!date || !comment || !visibility || !weather ) {
			setError("Some fields are missing.");
			setTimeout(() => {
				setError("");
			}, 3000);
		} else {
			try {
				const addedEntry = await entryService.addEntry({date, comment, visibility: visibility as Visibility, weather: weather as Weather});
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
		}
	};

	return (
		<div>
			<div>
				<h3>Add new entries: </h3>
				{ error ? <span className="errorMessage">{error}</span> : "" }
				<form onSubmit={createEntry}>
					<div> <label>date</label> <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /> </div>
					<div className="options"> 
						<label>visibility</label> 
						{ visibilityKeys.map((visibility) => (
							<div key={visibility} className="options">
								<label>{visibility}</label>
								<input type="radio" name="visibility" aria-label={visibility} id={visibility} value={visibility} onChange={(e) => setVisibility(e.target.value.toLowerCase() as keyof typeof Visibility)} />
							</div>
						))}
					</div>
					<div className="options"> 
						<label>weather </label> 
						{ weatherKeys.map((weather) => (
							<div key={weather} className="options">
								<label>{weather}</label>
								<input type="radio" name="weather" aria-label={weather} id={weather} value={weather} onChange={(e) => setWeather(e.target.value.toLowerCase() as keyof typeof Weather)} />
							</div>
						))}
					</div>
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
