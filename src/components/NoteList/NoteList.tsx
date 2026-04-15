import css from "./NoteList.module.css"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Note } from "../../types/note"
import { deleteNote } from "../../services/noteService"


interface NoteListProps {
    notes: Note[];
}

export default function NoteList ({ notes }: NoteListProps) {
const queryClient = useQueryClient();

const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["notes"]})
    },
});
    return (
        <ul className={css.list}>
	{/* Набір елементів списку нотаток */}
    {notes.map((task) => ( 
        <li key={task.id} className={css.listItem}>
    <h2 className={css.title}>{task.title}</h2>
    <p className={css.content}>{task.content}</p>
    <div className={css.footer}>
      <span className={css.tag}>{task.tag}</span>
      <button type="button" className={css.button} onClick={()=>deleteMutation.mutate(task.id)}>
        Delete</button>
    </div>
  </li>
))}
 </ul>
    )
}