import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
    <section class="search-filter-notes">
        
            <button><i class="fa fa-search fa-2x" aria-hidden="true"></i></button>
            <input @input="filterNotes" type="Search" placeholder="search" v-model="inputVal"/>
        
        
    </section>
    `,
    data(){
        return {
            inputVal: ''
        }
    },
    methods:{
        filterNotes(){
            console.log(this.inputVal);
            eventBus.emit('filter-notes', this.inputVal)
        }
    },
}