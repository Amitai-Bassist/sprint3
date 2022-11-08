
export default {
    template: `
        <section class="about-page">
            <h1>About page</h1>
            <nav>
                <router-link to="/about/team">Team</router-link> |
                <router-link to="/about/goals">Goals</router-link> |
            </nav>
            <router-view></router-view>
        </section>
        `
}