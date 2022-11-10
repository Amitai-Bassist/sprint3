import { notesService } from '../services/note.service.js'
import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import noteFilter from '../cmps/note-filter.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'

export default {
    template:`
    <section class="note-app">
            <note-filter></note-filter>
            <note-add @saved="addNote"></note-add>
            <note-list :notesPinned="notesPinned" :notesOther="notesOther"></note-list>
    
        </section>
    `,
    data() {
        return {
            allNotes: [],
            notesPinned: [],
            notesOther: [],
            filterBy: ''
        }
    },
    created(){
        
        notesService.query()
            .then(notes => {
                // const regex = new RegExp(this.filterBy.txt,'i')
                // this.books.filter(book => regex.test(book.title) && book.listPrice.amount >= this.filterBy.fromPrice && book.listPrice.amount <= this.filterBy.toPrice )
        
                this.allNotes = notes
                this.notesPinned = notes.filter(note => note.isPinned)
                this.notesOther = notes.filter(note => !note.isPinned)
            })
        
        eventBus.on('deleteNote', this.deleteNote)
        eventBus.on('pin-note', this.pinNote)
        eventBus.on('filter-notes', this.filterNotes)
    },
    methods: {
        addNote(){
            notesService.query()
            .then(notes => {
                this.allNotes = notes
                this.notesPinned = notes.filter(note => note.isPinned)
                this.notesOther = notes.filter(note => !note.isPinned)
            })
        },
        deleteNote(noteId){
            notesService.remove(noteId)
                .then(() => {
                    const idx1 = this.notesPinned.findIndex(note => note.id === noteId)
                    this.notesPinned.splice(idx1, 1)
                    const idx2 = this.notesOther.findIndex(note => note.id === noteId)
                    this.notesOther.splice(idx2, 1)
                    
                    const msg = {
                        txt: `Note ${noteId} deleted...`,
                        type: 'success',
                    }
                    eventBus.emit('show-msg', msg)
                })
            notesService.query()
                .then(notes => {this.allNotes = notes})
        },
        pinNote(noteId){
            let noteToPin 
            notesService.get(noteId)
            .then(note => {
                noteToPin = note
                console.log(noteToPin);
                noteToPin.isPinned = !noteToPin.isPinned
                if (noteToPin.isPinned){
                    this.notesPinned.unshift(noteToPin)
                    const idx2 = this.notesOther.findIndex(note => note.id === noteId)
                    this.notesOther.splice(idx2, 1)
                }else{
                    this.notesOther.unshift(noteToPin)
                    const idx1 = this.notesPinned.findIndex(note => note.id === noteId)
                    this.notesPinned.splice(idx1, 1)
                }
                notesService.save(noteToPin)
                notesService.query()
                    .then(notes => {this.allNotes = notes})
            })
        },
        filterNotes(filter){
            console.log(filter);
            this.filterBy = filter
        }
    },
    components:{
        noteFilter,
        noteAdd,
        noteList
    },
}