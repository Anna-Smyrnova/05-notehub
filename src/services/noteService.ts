import axios from "axios";
import type { Note, NewNote} from "../types/note";


axios.defaults.baseURL = "https://notehub-public.goit.study/api";

axios.defaults.headers.common = {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
}

interface FetchNotesParams {
    notes: Note[];
    totalPages: number;
}

export const fetchNotes = async (query: string, defaultPage: number): Promise<FetchNotesParams> => {
const response = await axios.get<FetchNotesParams>('/notes', {
    params: { search: query, 
        page: defaultPage},
});
return response.data;
};


export const createNote = async (newNote: NewNote) => {
const response = await axios.post<Note>('/notes', newNote);
return response.data;
};


export const deleteNote = async (noteId: number) => {
const response = await axios.delete<Note>(`/notes/${noteId}`);
return response.data;
}
