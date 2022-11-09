

export default {
    template: `
    <section class="note-btns grid">
        
        <button @mouseover="more = true" @mouseleave="more = false" class="note-btn" @click=""><i class="fa fa-ellipsis-v fa-2x" aria-hidden="true"></i></button>
        <button @mouseover="archive = true" @mouseleave="archive = false" class="note-btn" @click=""><i class="fa fa-archive fa-2x" aria-hidden="true"></i></button>
        <button @mouseover="add = true" @mouseleave="add = false" class="note-btn" @click=""><i class="fa fa-picture-o fa-2x" aria-hidden="true"></i></button>
        <button @mouseover="color = true" @mouseleave="color = false" class="note-btn" @click="showColors"><i class="fa fa-tachometer fa-2x" aria-hidden="true"></i></button>
        <button @mouseover="trash = true" @mouseleave="trash = false" class="note-btn" @click="deleteNote"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>
        <!-- <div v-if="more">more</div>
        <div v-if="archive">archive</div>
        <div v-if="add">add image</div>
        <div v-if="color">background options</div>
        <div v-if="trash">trash</div> -->
        
    </section>
    
    `,
    props: ['id'],
    data(){
        return {
            more:false,
            archive:false,
            add:false,
            color:false,
            trash:false,
            
            
        }
    },
    methods: {
        showColors(){
            
        },
        deleteNote(){
            this.$emit('deleteNote', this.id)
        }
    },
    components: {
        
    }
}

