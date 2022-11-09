import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


export const notesService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getNextNoteId
}

const NOTES_KEY = 'notesDB'
_createNotes()

function getFirstNotes(){

    const notes = [
         { 
            id: "n101", 
            type: "note-txt", 
            isPinned: true, 
            info: { 
                txt: "Fullstack Me Baby!" 
            } 
        }, 
        { 
            id: "n102", 
            type: "note-img", 
            info: { 
                url: "http://coding-academy.org/books-photos/20.jpg", 
                title: "Bobi and Me" 
            }, 
            style: { 
                backgroundColor: "#00d" 
            } 
        }, 
        { 
            id: "n103", 
            type: "note-todos", 
            info: { 
                label: "Get my stuff together", 
                todos: [ 
                    { txt: "Driving liscence", doneAt: null }, 
                    { txt: "Coding power", doneAt: 187111111 } 
                ] 
            } 
        } 
    ]
    return notes
}


function query() {
    return storageService.query(NOTES_KEY)
}

function get(noteId){
    return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
    if(note.id){
        return storageService.put(NOTES_KEY, note)
    } else {
        return storageService.post(NOTES_KEY, note)
    }
}

function getEmptyNote(vendor='', maxSpeed = 0) {
    return { id: '', vendor, maxSpeed}
}


function getNextNoteId(noteId) {
    return storageService.query(NOTES_KEY)
        .then(notes =>{
            var idx  = notes.findIndex(note => note.id === noteId)
            if (idx === notes.length-1) idx = -1
            return notes[idx+1].id
        })
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = getFirstNotes()
        utilService.saveToStorage(NOTES_KEY, notes)
    }
    return notes
}

function _createNote(vendor, maxSpeed = 250) {
    const note = getEmptyNote(vendor, maxSpeed)
    note.id = utilService.makeId() 
    return note
}


