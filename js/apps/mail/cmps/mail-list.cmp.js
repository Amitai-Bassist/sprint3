import mailPreview from "./mail-preview.cmp.js"
import mailDetails from "./mail-details.cmp.js"

export default {
    props: ['emails'],
    template: `
        <ul class="clean-list" v-if="!showDetailsEmail">
            <li v-for="email in emails" :key="email.id">
                <mail-preview :class="{isRead: email.isRead}" @deleate="deleate" @showDetails="showDetails" :email="email"/>
            </li>
        </ul>
        <mail-details v-else @close="close" :email="showDetailsEmail" />
    `,
    data() {
        return{
            showDetailsEmail: null
        }
    },
    methods: {
        showDetails(email) {
            this.showDetailsEmail = email
        },
        close() {
            this.showDetailsEmail = null
        },
        deleate(email) {
            console.log('hi from list');
            this.$emit('deleate',email)
        }
        // toggeleRead(email) {
        //     console.log('before',email.isRead);
        //     email.isRead = !email.isRead
        //     console.log('after', email.isRead);
        // }
    }
    ,
    components: {
        mailPreview,
        mailDetails,
    }
}