export default {
    props:['emails'],
    // פה אני אפלטר כרגע לפי נקרא או לא נקרא ואז אני אשלח לאבא את המפולטרים
    template:`
        <select @change="filter" v-model="filterBy.read">
            <option>All</option>
            <option>Read</option>
            <option>UnRead</option>
        </select>
        <!-- <h1>{{filterBy}}</h1> -->
    `,
    data() {
        return {
            // emailToShow: null
            filterBy: {
                read: 'All'
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
        // emailToShowModal() {
        //     var emails = this.emails.filter(email => email.isRead === true)
        //     this.emailToShow = emails
        // }
    }
}