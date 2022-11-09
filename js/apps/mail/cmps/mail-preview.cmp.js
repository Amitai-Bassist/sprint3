
export default {
    props:['email'],
    template:`
        <div class="preview-email grid">
            <div class="preview-email-star" ><i @click="email.isStarred=!email.isStarred" class="fa fa-star-o" :class="{isStarred: email.isStarred}" aria-hidden="true"></i></div>
            <article @mouseleave="isMouseOver = false" @mouseover="isMouseOver = true" class="preview-email-contact grid" @click="showDetails(email)">
                <div class="preview-email-from">{{ email.from }} </div>
                <div class="preview-email-subject">{{ email.subject }} </div>
                <div class="preview-email-body"></div>
                <div class="preview-email-sentAt">{{ email.sentAt }} </div> 
            </article>
            <div @mouseleave="isMouseOver = false" @mouseover="isMouseOver = true" class="preview-email-trash"><i v-if="isMouseOver" class="fa fa-trash-o" aria-hidden="true"></i></div>
        </div>
    `,
    data() {
        return {
            isMouseOver: false
        }
    },
    methods: {
        showDetails() {
            this.$emit('showDetails',this.email)
        },

    },
    components: {

    }
}