import noteButtens from '../cmps/note-buttens.cmp.js'

export default {
    template: `
    <section @mouseover="isOver = true" @mouseleave="isOver = false" class="note note-img">
        <h1>{{info.title}}</h1>
        <img :src="imgUrl" alt="" />
        <note-buttens v-if="isOver" ></note-buttens>
    </section>
    `,
    data() {
        return{
            isOver: false  
        }
    },
    name: 'note-img',
    props: ['info'],
    computed: {
        imgUrl(){
            return this.info.url
        }
    },
    components: {
        noteButtens
    }
}