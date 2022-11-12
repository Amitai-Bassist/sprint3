export default {
    template: `
    <form @submit.prevent="userInput">
            <input @input="userInput" v-if="isOver" type="text" v-model="noteToEdit.info.title" placeholder="Title"/>
            <input @input="userInput" @focus="focusToAdd" v-model="noteToEdit.info.txt" type="text" placeholder="Take a note..."/>
    </form>
    `,
    props:['noteToEdit'],
    data(){
        return {
            isOver:false,
        }
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