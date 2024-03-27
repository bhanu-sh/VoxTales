import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import Artist from '@/models/artistModel';
import bcrypt from 'bcryptjs';


export const sendEmail = async ({email, emailType, userId} : any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        let mailType = emailType === "userVERIFY" || emailType === "userRESET" ? "VERIFY" : "RESET";

        if (emailType === "userVERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000});
        } else if (emailType === "userRESET") {
            await User.findByIdAndUpdate(userId,
                {forgotPasswordToken: hashedToken, forgotPasswordExpiry: Date.now() + 3600000});
        } else if (emailType === "artistVERIFY") {
            await Artist.findByIdAndUpdate(userId,
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000});
        } else if (emailType === "artistRESET") {
            await Artist.findByIdAndUpdate(userId,
                {forgotPasswordToken: hashedToken, forgotPasswordExpiry: Date.now() + 3600000});
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USER,
              pass: process.env.MAILTRAP_PASS
            }
          });

          const mailOptions = {
            from: 'bhanu@gmail.com',
            to: email,
            subject: mailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${mailType === "VERIFY" ? "verifyemail" : "reset"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email." : "Reset your password."}
            or copy and paste the link below in your browser: <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "reset"}?token=${hashedToken}
            </p>`
          };

          const mailresponse = await transport.sendMail(mailOptions);
            return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}