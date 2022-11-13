export default {
    template: `
    <form @submit.prevent="userInput">
            <input @input="userInput" v-if="isOver" type="text" v-model="noteToEdit.info.label" placeholder="Title"/>
            <input @input="userInput" @focus="focusToAdd" v-model="noteToEdit.info.todos[0].txt" type="text" placeholder="add todo..."/>
            <input @input="userInput" v-if="isOver" v-model="noteToEdit.info.todos[1].txt" type="text" placeholder="add todo..."/>
    </form>
    `,
    props:['noteToEdit'],
    data(){
        return {
            isOver:false,
        }
    },
    created(){
        
        this.noteToEdit.type = 'note-todos'       
        this.noteToEdit.info.todos = [{txt:''},{txt:''}]       
    },
    methods: {
        focusToAdd(){
            this.isOver = true
            this.$emit('isOver')
        },
        userInput(){
            this.$emit('userInput',this.noteToEdit)
        }
    },


}