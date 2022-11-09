

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const EMAIL_KEY = 'emailDB'
const lorenIspum = 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.'
_createEmails()

export const emailService = {
    query,
    getEmailById,
    createEmail,
    addEmail,
}

function query() {
    return storageService.query(EMAIL_KEY)
}

function addEmail(email) {
    email.isRead = false;
    email.isStarred = false;
    email.sentAt = new Date().getDay() + '/' + new Date().getMonth()
    return storageService.post(EMAIL_KEY, email)
}



function getEmailById(emailId) {
    return storageService.get(EMAIL_KEY, emailId)
}

function createEmail(subject, body, isRead = false, isStarred = false, from, to) {
    const email = {
        id: utilService.makeId(),
        subject,
        body,
        isRead,
        isStarred,
        sentAt: new Date().getDay() + '/' + new Date().getMonth(),
        from,
        to,
    }
    return email
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)
    if (!emails || !emails.length) {
        emails = []
        emails.push(createEmail('Sprint 3', lorenIspum, false, false, 'Amitay', 'Me'))
        emails.push(createEmail('Progress...', lorenIspum, true, false, 'Coding Academy', 'Me'))
        emails.push(createEmail('How are you?', lorenIspum, true, true, 'Shlomo', 'Me'))
        emails.push(createEmail('Sprint 3', lorenIspum, true, false, 'Me', 'Amitay'))
        emails.push(createEmail('Sale', lorenIspum, true, false, 'AliExpress', 'Me'))
        emails.push(createEmail('Playlist', lorenIspum, false, false, 'Spotify', 'Me'))
        emails.push(createEmail('When will you arrive?', lorenIspum, true, true, 'Me', 'Mom'))
        emails.push(createEmail('Job alert', lorenIspum, false, true, 'LinkedIn', 'Me'))
        emails.push(createEmail('Activity in Shared Folders', lorenIspum, false, false, 'Dropbox', 'Me'))
        emails.push(createEmail('Sprint 3', lorenIspum, true, false, 'Slack', 'Me'))
        utilService.saveToStorage(EMAIL_KEY, emails)
    }
    console.log(emails);
}