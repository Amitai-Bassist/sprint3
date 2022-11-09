

export default {
    template: `
        <nav class="flex flex-column">
            <router-link to="/email/compose"><button>Compose</button></router-link>
            <router-link to="/email/inbox">inbox</router-link>
            <router-link to="/email/starred">starred</router-link> 
            <router-link to="/email/sent" @click="trys">sent</router-link> 
            <router-view></router-view>
        </nav>
    `,
    data() {
        return {
            // filterBy
        }
    },
    methods: {
        trys() {
            console.log('try');
        }
    },

}