export default {
    props: ['email'],
    template: `
    <section>
        <ul>
            <li>from: {{ email.from }}</li>
            <li>to: {{ email.to }}</li>
            <li>Subject: {{ email.subject }}</li>
            <li>sentAt: {{ email.sentAt }}</li> <br>
            <mail-details :email="email"/>
            <li><p>
                Body: {{ email.body }}
            </p></li>
        </ul>
        <button @click="close">Back</button>
    </section>
    `,
    methods:{
        close(){
            this.$emit('close' ,this.email)
        }
    }
}