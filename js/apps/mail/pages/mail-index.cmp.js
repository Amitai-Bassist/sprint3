import { emailService } from '../services/email.service.js'

import mailList from '../cmps/mail-list.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailCompose from './mail-compose.cmp.js'

export default {
    template: `
    <section class="email-app">
        <mail-filter  :emails="emails"/>
        <!-- <mail-filter @filter="setFilter" :emails="emails"/> -->
        <section class="flex">
            <!-- <mail-folder-list/> -->
            <nav class="flex flex-column">
                <button @click="showComsose=!showComsose">Compose</button>
                <mail-compose v-if="showComsose" @close="closeCompose" @sended="saveEmail" />
                <button @click="clickInbox">Inbox</button>
                <button>Starred</button>
                <button>Sent</button>


            </nav>
            <mail-list :emails="emailsToShow"/>
        </section>
    </section>
    `,
    data() {
        return {
            emails: [],
            filterBy: {
                read: 'All',
                starred: 'All',
                Sent: false,
            },
            showComsose: false,
        }
    },
    created() {
        this.loadEmails()
    },
    methods: {
        // setFilter(filterBy) {
        //     this.filterBy = filterBy
        // },
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
                starred: 'All',
                Sent: false,
            }
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