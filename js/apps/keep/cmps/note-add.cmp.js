import noteButtens from '../cmps/note-buttens.cmp.js'

export default {
    template: `
    <section class="add-note-section">
        <input @focus="isOver=true" type="text" placeholder="add"/>
        <button><i class="fa fa-check-square-o fa-2x" aria-hidden="true"></i></button>
        <button><i class="fa fa-picture-o fa-2x" aria-hidden="true"></i></button>
        <button><i class="fa fa-youtube fa-2x" aria-hidden="true"></i></button>
        <note-buttens v-if="isOver" ></note-buttens>
    </section>
    `,
    data() {
        return {
            isOver:false
        }
    },
    name: 'note-add',
    components: {
        noteButtens
    }
    
}