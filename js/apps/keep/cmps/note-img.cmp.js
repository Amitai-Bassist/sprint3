import noteButtens from '../cmps/note-buttens.cmp.js'
import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
    <section @mouseover="isOver = true" @mouseleave="isOver = false" class="note note-img">
        <div v-if="isOver" class="pin-div-btn flex">
            <div v-if="pin">pin note</div>
            <button @mouseover="pin = true" @mouseleave="pin = false" class="pin-btn note-btn" @click="pinNote"><i class="fa fa-thumb-tack fa-2x" aria-hidden="true"></i></button>
        </div>
        <div class="content">
            <h1>{{info.title}}</h1>
            <img :src="imgUrl" alt="" />
        </div>
        <note-buttens v-if="isOver" :id="id"></note-buttens>
    </section>
    `,
    data() {
        return{
            isOver: false,
            pin:false  
        }
    },
    name: 'note-img',
    props: ['info','id'],
    computed: {
        imgUrl(){
            return this.info.url
        }
    },
    methods: {
        pinNote(){
          eventBus.emit('pin-note', this.id)
        }
    },
    components: {
        noteButtens
    }
}