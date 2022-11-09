
import mailIndex from './apps/mail/pages/mail-index.cmp.js'
import noteIndex from './apps/keep/pages/note-index.cmp.js'
import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'
import aboutTeam from './views/about-team.cmp.js'
import aboutGoals from './views/about-goals.cmp.js'

// import mailFolderList from './apps/mail/cmps/mail-folder-list.cmp.js'
import mailInbox from './apps/mail/pages/mail.inbox.cmp.js'
import mailStarred from './apps/mail/pages/mail.starred.cmp.js'
import mailSent from './apps/mail/pages/mail.sent.cmp.js'
import showNote from './apps/keep/pages/note-index.cmp.js'




const { createRouter, createWebHashHistory } = VueRouter


const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage
        },
        {
            path: '/email',
            component: mailIndex,
            children: [
                {
                    path: 'compose',
                    component: mailCompose,
                },
                {
                    path: 'inbox',
                    component: mailInbox,
                },
                {
                    path: 'starred',
                    component: mailStarred,
                },
                {
                    path: 'sent',
                    component: mailSent,
                },
            ]
        },
        {
            path: '/notes',
            component: noteIndex,
            children: [
                {
                    path: 'show-notes',
                    component: showNote,
                },
                // {
                //     path: 'starred',
                //     component: mailStarred,
                // },
                // {
                //     path: 'sent',
                //     component: mailSent,
                // },
            ]
        },
        {
            path: '/about',
            component: aboutPage,
            children: [
                {
                    path: 'team',
                    component: aboutTeam,
                },
                {
                    path: 'goals',
                    component: aboutGoals,
                },
            ]
        },
    ]
}

export const router = createRouter(routerOptions)
