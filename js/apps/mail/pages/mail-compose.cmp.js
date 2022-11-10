import { emailService } from "../services/email.service.js"


export default {
    template: `
        <section class="email-compose">
            <div class="email-header">
                New Message
            </div>
            <div class="email-contect">
                <form @submit.prevent="sendEmail">
                    <div class="to-container">
                        <input type="text" id="to" v-model="email.to" placeholder="To:">
                    </div>
                    <div class="subject-container">
                        <input type="text" id="subject" v-model="email.subject" placeholder="Subject">
                    </div>
                    <div class="body-container">
                        <textarea v-model="email.body" rows="15" placeholder="Enter message here..."></textarea>
                    </div>
                    <div class="email-footer">
                        <button @click="closeCompose" class="compose-btn deleate-btn"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                        <button class="sent-btn compose-btn"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                    </div>
                </form>
            </div>
        </section>
    `,
    data() {
        return {
            email: {
                to: '',
                subject: '',
                body: ''
            }
        }
    },
    methods: {
        sendEmail() {
            if (!this.email.to.length) this.email.to = 'Me'
            this.email.from = 'Me'
            // this.email.to = this.email.from = 'Me'
            emailService.addEmail(this.email)
                .then(() => {
                    this.$emit('sended', this.email)
                    this.email = {
                        to: '',
                        subject: '',
                        body: ''
                    }
                })
        },
        closeCompose() {
            this.$emit('close', this.email)
        }

    },

}