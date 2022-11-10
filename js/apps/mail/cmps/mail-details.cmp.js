export default {
    props: ['email'],
    template: `
    <section>
        <div class="details-email">
            <div class="details-email-header">
                <button class="details-email-btn-back" @click="close"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></button>
            </div>
            <div class="details-email-subject">{{ email.subject }}</div>
            <div class="details-email-from">{{ email.from }}</div>
            <div class="details-email-to">{{ email.to }}</div>
            <!-- <div class="details-email-sentAt">sentAt: {{ email.sentAt }}</div> -->
            <p class="details-email-body">{{ email.body }}</p>
        </div>
    </section>
    `,
    methods: {
        close() {
            this.$emit('close', this.email)
        }
    }
}