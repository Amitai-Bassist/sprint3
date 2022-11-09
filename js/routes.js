
import emailApp from './views/email-app.cmp.js'
import notesApp from './views/notes-app.cmp.js'
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
            component: emailApp
        },
        {
            path: '/notes',
            component: notesApp
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
