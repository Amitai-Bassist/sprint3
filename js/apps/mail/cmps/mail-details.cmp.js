export default {
    props: ['email'],
    template: `
    <section>
        <div class="details-email">
            <div class="details-email-header">
                <div><button title="Back to emails" class="details-email-btn-back" @click="close"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></button></div>
                <div class="details-email-sentAt">{{ showFormatTime }}</div>
            </div>
            <div class="details-email-subject">{{ email.subject }}</div>
            <div title="From" class="details-email-from">{{ email.from }}</div>
            <div title="To" class="details-email-to">{{ email.to }}</div>
            <p class="details-email-body">{{ email.body }}</p>
        </div>
    </section>
    `,
    methods: {
        close() {
            this.$emit('close', this.email)
        }
    }, 
    computed: {
        showFormatTime() {
            var year = this.email.sentAt.substring(0,4)
            var month = this.email.sentAt.substring(5,7)
            var day = this.email.sentAt.substring(8,10)
            var time = this.email.sentAt.substring(11,16)
            return time + ' ' + day + '/' + month + '/' + year
        }
    },
}