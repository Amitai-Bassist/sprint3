export default {
    props: ['email'],
    template: `
    <section>
        <div class="details-email">
            <div class="details-email-subject">Subject: {{ email.subject }}</div>
            <div class="details-email-from">from: {{ email.from }}</div>
            <div class="details-email-to">to: {{ email.to }}</div>
            <div class="details-email-sentAt">sentAt: {{ email.sentAt }}</div>
            <div><p>Body: {{ email.body }}</p></div>
            <div><button @click="close">Back</button></div>
        </div>
    </section>
    `,
    methods:{
        close(){
            this.$emit('close' ,this.email)
        }
    }
}