import { eventBus, } from "../../../services/event-bus.service.js"

export default {
    template: `
    <section class="more-options">
        <button @click="addToReminder" class="note-btn">Rimined me</button>
        <button @click="duplicateNote" class="note-btn">duplicat</button>
    </section>
    `,
    props: ['id'],
    methods:{
        duplicateNote(){
            eventBus.emit('duplicate-note',this.id)
            this.$emit('closeMore')
        },
        addToReminder(){
            eventBus.emit('add-to-reminder',this.id)
            this.$emit('closeMore')
        }
    },

}