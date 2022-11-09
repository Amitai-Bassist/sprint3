import { emailService } from '../services/email.service.js'

import mailList from '../cmps/mail-list.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailCompose from './mail-compose.cmp.js'

export default {
    template: `
    <section class="email-app">
        <mail-filter @filter="setFilter" :emails="emails"/>
        <section class="flex">
            <!-- <mail-folder-list/> -->
            <nav class="flex flex-column">
                <mail-compose />



            </nav>
            <mail-list :emails="emailsToShow"/>
        </section>
    </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: null
        }
    },
    created() {

        this.loadEmails()
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        loadEmails() {
            emailService.query()
                .then(emails => {
                    this.emails = emails
                })
        }
    },
    computed: {
        emailsToShow() {
            console.log(this.filterBy);
            if (!this.filterBy) return this.emails

            if (this.filterBy.read === 'Read') {
                return this.emails.filter(email => email.isRead === true)
            }
            if (this.filterBy.read === 'UnRead') {
                return this.emails.filter(email => email.isRead === false)
            }
            return this.emails
        },
    },
    components: {
        mailList,
        mailFilter,
        mailCompose,
    }
}