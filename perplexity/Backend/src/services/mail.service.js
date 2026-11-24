import nodemailer from 'nodemailer'
//read notes

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:'OAuth2' ,
        user: process.env.GOOGLE_USER,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientId: process.env.GOOGLE_CLIENT_ID

    }
})

transporter.verify()
    .then(() => {
        console.log('Email trabsporter Ready for send emails')
    })
    .catch((err) => {
        console.error("Error occurred while verifying email transporter:", err)
    })

export async function sendEmail({to,subject,html,text}){
    const mailoptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    };

    const details = await transporter.sendMail(mailoptions)
    console.log('Email sent successfully:', details)
}