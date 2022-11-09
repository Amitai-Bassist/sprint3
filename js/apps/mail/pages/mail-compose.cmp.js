import { emailService } from "../services/email.service.js"


export default {
    template: `
        <section class="email-compose">
            <div class="email-header">
                New Message
            </div>
            <div class="email-contect">
                <form @submit.prevent="sendEmail">
                    <!-- <div class="">

                    </div> -->
                    <div class="subject-continer">
                        <input type="text" v-model="email.subject" placeholder="Subject">
                    </div>
                    <div class="body-container">
                        <textarea v-model="email.body" rows="10" placeholder="Enter message here..."></textarea>
                    </div>
                    <div class="email-footer">
                        <button class="sent-btn">Send</button>
                    </div>
                </form>
            </div>
        </section>
    `,
    data() {
        return {
            email: {
                subject: '',
                body: ''
            }
        }
    },
    methods: {
        sendEmail() {
            this.email.to = this.email.from = 'Me'
            emailService.addEmail(this.email)
                .then(() => {
                    this.$emit('sended', this.email)
                    // this.$router.push('/email/inbox/')
                })

            // emailService.query()
            //     .then(console.log)
        }

    },

}