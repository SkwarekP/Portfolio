import classes from "./MainPage.module.css";
import ContactModal from "../components/ContactModal";
import {useEffect, useState} from "react";

function MainPage() {

    const [showModal, setShowModal] = useState(false);
    const [hide, setHide] = useState(false);
    const [focusFlag, setFocusFlag] = useState(false);

    const toggleModal = () => {

        if(showModal) {
            setHide(true);
            setTimeout(() => {
                setShowModal(false);
                setHide(false);
            }, 350)
        }
        else {
            setShowModal(prev => !prev);
        }
    }

    useEffect(() => {
        if(showModal) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [showModal])

    return (
        <>
            {showModal && <ContactModal onClose={toggleModal} onHide={hide}/>}
            <div className={classes.container}>
            <section className={classes.section__profile}>
                <header className={classes.header__profile}>
                    <h1>Patryk Skwara</h1>
                    <h2>Front-end developer</h2>
                </header>
                <div className={classes.description__profile}>
                    <p>
                        Im a graduate of Computer Science with a passion for creating modern, aesthetic and useful web applications.
                        I have a solid theoretical foundation and practical skills in frontend, including <span className={classes.orange_color}>
                        HTML</span>, <span className={classes.orange_color}>CSS</span>, <span className={classes.orange_color}>JavaScript </span>
                        and <span className={classes.orange_color}>React.js</span> library. I am a quick learner who strives to obtain new knowledge.
                        I am looking for opportunities to develop and gain experience as a frontend developer.
                    </p>
                </div>
                <div className={classes.links}>
                    <div className={classes.flex__row} onClick={() => {
                        setFocusFlag(true)
                        setTimeout(() => {
                            setFocusFlag(false);
                        }, 2000);
                    }}>
                        <p>01</p>
                        <div className={classes.border__line}></div>
                        <span >Projects</span>
                    </div>
                    <div className={classes.flex__row} onClick={toggleModal}>
                        <p>02</p>
                        <div className={classes.border__line}></div>
                        <span>Contact</span>
                    </div>
                </div>
            </section>
            <section className={classes.section__experience__contact}>
                <div className={`${classes.card} ${focusFlag ? classes.card__focus : classes.card}`}>
                    <header>
                        <div className={classes.row}>
                        <p><span className={classes.orange_color}>HTML, CSS, REACT.JS</span></p>
                        <span style={{alignSelf:"center"}}>12.2022</span>
                        </div>
                        <div className={classes.row}>
                        <h3>Starbucks</h3>
                            <a href="https://github.com/SkwarekP/Starbucks-app"><button className={classes.github__btn}>github</button></a>
                        </div>
                    </header>
                    <p>The Starbucks app currently exists. I found that on https://www.frontendpractice.com.
                        The project initially was the opportunity to build responsive layout from scratch to improve my HTML and CSS skills.
                        Then I decided to expand this app with some logic. I believe that is the best way of practice as a frontend developer.
                    </p>
                </div>
                <div className={`${classes.card} ${focusFlag ? classes.card__focus : classes.card}`}>
                    <header>
                        <div className={classes.row}>
                        <p><span className={classes.orange_color}>HTML, CSS, BOOTSTRAP, REACT.JS, MONGODB, POSTMAN, EXPRESS.JS</span></p>
                            <span style={{alignSelf:"center"}}>02.2021</span>
                        </div>
                        <div className={classes.row}>
                        <h3>psgym</h3>
                            <a href="https://github.com/SkwarekP/PSGYM"><button className={classes.github__btn}>github</button></a>
                        </div>
                    </header>
                    <p>
                        PSGYM is my first large app. I made it based on my gym hobby.
                        The application is used to support the management of a fitness club by a receptionist.
                        I was working with databases and Rest Api to get some experience.
                    </p>
                </div>

            </section>
            </div>
        </>
    )
}
export default MainPage;