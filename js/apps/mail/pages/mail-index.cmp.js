import { emailService } from '../services/email.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

import mailList from '../cmps/mail-list.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailCompose from './mail-compose.cmp.js'

export default {
    template: `
    <section class="email-app">
        <div class="email-app-filter-container">
            <mail-filter @upDateSearchTxt="upDateSearchTxt" @filter="setFilter" :emails="emails"/>
        </div>
        <section class="email-container">
            <nav class="email-nav flex flex-column">
                <button class="email-nav-btn-compose" @click="showComsose=!showComsose">Compose</button>
                <mail-compose v-if="showComsose" @close="closeCompose" @sended="saveEmail" />
                <button class="email-nav-btn-inbox btn-nav" @click="clickInbox">Inbox</button>
                <button class="email-nav-btn-starred btn-nav" @click="clickStarred">Starred</button>
                <button class="email-nav-btn-sent btn-nav" @click="clickSent">Sent</button>
            </nav>
            <mail-list @deleate="deleate" class="email-list-container" :emails="emailsToShow"/>
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
            const msg = {
                txt: `Email send successly`,
                type: 'success',
            }
            eventBus.emit('show-msg', msg)
        },

        deleate(email){
            console.log(email);
            var idx = this.emails.findIndex(emaill => emaill.id === email.id)
            this.emails.splice(idx, 1)
            // console.log(emailService.getEmailById(email.id));
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
        }, 
        upDateSearchTxt(txt) {
            this.filterBy.txt = txt
            console.log('txt', txt);
            console.log(this.filterBy);
        }
    },
    computed: {
        emailsToShow() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            // var emails = this.emails.filter(email => regex.test(email.from))
            if (this.filterBy.txt) {
                return this.emails.filter(email => regex.test(email.from))
            }
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