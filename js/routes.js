
import mailIndex from './apps/mail/pages/mail-index.cmp.js'
import noteIndex from './apps/keep/pages/note-index.cmp.js'
import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'
import aboutTeam from './views/about-team.cmp.js'
import aboutGoals from './views/about-goals.cmp.js'


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
            component: mailIndex
        },
        {
            path: '/notes',
            component: noteIndex
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
