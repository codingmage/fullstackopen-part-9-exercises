import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api";

const getAll = async () => {
	const { data } = await axios.get<DiaryEntry[]>(`${baseUrl}/diaries`);

	return data;
};

const addEntry = async (entry: NewDiaryEntry) => {
	const newEntry = await axios.post<DiaryEntry>(`${baseUrl}/diaries`, entry);

	return newEntry.data;
};

export default { getAll, addEntry };