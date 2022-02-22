import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { createNote, updateNote, reset } from "../features/notes/noteSlice";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
// import Note from "../components/Note";
const NoSSREditor = dynamic(() => import("../components/Note"), {
  ssr: false,
});

function AddNote() {
  const dispatch = useDispatch();
  
  const newNoteData = {
    title: "Unititled Note",
    note: "Write Something...",
  };
  useEffect(() => {
    dispatch(createNote(newNoteData));
  }, []);


  return (
    <div className="flex justify-center">
      <NoSSREditor />
    </div>
  );

}

export default AddNote;
