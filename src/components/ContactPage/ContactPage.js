import { useRef, useState, useEffect } from 'react'
import emailjs from '@emailjs/browser';
import Spline from '@splinetool/react-spline';
import { Button } from 'react-bootstrap';
import contactBg from "../../assets/images/contact-bg.jpg";
import "./ContactPage.scss"
import { getAuth } from "firebase/auth";
import { app } from '../firebaseAuth/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ContactPage = () => {
    const [showMap, setShowMap] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const formRef = useRef();
    const sendEmail = (event) => {
        event.preventDefault();
        emailjs.sendForm(`${process.env.REACT_APP_EMAILJS_SERVICEID}`, `${process.env.REACT_APP_EMAILJS_TEMPLATEID}`, formRef.current, `${process.env.REACT_APP_EMAILJS_PUBLIC_KEY}`)
            .then((result) => {
                // alert("Email sent successfully");
                toast('Email Sent Successfully !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }, (error) => {
                console.log(error.text);
            });
        event.target.reset();
    }
    useEffect(() => {
        // google logged in check
        const auth = getAuth(app);
        auth.onAuthStateChanged(user => {
            if (user) {
                setUserLoggedIn(true);
                setUserDetails(user);
            } else {
                setUserLoggedIn(false);
            }
        });
    }, [userLoggedIn])
    return (
        <div className='contact-page'>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
            />
            <iframe src='https://my.spline.design/untitled-f5a8e381442a6b067ceb056d47770ced/' frameborder='0' width='100%' height='100%' className='contact-page__bg'></iframe>
            <div className="contact">
                <div className="contact__outer">
                    <div className="contact__inner">
                        <div className="contact__img-box">
                            < iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.9738554466303!2d77.66102751535576!3d12.844965121118536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae135aeb7f340f%3A0x3ad86af40d2ac611!2sIIITB!5e0!3m2!1sen!2sin!4v1660799541325!5m2!1sen!2sin" width="100%" height="auto" allowFullScreen="allowfullscreen" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="contact__poster-img"></iframe>
                        </div>
                        <div className="contact__text-box">
                            <h1 className="contact__title">Contact Us</h1>
                            <form onSubmit={sendEmail} ref={formRef} className="contact__overview contact-in">
                                <input type="text" placeholder='Name' name='name' required className='contact-form-txt' defaultValue={userDetails ? userDetails.displayName : ""}></input>
                                <input type="text" placeholder='Subject' name='subject' className='contact-form-txt'></input>
                                <input type="email" placeholder='Email' name='email' required className='contact-form-txt' defaultValue={userDetails ? userDetails.email : ""}></input>
                                <textarea type="text" placeholder='Message' name='message' required className='contact-form-textarea' rows={8}></textarea>
                                <input type="submit" name="submit" className='contact-form-btn'></input>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ContactPage;