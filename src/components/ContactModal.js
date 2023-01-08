import classes from "./ContactModal.module.css";
import ReactDom from 'react-dom';
import linkedinLogo from "./images/linkedin.svg";
import discordLogo from "./images/discord.svg";
import closeIcon from "./images/closeIcon.webp";
import {useCallback, useEffect, useState} from "react";
import {useRef} from "react";
import emailjs from "@emailjs/browser";

function ContactModal(props) {

    const escFunction = useCallback((event) => {
        if(event.key === "Escape"){
            props.onClose();
        }
    }, [props])

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        }
    }, [escFunction])

    const Overlay = () => {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [message, setMessage] = useState("");
        const [isDisabled, setIsDisabled] = useState(true);
        const [sendMessage, setSendMessage] = useState("");
        const [isCopied, setIsCopied] = useState(false);
        const [isSendingMessage, setIsSendingMessage] = useState(false);
        const form = useRef();

        useEffect(() => {
            if(name && email && message) {
                setIsDisabled(false);
            }
            else {
                setIsDisabled(true);
            }

        }, [name, email, message])

        const sendEmailHandler = (e) => {
            e.preventDefault();
            if(name && email && message) {
                setIsSendingMessage(true);
                emailjs.sendForm("service_wnl041g", "template_7509plm", form.current, "-AS6THuH6gOcPEiP6")
                    .then((result) => {
                        setIsSendingMessage(false);
                        setSendMessage(`Email sent successfully !`)
                    }, (error) => {
                        console.log(error.text)
                    });
                setName("");
                setEmail("");
                setMessage("");
            }
        }


        return (
        <div className={`${classes.container} ${props.onHide ? classes.container__reverseSlide : ""}`}>
            <div className={classes.contact}>
                <header><h1>Contact me!</h1></header>
                    <button className={classes.onClose__btn} onClick={props.onClose}><img src={closeIcon} alt="close"/></button>
                <div className={classes.flex__row}>
                    <a href="https://www.linkedin.com/in/patryk-skwara-93277625b"><img src={linkedinLogo} alt="linkedin"></img></a>
                    <a href="https://discord.gg/Wt8qGnRq"><img src={discordLogo} alt="discord" /></a>
                    <button className={`${classes.email__btn} ${isCopied ? classes.email__btn_copied : ""}`}
                            onClick={(event) => {
                                navigator.clipboard.writeText("patryk.skwara750@gmail.com")
                                    .then(() => setIsCopied(true));
                                setTimeout(() => {
                                    setIsCopied(false);
                                }, 1000)
                            }}>
                        {isCopied ? <span>Copied to clipboard!</span> : <span>patryk.skwara750@gmail.com</span> }
                    </button>
                </div>
            </div>
            <form className={classes.form} onSubmit={sendEmailHandler} ref={form}>
                <div className={classes.input__form}>
                <label>Your name</label>
                    <div className={classes.input__container}>
                <input type="text" name="user_name" onChange={(e) => setName(e.target.value)} value={name}/>
                    </div>
                </div>
                <div className={classes.input__form}>
                <label>Your email address</label>
                    <div className={classes.input__container}>
                <input type="email" name="user_email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    </div>
                </div>
                <div className={classes.input__form}>
                <label>Message</label>
                    <div className={classes.input__container}>
                    <textarea name="message" onChange={(e) => setMessage(e.target.value)} value={message}/>
                    </div>
                    {isSendingMessage && <div className={classes.loading__spinner}></div>}
                    <p className={classes.email__successfully}>{sendMessage}</p>
                </div>
                <button type="submit" className={classes.submit__btn} disabled={isDisabled}>Send</button>
            </form>
        </div>
        )
    }

    const Backdrop = () => {
        return <div className={classes.backdrop} onClick={props.onClose}></div>
    }

    return (
        <>
            {ReactDom.createPortal(<Overlay />, document.getElementById("modal-overlay"))}
            {ReactDom.createPortal(<Backdrop />, document.getElementById("modal-backdrop"))}
        </>
    )
}
export default ContactModal;

