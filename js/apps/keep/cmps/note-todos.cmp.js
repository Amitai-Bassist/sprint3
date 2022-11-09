export default {
    template: `
    <section class="note-todos">
        <h1>{{info.label}}</h1>
        <ul v-for="(todo, idx) in info.todos">
            <li>{{todo.txt}}</li>
        </ul>
    </section>
    `,
    name: 'note-todos',
    props: ['info'],
}