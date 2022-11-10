import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


export const notesService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getNextNoteId,
    getGoogleNotesColors
}

const NOTES_KEY = 'notesDB'
_createNotes()

function getFirstNotes(){

    const notes = [
        { 
            id: "n103", 
            type: "note-todos", 
            isPinned: false,
            info: { 
                label: "Get my stuff together", 
                todos: [ 
                    { txt: "Driving liscence", doneAt: null }, 
                    { txt: "Coding power", doneAt: 187111111 } 
                ] 
            },
            style: { 
                backgroundColor: "rgb(242 139 130)" 
            } 
        }, 
        { 
            id: "n101", 
            type: "note-txt", 
            isPinned: true, 
            info: { 
                txt: "Fullstack Me Baby!" 
            },
            style: { 
                backgroundColor: "rgb(167 255 235)" 
            }
        }, 
        { 
            id: "n102", 
            type: "note-img", 
            isPinned: false,
            info: { 
                url: "http://coding-academy.org/books-photos/14.jpg", 
                title: "muki and Me" 
            }, 
            style: { 
                backgroundColor: "rgb(255 255 255)" 
            } 
        }, 
        { 
            id: "n104", 
            type: "note-todos", 
            isPinned: false,
            info: { 
                label: "places to go", 
                todos: [ 
                    { txt: "paris", doneAt: null }, 
                    { txt: "london", doneAt: 187111111 } 
                ] 
            },
            style: { 
                backgroundColor: "rgb(255 244 117)" 
            }
        },
        { 
            id: "n105", 
            type: "note-img", 
            isPinned: false,
            info: { 
                url: "http://coding-academy.org/books-photos/20.jpg", 
                title: "Bobi and Me" 
            }, 
            style: { 
                backgroundColor: "rgb(255 244 117)" 
            } 
        },
        { 
            id: "n106", 
            type: "note-txt", 
            isPinned: false, 
            info: { 
                txt: "i wish i was a full stack" 
            },
            style: { 
                backgroundColor: "rgb(230 201 168)" 
            }
        }, 
    ]
    return notes
}

function getGoogleNotesColors(){
    console.log('colors');
    return ['rgb(242 139 130)','rgb(251 188 4)','rgb(255 244 117)',
    'rgb(204 255 144)','rgb(167 255 235)','rgb(203 240 248)','rgb(174 203 250)',
    'rgb(215 174 251)','rgb(253 207 232)','rgb(230 201 168)','rgb(232 234 237)','rgb(255 255 255)']
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

function getEmptyNote(type='note-txt', info = '',style='white') {
    return { id: '', type, info: {},style}
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

// function _createNote(vendor, maxSpeed = 250) {
//     const note = getEmptyNote(vendor, maxSpeed)
//     note.id = utilService.makeId() 
//     return note
// }


