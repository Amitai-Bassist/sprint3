import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteTxt from '../cmps/note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteButtens from '../cmps/note-buttens.cmp.js'

export default {
    props: ['notes'],
    template: `
        <section class="note-container grid">
                <div @mouseover="isOver = true" @mouseleave="osOver = false" class="note"  v-for="(note, idx) in notes">
                    <component :is="note.type"  
                        :info="note.info" >
                    </component>
                    <note-buttens v-if="isOver" ></note-buttens>
                </div>
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
        }
    },
    components: {
        noteImg,
        noteTodos,
        noteTxt,
        noteVideo,
        noteButtens,
    }
}