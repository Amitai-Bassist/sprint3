
import emailApp from './views/email-app.cmp.js'
import notesApp from './views/notes-app.cmp.js'
import homePage from './views/home-page.cmp.js'
import aboutPage from './views/about-page.cmp.js'

const { createRouter, createWebHashHistory } = VueRouter

const aboutTeam = {
    template: `
    <section class="about-team">
        <h2>Our team</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nemo voluptate dignissimos ab quibusdam recusandae, suscipit soluta. In reprehenderit repellat commodi ab eligendi. Nulla, inventore ipsum voluptatem ipsam quidem alias?</p>
    </section>
    `
}
const aboutGoals = {
    template: `
    <section class="about-goals">
        <h2>Our Goals</h2>
        <p>Goals Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nemo voluptate dignissimos ab quibusdam recusandae, suscipit soluta. In reprehenderit repellat commodi ab eligendi. Nulla, inventore ipsum voluptatem ipsam quidem alias?</p>
    </section>
    `
}

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
