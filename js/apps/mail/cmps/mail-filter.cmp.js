export default {
    props:['emails'],
    // פה אני אפלטר כרגע לפי נקרא או לא נקרא ואז אני אשלח לאבא את המפולטרים
    template:`
        <!-- <select @change="filter" v-model="filterBy.read">
            <option>All</option>
            <option>Read</option>
            <option>UnRead</option>
        </select> -->
        <!-- <div class="search-container"> -->
            <form class="search-container" @submit.prevent="upDateSearch">
                <button  class="filter-btn-search"><i class="fa fa-search" aria-hidden="true"></i></button>
                <input v-model="filterBy.txt" id="search" type="search" placeholder="Type here to search">
            </form>
        <!-- </div> -->
        <!-- <h1>{{filterBy}}</h1> -->
    `,
    data() {
        return {
            // emailToShow: null
            filterBy: {
                txt: '',
                read: 'All'
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        },
        upDateSearch() {
            console.log(this.filterBy.txt);
            this.$emit('upDateSearchTxt', this.filterBy.txt)
            this.filterBy.txt = ''
        }
        // emailToShowModal() {
        //     var emails = this.emails.filter(email => email.isRead === true)
        //     this.emailToShow = emails
        // }
    }
}