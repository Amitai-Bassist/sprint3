import mailPreview from "./mail-preview.cmp.js"

export default {
    props:['emails'],
    template:`
        <!-- <h1>hello from list</h1> -->
        <ul>
            <li v-for="email in emails" :key="email.id">
                <mail-preview :email="email"/>
            </li>
        </ul>
    `,
    components: {
        mailPreview,
    }
}