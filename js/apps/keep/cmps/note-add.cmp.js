import { notesService } from "../services/note.service.js"
import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import noteButtens from '../cmps/note-buttens.cmp.js'

export default {
    template: `
    <section class="add-note-section">
        <form @submit.prevent="save">
            <input v-if="isOver" type="text" v-model="noteToEdit.title" placeholder="Title"/>
            <input @focus="isOver=true" v-model="noteToEdit.info.txt" type="text" placeholder="add"/>
            <button>save</button>
        </form>
        <button><i class="fa fa-comment-o fa-2x" aria-hidden="true"></i></button>
        <button><i class="fa fa-check-square-o fa-2x" aria-hidden="true"></i></button>
        <button><i class="fa fa-picture-o fa-2x" aria-hidden="true"></i></button>
        <button><i class="fa fa-youtube fa-2x" aria-hidden="true"></i></button>
        <note-buttens v-if="isOver" ></note-buttens>
    </section>
    `,
    data() {
        return {
            isOver:false,
            noteToEdit: notesService.getEmptyNote()      
        }
    },
    created(){
        const noteId = this.$route.params.id
        if(noteId){
            this.noteToEdit = notesService.get(noteId)
                .then(note => this.noteToEdit = note)
        } 
    },
    methods: {
        save(){
            notesService.save(this.noteToEdit)
                .then(note => {
                    showSuccessMsg(`note saved (note id: ${note.id})`)
                    this.$router.push('/notes/show-nots')
                    this.$emit('saved', this.noteToEdit)
                })
                .catch(err => {
                    console.log('OOps:', err)
                    showErrorMsg(`Cannot save note`)
                })
        }
    },
    name: 'note-add',
    components: {
        noteButtens
    }
    
}