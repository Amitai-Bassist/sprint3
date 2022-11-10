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
                this.allNotes = notes
                this.notesPinned = notes.filter(note => note.isPinned)
                this.notesOther = notes.filter(note => !note.isPinned)
            })
        
        eventBus.on('deleteNote', this.deleteNote)
        eventBus.on('pin-note', this.pinNote)
        eventBus.on('filter-notes', this.filterNotes)
        eventBus.on('change-note-color', this.changeNoteColor)
    },
    methods: {
        addNote(){
            notesService.query()
            .then(notes => {
                const regex = new RegExp(this.filterBy,'i')
                let fNotes = notes.filter(note => regex.test(note.info.title))
       
                this.allNotes = fNotes
                this.notesPinned = fNotes.filter(note => note.isPinned)
                this.notesOther = fNotes.filter(note => !note.isPinned)

            })
        },
        deleteNote(noteId){
            notesService.remove(noteId)
                .then(() => {
                    notesService.query()
                    .then(notes => {
                const regex = new RegExp(this.filterBy,'i')
                let fNotes = notes.filter(note => regex.test(note.info.title))
       
                this.allNotes = fNotes
                this.notesPinned = fNotes.filter(note => note.isPinned)
                this.notesOther = fNotes.filter(note => !note.isPinned)
                    
                    const msg = {
                        txt: `Note ${noteId} deleted...`,
                        type: 'success',
                    }
                    eventBus.emit('show-msg', msg)
                })})
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
            const regex = new RegExp(this.filterBy,'i')
            this.notesPinned = this.notesPinned.filter(note => regex.test(note.info.title ||
                                                                          note.info.label ||
                                                                          note.info.txt))
            this.notesOther = this.notesOther.filter(note => regex.test(note.info.title ||
                                                                        note.info.label ||
                                                                        note.info.txt))
        },
        changeNoteColor(inf){
            console.log(inf);
            notesService.get(inf.id)
            .then(note => {
                note.style = {backgroundColor: inf.color}
                console.log(note);
                notesService.save(note)
                .then(
                notesService.query()
                    .then(notes => {
                        console.log(notes);
                        const regex = new RegExp(this.filterBy,'i')
                        let fNotes = notes.filter(note => regex.test(note.info.title))
       
                        this.allNotes = fNotes
                        this.notesPinned = fNotes.filter(note => note.isPinned)
                        this.notesOther = fNotes.filter(note => !note.isPinned)
                    }))
            }) 
        }
    },
    components:{
        noteFilter,
        noteAdd,
        noteList
    },
}