// import { useState } from 'react'
import css from'./App.module.css'
import NoteForm from '../NoteForm/NoteForm';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import { fetchNotes} from '../../services/noteService';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import { useDebouncedCallback } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';




export default function App() {
const [isModalOpen, setIsModalOpen] = useState(false);
const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);

const [searchQuery, setSearchQuery] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const handleSearch = useDebouncedCallback(setSearchQuery, 300)


const updateCurrentPage = (page: number) => {
  setCurrentPage(page)
}


const {data, isSuccess, isLoading, isError} = useQuery (
   {
      queryKey: ['notes', searchQuery, currentPage],
      queryFn: () => fetchNotes (searchQuery, currentPage),
      placeholderData: keepPreviousData,
   }
);

const totalPages = data?.totalPages ? data.totalPages : 0;

  return (
   
    <div className={css.app}>

	<header className={css.toolbar}>
		<SearchBox searchQuery={searchQuery} onSearch={handleSearch}/>
   {isSuccess && totalPages > 1 && 
   (<Pagination 
    totalPages={totalPages}
   currentPage={currentPage}
   setCurrentPage={updateCurrentPage}/>)} 
		
		{<button onClick={openModal} className={css.button}>Create note +</button>}
    
  </header>
{isSuccess && data?.notes?.length > 0 && <NoteList notes={data.notes}/>}
{isLoading && <Loader />}
{
  isModalOpen && (
    <Modal onClose={closeModal}>
      <NoteForm onClose={closeModal}/>
    </Modal>
  )
}
{isError && <ErrorMessage message = "There was an error, please try again..."/>}
{isSuccess && data?.notes?.length === 0 && (
  <ErrorMessage message = "Notes is not found"/>
)}
</div>
  );
}


