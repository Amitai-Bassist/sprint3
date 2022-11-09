import noteButtens from '../cmps/note-buttens.cmp.js'

export default {
    template: `
    <section @mouseover="isOver = true" @mouseleave="isOver = false" class="note note-todos">
        <h1>{{info.label}}</h1>
        <ul v-for="(todo, idx) in info.todos">
            <li>{{todo.txt}}</li>
        </ul>
        <note-buttens v-if="isOver" ></note-buttens>
    </section>
    `,
    data() {
        return{
            isOver: false  
        }
    },
    name: 'note-todos',
    props: ['info'],
    components: {
        noteButtens
    }
}