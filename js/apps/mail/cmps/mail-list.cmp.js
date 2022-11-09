import mailPreview from "./mail-preview.cmp.js"
import mailDetails from "./mail-details.cmp.js"

export default {
    props: ['emails'],
    template: `
        <ul v-if="!showDetailsEmail">
            <li v-for="email in emails" :key="email.id">
                <mail-preview @showDetails="showDetails" :email="email"/>
            </li>
        </ul>
        <mail-details v-else :email="showDetailsEmail" />
    `,
    data() {
        return{
            showDetailsEmail: null
        }
    },
    methods: {
        showDetails(email) {
            this.showDetailsEmail = email
            console.log(this.showDetailsEmail);
        },
    }
    ,
    components: {
        mailPreview,
        mailDetails,
    }
}