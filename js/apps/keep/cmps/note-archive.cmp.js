import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteTxt from '../cmps/note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'

export default {
    props:['archive'],
    template:`
    <section>
        <h1>Reminder notes</h1>
                <div class="note-div"  v-for="(note, idx) in archive">
                    <component :is="note.type"  
                        :info="note.info" v-bind:style="bcgColor(note)" :id="note.id" >
                    </component>
                </div>
    </section>
    `,
    data(){ return{
        
    }
    },
    created(){
        console.log(this.reminder);
    },
    methods: {
        bcgColor(note){
            return note.style
        },
    },
    components: {
        noteImg,
        noteTodos,
        noteTxt,
        noteVideo,
    }
}