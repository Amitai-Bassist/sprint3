
export default {
    props:['email'],
    template:`
        <article class=" flex" @click="showDetails(email)">
            <div class="preview-email-star" v-if="email.isStarred"> ⭐ </div>
            <div class="preview-email-from">from: {{ email.from }} </div>
            <div class="preview-email-to">to: {{ email.to }} </div>
            <div class="preview-email-subject">Subject: {{ email.subject }} </div>
            <div class="preview-email-sentAt">sentAt: {{ email.sentAt }} </div> <br>
        </article>
    `,
    data() {
        return {
        }
    },
    methods: {
        showDetails() {
            this.$emit('showDetails',this.email)
        }
    },
    components: {

    }
}