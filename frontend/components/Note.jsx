import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, updateNote, reset } from "../features/notes/noteSlice";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import Router from "next/router";

function Note() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [convertedContent, setConvertedContent] = useState(null);

  const dispatchNote = () => {
    const title = formTitle === "" ? "Unititled Note" : formTitle;
    const note = convertedContent === '' ? 'Write Something...' : convertedContent;

    const noteData = {
      title,
      note,
    };

    if (notes.length !== 0 && convertedContent !== null) {
      try {
        
        const noteId = notes[notes.length - 1]._id;
        dispatch(updateNote([noteId, noteData]));
        
      } catch (error) {
        const noteId = notes._id;
        dispatch(updateNote([noteId, noteData]));
      }
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatchNote()
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [convertedContent]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.notes);

  const [formTitle, setFormTitle] = useState("");

  const onChange = (e) => {
    setFormTitle(e.target.value);
  };

  const submitForm = () => {
    dispatchNote()
    dispatch(reset())
    Router.push('/')


  }

  return (
    <div className="App grid w-[80vw] gap-y-5">
      <input
        placeholder="Untitled"
        className="text-2xl"
        name="title"
        onChange={onChange}
        value={formTitle}
      />

      <Editor
        placeholder="Write Something.."
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="border "
        editorClassName="leading-none pl-2"
      />

      <button className="bg-black text-white p-3 cursor-pointer z-20" onClick={submitForm}>Submit</button>
    </div>
  );
}

export default Note;
