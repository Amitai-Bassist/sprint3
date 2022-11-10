import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteTxt from '../cmps/note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import { notesService } from "../services/note.service.js"
import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    props: ['notesPinned','notesOther'],
    template: `
        
        <h1>PINNED</h1>
        <section class="note-container ">
                <div class="note-div"  v-for="(note, idx) in notesPinned">
                    <component :is="note.type"  
                        :info="note.info" v-bind:style="bcgColor(note)" :id="note.id" >
                    </component>
                </div>
        </section>
        <h1>OTHERS</h1>
        <section class="note-container ">
                <div class="note-div"  v-for="(note, idx) in notesOther">
                    <component :is="note.type"  
                        :info="note.info" v-bind:style="bcgColor(note)" :id="note.id" >
                    </component>
                </div>
        </section>
    `,
    data() {
        return {
            isOver: false,
            userChoseColor:false
        }
    },
    created(){
        
    },
    methods: {
        showBottons(ev){
            console.log(ev);
            this.isOver = true
        },
        bcgColor(note){
            return note.style
        },
        
    },
    computed:{
        
    },
    components: {
        noteImg,
        noteTodos,
        noteTxt,
        noteVideo,
    }
}