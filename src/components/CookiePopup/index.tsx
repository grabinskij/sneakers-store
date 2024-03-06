import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useLocation, Navigate} from 'react-router-dom';


interface CookiePopupProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    setShowChangeConsent: React.Dispatch<React.SetStateAction<boolean>>;
    setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
    popupVisible: boolean;
    setIsButtonVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CookiePopup: React.FC<CookiePopupProps>  = ({setShow, setShowChangeConsent, setPopupVisible, popupVisible, setIsButtonVisible}) => {
    const [language, setLanguage] = useState<'English' | 'German'>('English');
    const [consentGiven, setConsentGiven] = useState<boolean | null>(null);


    const location = useLocation();

    useEffect(() => {
        const elementDE = document.getElementById('terms-de');
        const elementENG = document.getElementById('terms-eng');

        if (location.hash === '#terms-de' && elementDE) {
            elementDE.scrollIntoView({behavior: 'smooth'});
        }

        if (location.hash === '#terms-eng' && elementENG) {
            elementENG.scrollIntoView({behavior: 'smooth'});
        }
    }, [location]);



    useEffect(() => {
        const hasConsented = getCookie('site_consent') === "true" ? true : false;
        setConsentGiven(hasConsented);

        if (!hasConsented && getCookie('site_consent') !== "false" &&
            location.pathname !== '/privacy-policy' &&
            location.pathname !== '/legal-notice' &&
            location.pathname !== '/privacy-policy#terms-de' &&
            location.pathname !== '/legal-notice#terms-de') {
                setShow(true);
                setPopupVisible(true);
            }else {
                setPopupVisible(false);
                setShow(false);
                setShowChangeConsent(true);
            }
        }, [location.pathname]);


    const toggleStorage = (prop: boolean) => {
        setCookie('site_consent', prop ? "true" : "false", 365);
        setConsentGiven(prop);
        setPopupVisible(false);
    }

    const acceptCookies = () => {
        toggleStorage(true);
        setPopupVisible(false);
        setShow(false);
        setShowChangeConsent(true);
        setIsButtonVisible(true);
    }

    const declineCookies = () => {
        setPopupVisible(false);
        toggleStorage(false);
        setShow(false);
        setShowChangeConsent(true);
        setIsButtonVisible(false);
    }

    const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    }

    const setCookie = (name: string, value: string, days: number) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    }



    function closePopup() {
        setPopupVisible(false);
        setShow(false);
    }


    const changeLanguage = () => {
        setLanguage(prevLanguage => prevLanguage === 'English' ? 'German' : 'English');
    }

    return (
        <>
            {popupVisible && (
                <div className="cookie-popup">
                    <div className="cookie-popup__languages">
                        <div className="cookie-header">
                            <h2>{language === 'English' ? 'Cookies and Data Privacy Settings' : 'Cookies und Datenschutzeinstellungen'}</h2>
                        </div>
                        <div className="cookie-popup-content">
                            <div className="cookie-popup-text">
                                {language === 'English' ? (
                                    <>
                                        <p>By clicking the "Accept All" button, you consent to this website using
                                            cookies and
                                            similar
                                            technologies to store and retrieve information on your device. These
                                            technologies
                                            are used to
                                            conduct comprehensive evaluations of your visits and the use of our website.
                                            They
                                            enable detailed
                                            analysis of your activities to create a customized online experience. We
                                            tailor
                                            content and features
                                            to your preferences and interests to provide you with the greatest benefit
                                            possible.</p>
                                        <p>Please be aware that by using these technologies, data may be stored on your
                                            device
                                            and may be
                                            transmitted to third parties. This transmission may also occur to countries
                                            that may
                                            not have
                                            sufficient data protection standards.</p>
                                        <p>You have the right to refuse and to change or revoke your consent at a later
                                            time.
                                            Further
                                            information about how we handle your data and the technologies we use can be
                                            found
                                            in our <Link to="/privacy-policy" onClick={closePopup}>privacy policy.</Link></p>
                                        <p>Are you under 16 years old? Unfortunately, you are not entitled to
                                            independently
                                            consent to this
                                            service in order to view this content. Please ask your parents or legal
                                            guardians to
                                            agree to the
                                            service together with you!</p>
                                    </>
                                ) : (
                                    <>
                                        <p>
                                            Durch Betätigung der Schaltfläche "Alle akzeptieren" geben Sie Ihre
                                            Zustimmung, dass diese Webseite
                                            Cookies und ähnliche Technologien einsetzt, um Informationen auf Ihrem
                                            Endgerät zu speichern und
                                            auszulesen. Diese Technologien dienen dazu, umfangreiche Auswertungen über
                                            Ihre Besuche und die
                                            Nutzung unserer Webseite durchzuführen.
                                            Dabei ermöglichen sie eine detaillierte Analyse Ihrer Aktivitäten, um ein
                                            maßgeschneidertes
                                            Online-Erlebnis zu gestalten. Wir passen Inhalte und Funktionen individuell
                                            an Ihre Präferenzen und
                                            Interessen an, um Ihnen den größtmöglichen Nutzen zu bieten.
                                        </p>
                                        <p>
                                            Bitte berücksichtigen Sie, dass durch die Nutzung dieser Technologien Daten
                                            auf Ihrem Gerät
                                            gespeichert
                                            und
                                            an Drittanbieter weitergegeben werden können. Diese Übermittlung kann auch
                                            in Länder erfolgen, die
                                            möglicherweise nicht über ein angemessenes Datenschutzniveau verfügen.
                                        </p>
                                        <p>
                                            Sie haben das Recht, nicht einzuwilligen und deine Einwilligung zu einem
                                            späteren Zeitpunkt zu
                                            ändern oder zu widerrufen.
                                            Weitere Informationen zu unserem Umgang mit Ihren Daten und den von uns
                                            verwendeten Technologien
                                            finden
                                            Sie in unserer ausführlichen <Link to="/privacy-policy#terms-de" onClick={closePopup}>Datenschutzerklärung</Link>.
                                        </p>
                                        <p>
                                            Du bist unter 16 Jahre alt? Bedauerlicherweise bist du nicht berechtigt,
                                            diesem Dienst eigenständig
                                            zuzustimmen, um diese Inhalte anzusehen. Bitte ersuche deine Eltern oder
                                            Erziehungsberechtigten
                                            darum,
                                            dem Dienst gemeinsam mit dir zuzustimmen!
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="cookie-buttons">
                            <button className="acceptCookiesBtn" onClick={acceptCookies}>
                                {language === 'English' ? 'Accept All' : 'Alle akzeptieren'}
                            </button>
                            <button className="declineCookiesBtn" onClick={declineCookies}>
                                {language === 'English' ? 'Reject' : 'Ablehnen'}
                            </button>
                        </div>
                        <div className="cookie-footer">
                            <Link to={language === 'English' ? "/legal-notice" : "/legal-notice#terms-de"}
                                  className="cookie-link" onClick={closePopup}>
                                {language === 'English' ? 'Legal Notice' : 'Impressum'}
                            </Link>
                            <span className="cookie__link-divider">|</span>
                            <Link to={language === 'English' ? "/privacy-policy" : "/privacy-policy#terms-de"}
                                  className="cookie-link" onClick={closePopup}>
                                {language === 'English' ? 'Privacy Policy' : 'Datenschutzerklärung'}
                            </Link>
                            <button className="cookie-lang-btn"
                                    onClick={changeLanguage}>{language === 'English' ? 'DE' : 'ENG'}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
