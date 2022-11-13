import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
            <img src="assets/img/keeps.png" class="icon-logo gmail-icon" alt="" />
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
            eventBus.emit('filter-notes', this.inputVal)
        }
    },
}