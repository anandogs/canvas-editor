import { useEffect } from "react"
import Router from "next/router"
import AddNote from "./addNote"
import { useSelector,useDispatch } from "react-redux"
import { createNote, getNotes, reset } from '../features/notes/noteSlice'
import {FaPlus} from 'react-icons/fa'
import DOMPurify from 'dompurify';

export default function Home() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { notes, isError, isSuccess, message } = useSelector((state) => state.notes)

  const onlyBody = []
  for (let i =0; i < notes.length; i++){
    onlyBody.push(notes[i].note)
  }

  const createNewNote = () => {
    Router.push('./addNote')
  }


  const createMarkup = (html) => {
    const htmlVal = html.note
    return  {
      __html: DOMPurify.sanitize(htmlVal)
    }
  }

  useEffect(() => {
    if(isError) {
      console.log(message)
    }
    if(!user) {
      Router.push('/loginUser')
    }
    dispatch(getNotes())
    return () => {
      dispatch(reset())
    }
  },[user, isError, message, dispatch])
  
  return (
<div className="grid justify-items-center gap-y-4">
{user? (<h1 className="text-3xl">{user.name}'s notes</h1>):(<h1 className="text-3xl">Your notes</h1>)}
  <button onClick={createNewNote} className='bg-black text-white flex w-36 justify-around items-center pt-2 pb-2'><FaPlus/>New Note</button>
  {notes.length == 0 ? (<div>You have no notes</div>) : 
  (<ul>{onlyBody.map(note => <li className="list-disc" dangerouslySetInnerHTML={createMarkup({note})}></li>)}</ul>)}

</div>
  )
}
