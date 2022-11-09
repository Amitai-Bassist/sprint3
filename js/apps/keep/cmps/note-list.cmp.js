import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteTxt from '../cmps/note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import colorsChose from './colors-chose.cmp.js'
import { notesService } from "../services/note.service.js"

export default {
    props: ['notes'],
    template: `
        <section class="note-container grid">
                <div  v-for="(note, idx) in notes">
                    <component :is="note.type"  
                        :info="note.info" v-bind:style="bcgColor(note)" :id="note.id" @deleteNote="deleteNote">
                    </component>
                </div>
                <colors-chose class="colors-for-notes" ></colors-chose>
        </section>
    `,
    data() {
        return {
            isOver: false
        }
    },
    methods: {
        showBottons(ev){
            console.log(ev);
            this.isOver = true
        },
        bcgColor(note){
            return note.style
        },
        deleteNote(notId){
            notesService.remove(noteId)
        }
    },
    computed:{
        
    },
    components: {
        noteImg,
        noteTodos,
        noteTxt,
        noteVideo,
        colorsChose
        
    }
}