import { notesService } from '../services/note.service.js'

import noteFilter from '../cmps/note-filter.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'

export default {
    template:`
    <section class="note-app">
            <h1>note-app</h1>
            <note-filter></note-filter>
            <note-add></note-add>
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
    },
    components:{
        noteFilter,
        noteAdd,
        noteList
    },
}