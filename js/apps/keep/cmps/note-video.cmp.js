import noteButtens from '../cmps/note-buttens.cmp.js'

export default {
    template: `
    <section @mouseover="isOver = true" @mouseleave="isOver = false" class="note note-video">
        <h1>{{info.title}}</h1>
        <video src="videoUrl"></video>
        <note-buttens v-if="isOver" ></note-buttens>
    </section>
    `,
    data() {
        return{
            isOver: false  
        }
    },
    name: 'note-video',
    props: ['info'],
    computed: {
        videoUrl(){
            return this.info.url
        }
    },
    components: {
        noteButtens
    }
}