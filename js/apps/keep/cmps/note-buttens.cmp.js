import { eventBus, } from "../../../services/event-bus.service.js"
import colorsChose from './colors-chose.cmp.js'
import moreOptions from './more-options.cmp.js'

export default {
    template: `
    <section class="note-btn-txt">
        <div v-if="more">more</div>
        <div v-if="archive">archive</div>
        <div v-if="add">add image</div>
        <div v-if="color">background options</div>
        <div v-if="trash">trash</div>
    </section>
    <colors-chose v-if="showColors" class="colors-for-notes" :id="id" ></colors-chose>
    <more-options v-if="showMore" :id="id" @closeMore="showMore=false"></more-options>
    <section class="note-btns grid">
        <button @mouseover="more = true" @mouseleave="more = false" class="note-btn" @click="showMore=!showMore"><i class="fa fa-ellipsis-v fa-2x" aria-hidden="true"></i></button>
        <button @mouseover="archive = true" @mouseleave="archive = false" class="note-btn" @click="addToArchive"><i class="fa fa-archive fa-2x" aria-hidden="true"></i></button>
        <button @mouseover="add = true" @mouseleave="add = false" class="note-btn" @click="addImg=!addImg"><i class="fa fa-picture-o fa-2x" aria-hidden="true"></i></button>
        <button @mouseover="color = true" @mouseleave="color = false" class="note-btn" @click="showColors = true"><i class="fa fa-tachometer fa-2x" aria-hidden="true"></i></button>
        <button @mouseover="trash = true" @mouseleave="trash = false" class=" note-btn" @click="deleteNote"><i class=" fa fa-trash fa-2x" aria-hidden="true"></i></button>
    </section>
    <div v-if="addImg" class="add-img-url flex">
        <input type="text" placeholder="img url..."/>
        <button class="note-btn">add</button>
    </div>
    
    `,
    props: ['id'],
    data(){
        return {
            more:false,
            archive:false,
            add:false,
            color:false,
            trash:false,
            showColors:false,
            showMore:false,
            addImg:false
            
        }
    },
    methods: {
        deleteNote(){
            eventBus.emit('deleteNote', this.id)
        },
        addToArchive(){
            eventBus.emit('addToArchive', this.id)
        }
    },
    components: {
        colorsChose,
        moreOptions
    }
}

