export default {
    template: `
    <section>
        <h1>{{info.title}}</h1>
        <video src="videoUrl"></video>
    </section>
    `,
    name: 'note-video',
    props: ['info'],
    computed: {
        videoUrl(){
            return this.info.url
        }
    }
}