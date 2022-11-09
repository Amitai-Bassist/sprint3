export default {
    props: ['email'],
    template: `
        <ul>
            <li>from: {{ email.from }}, to: {{ email.to }}</li>
            <li>Subject: {{ email.subject }}</li>
            <li>sentAt: {{ email.sentAt }}</li> <br>
            <mail-details :email="email"/>
            <li><p>
                Body: {{ email.body }}
            </p></li>
        </ul>
    `,
}