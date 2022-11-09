import { notesService } from "../services/note.service.js"
// import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service'

export default {
    template:`
    <section class="note-app">
        <h1>note-app</h1>
        <pre>{{notes}}</pre>

    </section>
    `,
    data() {
        return {
            notes: []
        }
    },
    created(){
        notesService.query()
            .then(notes => {
                this.notes = notes
            })
    },
}