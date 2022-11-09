import mailDetails from "./mail-details.cmp.js"

export default {
    props:['email'],
    template:`
        <!-- <h1>hello from mail preview</h1> -->
        <!-- <pre>{{ email }}</pre> -->
        <ul @click="">
            <li>from: {{ email.from }}, to: {{ email.to }}</li>
            <li>Subject: {{ email.subject }}</li>
            <li>sentAt: {{ email.sentAt }}</li> <br>
        </ul>
        <mail-details v-if="showoDatails" :email="email"/>
    `,
    date() {
        return {
            showoDatails: false,
        }
    },
    components: {
        mailDetails,
    }
}