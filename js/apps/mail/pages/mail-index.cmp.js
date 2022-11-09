import { emailService } from '../services/email.service.js'

import mailList from '../cmps/mail-list.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailCompose from './mail-compose.cmp.js'

export default {
    template: `
    <section class="email-app">
        <!-- <mail-filter @filter="setFilter" :emails="emails"/> -->
        <section class="email-container">
            <nav class="email-nav flex flex-column">
                <button @click="showComsose=!showComsose">Compose</button>
                <mail-compose v-if="showComsose" @close="closeCompose" @sended="saveEmail" />
                <button @click="clickInbox">Inbox</button>
                <button @click="clickStarred">Starred</button>
                <button @click="clickSent">Sent</button>
            </nav>
            <mail-list class="email-list-container" :emails="emailsToShow"/>
        </section>
    </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: {
                read: 'All',
                starred: null,
                sent: false,
            },
            showComsose: false,
        }
    },
    created() {
        this.loadEmails()
    },
    methods: {
        loadEmails() {
            emailService.query()
                .then(emails => {
                    this.emails = emails
                })
        },
        saveEmail(email) {
            this.showComsose = false
            this.emails.unshift(email)
        },
        closeCompose() {
            this.showComsose = false
        },
        clickInbox() {
            this.filterBy = {
                read: 'All',
                starred: null,
                sent: false,
            }
        },
        clickSent() {
            this.filterBy.sent = true
        },
        clickStarred() {
            this.filterBy.starred = true
            this.filterBy.sent = false
        }
    },
    computed: {
        emailsToShow() {
            if (!this.filterBy.starred && this.filterBy.read === 'All' && this.filterBy.sent === false) {
                return this.emails.filter(email => {
                    return email.from !== 'Me' || email.from === 'Me' && email.to === 'Me'
                })
            }
            
            if (this.filterBy.sent === true) return this.emails.filter(email => email.from === 'Me')
            if (this.filterBy.starred === true) return this.emails.filter(email => {
                return (email.from === 'Me' && email.to === 'Me' && email.isStarred === true) || (email.isStarred === true && email.from !== 'Me')
            })
        },
    },
    components: {
        mailList,
        mailFilter,
        mailCompose,
    }
}