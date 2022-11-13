export default {
    template: `
        <header class="app-header">
            <h1>Appsus</h1>
            <img @click="openMenu = !openMenu" class="menu-icon" src="assets/img/menu-icon.png" alt=""/>
        </header>
        <div v-if="openMenu" class="menu-bar">
            <router-link @click="openMenu=false" class="icon-in-menu" to="/email"><img class="icon-in-menu gmail-icon" src="assets/img/Gmail_icon_(2020).svg.png" alt="menu-icon" class="gmail-icon" /></router-link>
            <router-link @click="openMenu=false" class="icon-in-menu" to="/notes/show-nots"><img class="icon-in-menu gmail-icon" src="assets/img/keeps.png" alt="menu-icon" class="gmail-icon" /></router-link>
            <router-link @click="openMenu=false" class="icon-in-menu" to="/"><i class="fa fa-home fa-3x icon-in-menu" aria-hidden="true"></i></router-link>
            <router-link @click="openMenu=false" class="icon-in-menu" to="/about"><i class="fa fa-info fa-3x icon-in-menu" aria-hidden="true"></i></router-link>
        </div>
    `,
    data(){
        return {
            openMenu:false
            
        }
    },
    methods:{
    },
}