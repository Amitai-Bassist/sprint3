
export default {
    props:['email'],
    template:`
        <div  @mouseleave="isMouseOver = false" @mouseover="isMouseOver = true" class="preview-email grid">
            <div class="preview-email-star"><i @click="email.isStarred=!email.isStarred" class="fa fa-star" :class="{isStarred: email.isStarred}" aria-hidden="true"></i></div>
            <article @click="email.isRead=true" class="preview-email-contact grid" @click="showDetails(email)">
                <div class="preview-email-from">{{ email.from }} </div>
                <div class="preview-email-subject">{{ email.subject }} </div>
                <div class="preview-email-body"></div>
                <div class="preview-email-sentAt">{{ email.sentAt }} </div> 
            </article>
            <!-- <div @click="email.isRead = !email.isRead" v-if="email.isRead" @mouseleave="isMouseOver = false" @mouseover="isMouseOver = true" class="preview-email-trash"><i v-if="isMouseOver" class="fa fa-envelope-o" aria-hidden="true"></i></div>
            <div @click="email.isRead = !email.isRead" v-else @mouseleave="isMouseOver = false" @mouseover="isMouseOver = true" class="preview-email-trash"><i v-if="isMouseOver" class="fa fa-envelope-open-o" aria-hidden="true"></i></div> -->
            <div @mouseleave="isMouseOver = false" @mouseover="isMouseOver = true" class="preview-email-trash"><i v-if="isMouseOver" class="fa fa-trash-o" aria-hidden="true"></i></div>
            <!-- <div @mouseleave="isMouseOver = false" @mouseover="isMouseOver = true" class="preview-email-trash"><i v-if="isMouseOver" class="fa fa-trash-o" aria-hidden="true"></i></div> -->
        </div>
    `,
    data() {
        return {
            isMouseOver: false,
            isMouseOverEnvelope: false
        }
    },
    methods: {
        showDetails() {
            this.$emit('showDetails',this.email)
        },
        toggeleRead() {
            console.log('hi');
            this.$emit('toggeleRead', this.email)
        }

    },
    components: {

    }
}