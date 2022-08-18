import { useRef } from 'react'
import emailjs from '@emailjs/browser';
import contactBg from "../../assets/images/contact-bg.jpg";
import "./ContactPage.scss"
const ContactPage = () => {
    const formRef = useRef();
    const sendEmail = (event) => {
        event.preventDefault();
        emailjs.sendForm(`${process.env.REACT_APP_EMAILJS_SERVICEID}`, `${process.env.REACT_APP_EMAILJS_TEMPLATEID}`, formRef.current, `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}`)
            .then((result) => {
                alert("Email sent successfully");
            }, (error) => {
                console.log(error.text);
            });
        event.target.reset();
    }
    return (
        <div className='wrapper-contact'>
            <img
                src={contactBg}
                alt="Background image"
                className="wrapper-contact__bg"
            />
            <div className="contact-in">
                <div className="contact-map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.9738554466303!2d77.66102751535576!3d12.844965121118536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae135aeb7f340f%3A0x3ad86af40d2ac611!2sIIITB!5e0!3m2!1sen!2sin!4v1660799541325!5m2!1sen!2sin" width="100%" height="auto" allowFullScreen="allowfullscreen" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="contact-form">
                    <h1>Contact Us</h1>
                    <form onSubmit={sendEmail} ref={formRef}>
                        <input type="text" placeholder='Name' name='name' required className='contact-form-txt'></input>
                        <input type="text" placeholder='Subject' name='subject' className='contact-form-txt'></input>
                        <input type="email" placeholder='Email' name='email' required className='contact-form-txt'></input>
                        <textarea type="text" placeholder='Message' name='message' required className='contact-form-textarea' rows={8}></textarea>
                        <input type="submit" name="submit" className='contact-form-btn'></input>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default ContactPage;