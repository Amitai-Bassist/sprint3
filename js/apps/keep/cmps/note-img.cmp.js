import noteButtens from '../cmps/note-buttens.cmp.js'

export default {
    template: `
    <section @mouseover="isOver = true" @mouseleave="isOver = false" class="note note-img">
        <div v-if="isOver">
            <button @mouseover="pin = true" @mouseleave="pin = false" class="pin-btn note-btn" @click=""><i class="fa fa-thumb-tack fa-2x" aria-hidden="true"></i></button>
            <div v-if="pin">pin note</div>
        </div>
        <h1>{{info.title}}</h1>
        <img :src="imgUrl" alt="" />
        <note-buttens v-if="isOver" ></note-buttens>
    </section>
    `,
    data() {
        return{
            isOver: false,
            pin:false  
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