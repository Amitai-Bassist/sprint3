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
            <note-list :notes="notes"></note-list>
    
        </section>
    `,
    data() {
        return {
            notes: []
        }
    },
    created(){
        notesService.query()
            .then(notes => {
                this.notes = notes
            })
        eventBus.on('deleteNote', this.deleteNote)
    },
    methods: {
        addNote(){
            notesService.query()
            .then(notes => {
                this.notes = notes
            })
        },
        deleteNote(noteId){
            notesService.remove(noteId)
                .then(() => {
                    const idx = this.notes.findIndex(note => note.id === noteId)
                    this.notes.splice(idx, 1)
                    
                    const msg = {
                        txt: `Note ${noteId} deleted...`,
                        type: 'success',
                    }
                    eventBus.emit('show-msg', msg)
                })
        }
    },
    components:{
        noteFilter,
        noteAdd,
        noteList
    },
}