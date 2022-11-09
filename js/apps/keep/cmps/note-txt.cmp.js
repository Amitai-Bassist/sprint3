import noteButtens from '../cmps/note-buttens.cmp.js'

export default {
    template: `
          <section @mouseover="isOver = true" @mouseleave="isOver = false" class="note note-txt">
              <textarea name="" id="" cols="24" rows="10">{{info.txt}}</textarea>
              <note-buttens v-if="isOver" ></note-buttens>
          </section>
          `,
    props: ['info'],
    data() {
      return {
        isOver: false
      }
    },
    components: {
      noteButtens
  }
}