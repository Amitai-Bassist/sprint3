import { notesService } from "../services/note.service.js"
import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

import noteButtens from '../cmps/note-buttens.cmp.js'

export default {
    template: `
    <section  class="add-note-section">
        <form @submit.prevent="save">
            <input v-if="isOver" type="text" v-model="noteToEdit.title" placeholder="Title"/>
            <input @focus="isOver=true" v-model="noteToEdit.info.txt" type="text" placeholder="Take a note..."/>
        </form>
        <div>
            <button @click="isActive= 'txt'" class="add-note-btn" :class="active('txt')"><i class="fa fa-comment-o fa-2x" aria-hidden="true"></i></button>
            <button @click="isActive= 'todo'" class="add-note-btn" :class="active('todo')"><i class="fa fa-check-square-o fa-2x" aria-hidden="true"></i></button>
            <button @click="isActive= 'img'" class="add-note-btn" :class="active('img')"><i class="fa fa-picture-o fa-2x" aria-hidden="true"></i></button>
            <button @click="isActive= 'video'" class="add-note-btn" :class="active('video')"><i class="fa fa-youtube fa-2x" aria-hidden="true"></i></button>
        </div>
        <div v-if="isOver" class="flex">
                <button class="note-btn" @click=""><i class="fa fa-ellipsis-v fa-2x" aria-hidden="true"></i></button>
                <button class="note-btn" @click=""><i class="fa fa-archive fa-2x" aria-hidden="true"></i></button>
                <button class="note-btn" @click=""><i class="fa fa-picture-o fa-2x" aria-hidden="true"></i></button>
                <button class="note-btn" @click="showColors = true"><i class="fa fa-tachometer fa-2x" aria-hidden="true"></i></button>
                <colors-chose v-if="showColors" class="colors-for-notes" :id="id" ></colors-chose>
            </div>
        <div v-if="isOver">
            <button @click="save" class="note-btn">save</button>
        </div>
    </section>
    `,
    data() {
        return {
            isOver:false,
            noteToEdit: notesService.getEmptyNote() ,
            isActive: 'txt',
            showColors:false

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
        },
        active(type){
            return {'add-note-active': type === this.isActive}
        }
    },
    name: 'note-add',
    components: {
        noteButtens
    }
    
}