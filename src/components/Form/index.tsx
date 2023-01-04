import React, {useEffect, useState} from 'react';
import styles from './Form.module.scss'

interface FormProps {
    title: string;
    handleClick: (email: string, pass: string) => void;
}

const Form: React.FC<FormProps> = ({title, handleClick}) => {
    const [email, setEmail] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [emailError, setEmailError] = useState('Email can not be empty')
    const [pass, setPass] = useState('')
    const [passDirty, setPassDirty] = useState(false)
    const [passError, setPassError] = useState('Password can not be empty')
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if(emailError || passError){
            setFormValid(false)
        }else{
            setFormValid(true)
        }
    }, [emailError, passError])

    const emailHandler = (e: any) => {
        setEmail(e.target.value)
        const valEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!valEmail.test(String(e.target.value).toLowerCase())){
            setEmailError('Email is not correct')
        }else{
            setEmailError("")
        }
    }
    const passHandler = (e: any) => {
        setPass(e.target.value)
            if(e.target.value.length < 5 || e.target.value.length > 10){
                setPassError('Password should be longer than 3 and shorter than 10')
                if(!e.target.value){
                    setPassError('Password can not be empty')
                }
            }else{
                setPassError("")
        }
    }

    const blurHandler = (e: any) => {
        switch (e.target.name){
            case 'email':
                setEmailDirty(true)
                break
            case 'pass':
                setPassDirty(true)
                break
        }
        console.log('123',e.target.name)
    }

    return (
        <div className={styles.decor}>
            <div className={styles.formLeftDecoration}></div>
            <div className={styles.formRightDecoration}></div>
            <div className={styles.circle}></div>
            <div className={styles.formInner}>
                {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
                <input
                    onBlur={e => blurHandler(e)}
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => emailHandler(e)}
                    placeholder="email"
                />
                {(passDirty && passError) && <div style={{color: 'red'}}>{passError}</div>}
                <input
                    onBlur={e => blurHandler(e)}
                    name="pass"
                    type="password"
                    value={pass}
                    onChange={e => passHandler(e)}
                    placeholder="password"
                />
                <button
                    disabled={!formValid}
                    onClick={() => handleClick(email, pass)}
                >
                    {title}
                </button>
            </div>
        </div>
    )
}
export {Form}
