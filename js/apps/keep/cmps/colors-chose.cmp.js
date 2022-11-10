import { notesService } from '../services/note.service.js'
import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
    <section>
        <div v-for="(color, idx) in colors">
            <div @click="choseColor(color)" class="google-color" v-bind:style=" {backgroundColor: color}"></div>
        </div>
    </section>
    `,
    props: ['id'],
    data(){
        return {
            colors: notesService.getGoogleNotesColors()
        }
    },
    created(){
        this.colors = notesService.getGoogleNotesColors()
    },
    methods: {
        bcgColor(color){
            console.log(color);
            return {backgroundColor: color}
        },
        choseColor(color){
            eventBus.emit('change-note-color', {color: color, id: this.id})
        }
    },
    computed:{
        
    }

}