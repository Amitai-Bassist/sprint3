export default {
    props: ['email'],
    template: `
    <section>
        <article class="details-email">
            <div class="details-email-from">from: {{ email.from }}</div>
            <div class="details-email-to">to: {{ email.to }}</div>
            <div class="details-email-subject">Subject: {{ email.subject }}</div>
            <div class="details-email-sentAt">sentAt: {{ email.sentAt }}</div> <br>
            <!-- <mail-details :email="email"/> -->
            <div class="details-email-body">
                <p>Body: {{ email.body }}</p>
            </div>
        </article>
        <button @click="close">Back</button>
    </section>
    `,
    methods:{
        close(){
            this.$emit('close' ,this.email)
        }
    }
}