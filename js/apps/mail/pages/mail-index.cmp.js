import { emailService } from '../services/email.service.js'

import mailFolderList from '../cmps/mail-folder-list.cmp.js'
import mailList from '../cmps/mail-list.cmp.js' 
import mailFilter from '../cmps/mail-filter.cmp.js'

export default {
    template:`
    <section class="email-app">
        <h1>email-app</h1>
        <mail-folder-list />

        <mail-filter @filter="setFilter" :emails="emails"/>
        <mail-list :emails="emailsToShow"/>
    </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: null
        }
    },
    created(){
        emailService.query()
            .then(emails => {
                this.emails = emails
            })
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        emailsToShow() {
            console.log(this.filterBy);
            if (!this.filterBy) return  this.emails

            if (this.filterBy.read === 'Read') {
                return this.emails.filter(email => email.isRead === true)
            }
            if (this.filterBy.read === 'UnRead') {
                return this.emails.filter(email => email.isRead === false)
            }
            return this.emails

        }
    },
    components: {
        mailList,
        mailFilter,
        mailFolderList,
    }
}