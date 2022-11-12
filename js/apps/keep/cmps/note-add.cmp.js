import { notesService } from "../services/note.service.js"
import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import colorsChose from './colors-chose.cmp.js'
import noteButtens from '../cmps/note-buttens.cmp.js'
import noteAddTxt from '../cmps/note-add-txt.cmp.js'

export default {
    template: `
    <section  class="add-note-section" :style="stylecoloruser">
        <note-add-txt v-if="isActive === 'txt'" :noteToEdit="noteToEdit" @isOver="isOver = true" @userInput="userInput"></note-add-txt>
        <div>
            <button @click="isActive= 'txt'" class="add-note-btn" :class="active('txt')"><i class="fa fa-comment-o fa-2x" aria-hidden="true"></i></button>
            <button @click="isActive= 'todo'" class="add-note-btn" :class="active('todo')"><i class="fa fa-check-square-o fa-2x" aria-hidden="true"></i></button>
            <button @click="isActive= 'img'" class="add-note-btn" :class="active('img')"><i class="fa fa-picture-o fa-2x" aria-hidden="true"></i></button>
            <button @click="isActive= 'video'" class="add-note-btn" :class="active('video')"><i class="fa fa-youtube fa-2x" aria-hidden="true"></i></button>
        </div>
        <div v-if="isOver" class="note-btns-2 flex">
            <div class="flex">
                <button class="note-btn" @click=""><i class="fa fa-ellipsis-v fa-2x" aria-hidden="true"></i></button>
                <button class="note-btn" @click=""><i class="fa fa-archive fa-2x" aria-hidden="true"></i></button>
                <button class="note-btn" @click="addImg=true"><i class="fa fa-picture-o fa-2x" aria-hidden="true"></i></button>
                <button class="note-btn" @click="showColors = true"><i class="fa fa-tachometer fa-2x" aria-hidden="true"></i></button>
                <colors-chose v-if="showColors" class="colors-for-notes" :id="null" ></colors-chose>
            </div>
            <div v-if="addImg" class="add-img-url flex">
                <input type="text" placeholder="img url..."/>
                <button class="note-btn">add</button>
            </div>
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
            showColors:false,
            stylecoloruser: {backgroundColor: 'white'},
            addImg:false,
        }
    },
    created(){
        eventBus.on('change-add-note-color',this.changeColor)
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
                .then(()=> {this.noteToEdit = notesService.getEmptyNote()
                this.stylecoloruser = {backgroundColor: 'white'}
                })
                .catch(err => {
                    console.log('OOps:', err)
                    showErrorMsg(`Cannot save note`)
                })
        },
        active(type){
            return {'add-note-active': type === this.isActive}
        },
        changeColor(color){
            this.showColors = false
            this.changeColors(color)
        },
        changeColors(color = 'white'){
            this.stylecoloruser = {backgroundColor: color}
            this.noteToEdit.style = {backgroundColor: color}
        },
        userInput(note){
            console.log(note);
            this.noteToEdit = note
        }
    },
    computed:{
    },
    name: 'note-add',
    components: {
        noteButtens,
        colorsChose,
        noteAddTxt,
    }
    
}