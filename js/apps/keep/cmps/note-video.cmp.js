import noteButtens from '../cmps/note-buttens.cmp.js'
import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
    <section @mouseover="isOver = true" @mouseleave="isOver = false" class="note note-video">
        <div v-if="isOver" class="pin-div-btn flex">
            <div v-if="pin">pin note</div>
            <button @mouseover="pin = true" @mouseleave="pin = false" class="pin-btn note-btn" @click="pinNote"><i class="fa fa-thumb-tack fa-2x" aria-hidden="true"></i></button>
        </div>
        <h1>{{info.title}}</h1>
        <iframe width="220" height="124" :src="info.url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <note-buttens v-if="isOver" :id="id"></note-buttens>
    </section>
    `,
    data() {
        return{
            isOver: false,
            pin:false  
        }
    },
    name: 'note-video',
    props: ['info','id'],
    computed: {
        videoUrl(){
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