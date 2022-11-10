export default {
    template: `
    <form @submit.prevent="save">
            <input v-if="isOver" type="text" v-model="noteToEdit.title" placeholder="Title"/>
            <input @focus="isOver=true" v-model="noteToEdit.info.txt" type="text" placeholder="Take a note..."/>
    </form>
    `,
    props:['noteToEdit'],
    data(){
        return {

        }
    },
    
}