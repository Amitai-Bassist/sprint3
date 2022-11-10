import noteButtens from '../cmps/note-buttens.cmp.js'
import { eventBus, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

export default {
    template: `
          <section @mouseover="isOver = true" @mouseleave="isOver = false" class="note note-txt">
              <div v-if="isOver" class="pin-div-btn flex">
                <div v-if="pin">pin note</div>
                <button @mouseover="pin = true" @mouseleave="pin = false" class="pin-btn note-btn" @click="pinNote"><i class="fa fa-thumb-tack fa-2x" aria-hidden="true"></i></button>
              </div>    
              <textarea name="" id="" cols="24" rows="8">{{info.txt}}</textarea>
              <note-buttens v-if="isOver" :id="id"></note-buttens>
          </section>
          `,
    props: ['info','id'],
    data() {
      return {
        isOver: false,
        pin:false
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