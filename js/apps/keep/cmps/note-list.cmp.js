import noteImg from '../cmps/note-img.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteTxt from '../cmps/note-txt.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'

export default {
    props: ['notes'],
    template: `
        <section class="note-container grid">
                <div class="note"  v-for="(note, idx) in notes">
                    <component :is="note.type"  
                        :info="note.info" >
                    </component>
                </div>
        </section>
    `,
    components: {
        noteImg,
        noteTodos,
        noteTxt,
        noteVideo,
    }
}