import { notesService } from '../services/note.service.js'

export default {
    template: `
    <section>
        <div v-for="(color, idx) in colors">
            <div v-bind:style=" {backgroundColor: color}">a</div>
        </div>
    </section>
    `,
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
        } 
    },
    computed:{
        
    }

}