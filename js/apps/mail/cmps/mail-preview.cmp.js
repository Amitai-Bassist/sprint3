
export default {
    props:['email'],
    template:`
        <ul class="clean-list" @click="showDetails(email)">
            <li>from: {{ email.from }}, to: {{ email.to }}</li>
            <li>Subject: {{ email.subject }}</li>
            <li>sentAt: {{ email.sentAt }}</li> <br>
        </ul>
    `,
    data() {
        return {
        }
    },
    methods: {
        showDetails() {
            this.$emit('showDetails',this.email)
        }
    },
    components: {

    }
}