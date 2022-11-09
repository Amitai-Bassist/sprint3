import { notesService } from '../services/note.service.js'
// import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service'

import noteFilter from '../cmps/note-filter.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'


export default {
    template:`
    <main class="note-app-main grid">
        <aside>
            <div>Notes</div>
            <div>Reminders</div>
            <div>Archive</div>
            <div>Bin</div>
        </aside>
        <router-view />
        <section class="note-app">
            <h1>note-app</h1>
            <note-filter></note-filter>
            <note-add></note-add>
            <note-list :notes="notes"></note-list>
    
        </section>
    </main>
    `,
    name: 'note-index',
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