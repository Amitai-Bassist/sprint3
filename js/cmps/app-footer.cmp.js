import { eventBus } from "../services/event-bus.service.js"

export default {
    template: `
        <footer class="app-footer">
            <p>Amitai & Efrat Coffeerights &copy; 2022</p>
        </footer>
    `,
    created(){
        eventBus.on('user-msg', console.log)
    }
}