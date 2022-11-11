import nodemailer from 'nodemailer';
import config from 'config';

const sendOTP = async (email: string, subject: string, otp: number) => {
	try {
		const transporter = nodemailer.createTransport(config.mail_setting);
		const mailOptions = {
			from: config.mail_setting.auth.user,
			to: email,
			subject: subject,
			html: `
			<div
			  class="container"
			  style="max-width: 90%; margin: auto; padding-top: 20px"
			>
			  <h2>Welcome to the Introverts cinema!</h2>
			  <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
			  <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
		 </div>
		  `
		};
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
	}
};

export { sendOTP };
