import axios from "axios";
import type { Note, NewNote} from "../types/note";


axios.defaults.baseURL = "https://notehub-public.goit.study/api";

axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`;


interface FetchNotesParams {
    notes: Note[];
    totalPages: number;
}

export const fetchNotes = async (query: string, page: number): Promise<FetchNotesParams> => {
const response = await axios.get<FetchNotesParams>('/notes', {
    params: { search: query, 
        page: page},
});
return response.data;
};


export const createNote = async (newNote: NewNote) => {
const response = await axios.post<Note>('/notes', newNote);
return response.data;
};


export const deleteNote = async (noteId: string) => {
const response = await axios.delete<Note>(`/notes/${noteId}`);
return response.data;
}
