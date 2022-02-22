import axios from 'axios'

const API_URL = '/api/notes/'

// Create new note

const createNote = async (noteData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, noteData, config)
    return response.data
}

// update note

const updateNote = async (updateId, noteData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + updateId, noteData, config)
    return response.data
}

// Get user notes

const getNotes = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const noteService = {
    createNote,
    getNotes,
    updateNote
}

export default noteService