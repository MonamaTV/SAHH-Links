import React from 'react';
import "./Faq.css";
import faq1 from "../assets/img/faq4.svg";
import { Helmet } from 'react-helmet';

function Faq() {

    const faqs = [
        { 
            question: "What is an SAHHLink",
            answer: "It is a smart link that has links to all your music on the streaming platforms you chose to use"
        },
        { 
            question: "How does SAHHLinks work?",
            answer: "SIMPLE. All you need to do is, upload your cover art with the details of your track/project and links to it. Then share with the fans"
        },
        { 
            question: "What are the monthly fees?",
            answer: "NO COST! You do not have to pay even a cent to utilize our platform."
        },
        { 
            question: "Is it open to everyone?",
            answer: "Everyone. It is a public platform that is open to anyone who wishes to use smartlinks. Regardless of the genre of music you make."
        },
        { 
            question: "Do you offer free promo to anyone who is registered?",
            answer: "We can work something out.🤗After all, we are the Coolest Admins in Africa. Please contact us and we'll see what we can do for you."
        }
    ]

    return (
        <>
            <Helmet>
                <title>Frequently Asked Questions</title>
                <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
                <meta name="description" content="SAHHLinks"/>
                <meta name="keywords" content="Music, Links, SAHHLinks, SmartLinks"/>
                {/* Twitter card */}
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@SA_HipHop_ZA" />
                <meta name="twitter:title" content={`Check out our FAQs page`}  />
                <meta name="twitter:description" content={"We are answering all the questions you may have"}/>
                <meta name="twitter:image" content={faq1} />
            </Helmet>
            <div className="faq my-margin">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="faq-content">
                                <h2>Let Us Answer Your Questions</h2>
                                <p>Check our FAQs and get an insight on how the platforms intends to serve the public!</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="faq-image">
                                <img src={faq1} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        {
                            faqs.map((faq, index) => {
                            return (
                                <div className="faq-accordion" key={index}>
                                    <button >{faq.question}</button>
                                    <div className="answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    )
}

export default Faq
