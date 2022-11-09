export default {
    template: `
    <section>
        <h1>{{info.title}}</h1>
        <img :src="imgUrl" alt="" />
        
    </section>
    `,
    name: 'note-img',
    props: ['info'],
    computed: {
        imgUrl(){
            return this.info.url
        }
    }
}