import { notesService } from '../services/note.service.js'
// import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service'

import noteFilter from '../cmps/note-filter.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'


export default {
    template:`
    <main class="note-app-main grid">
        <aside class="grid">
            <!-- <router-link to="/notes/show-nots">Notes</router-link> -->
            <button class="aside-btn">Notes</button>
            <button class="aside-btn">Reminders</button>
            <button class="aside-btn">Archive</button>
            <button class="aside-btn">Bin</button>
        </aside>
        <router-view />
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