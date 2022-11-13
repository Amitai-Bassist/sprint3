import { notesService } from '../services/note.service.js'
// import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service'

import noteFilter from '../cmps/note-filter.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteList from '../cmps/note-list.cmp.js'


export default {
    template:`
    <main class="note-app-main grid">
        <aside class="grid">
            <button class="aside-btn" v-bind:class="{'aside-active': asideChose==='all'}"  @click="asideChose='all'">Notes</button>
            <button class="aside-btn" v-bind:class="{'aside-active': asideChose==='remined'}" @click="asideChose='remined'">Reminders </button>
            <button class="aside-btn" v-bind:class="{'aside-active': asideChose==='archive'}" @click="asideChose='archive'">Archive</button>
            <button class="aside-btn" v-bind:class="{'aside-active': asideChose==='bin'}" @click="asideChose='bin'">Bin</button>
        </aside>
        <router-view :asideChose="asideChose"/>
    </main>
    `,
    name: 'note-index',
    data() {
        return {
            notes: [],
            asideChose: 'all',
            notes:true
            
        }
    },
    created(){
        notesService.query()
            .then(notes => {
                this.notes = notes
            })
    },
    methods:{
        
    },
    components:{
        noteFilter,
        noteAdd,
        noteList
    },
    
}