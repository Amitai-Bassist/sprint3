import { emailService } from '../services/email.service.js'

import mailList from '../cmps/mail-list.cmp.js' 

export default {
    template:`
    <section class="email-app">
        <h1>email-app</h1>
        <mail-list :emails="emails"/>
        
<!-- מפה אני אקרא לקומפוננטה של רשימה של כל המיליים -->

    </section>
    `,
    data() {
        return {
            emails: []
        }
    },
    created(){
        emailService.query()
            .then(emails => {
                this.emails = emails
            })
    },
    components: {
        mailList,
    }
}