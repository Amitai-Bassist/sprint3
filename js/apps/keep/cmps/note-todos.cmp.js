export default {
    template: `
    <section class="note-todos">
        <ul>
            <li>{{info.label}}</li>
        </ul>
    </section>
    `,
    name: 'note-todos',
    props: ['info'],
}