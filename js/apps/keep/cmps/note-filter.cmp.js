import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
    <section class="search-filter-notes">
        <form @submit.prevent="filterNotes">
            <button><i class="fa fa-search fa-2x" aria-hidden="true"></i></button>
            <input type="Search" placeholder="search" v-model="inputVal"/>
        </form>
        
    </section>
    `,
    data(){
        return {
            inputVal: ''
        }
    },
    methods:{
        filterNotes(){
            eventBus.emit('filter-notes', this.inputVal)
        }
    },
}