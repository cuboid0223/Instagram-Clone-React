import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import { auth } from '../firebase';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));



const Footer = () => {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);//open sign up modal
    const [openSignIn, setOpenSignIn] = useState(false);//open sign in modal
    const [openImagePost, setOpenImagePost] = useState(false)//open Image Post in modal
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);

    const signUp = (event) => {
        event.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                })
            })
            .catch((error) => alert(error.message))// if the mail or the password error, show the alert!
        setOpen(false)
    }

    const signIn = (event) => {
        event.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))

        setOpenSignIn(false);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser)// when the user has logged in
                setUser(authUser)
                if(authUser.displayName){
                    //don't update username
                }else{
                    //if we just create someone
                    return authUser.updateProfile(
                        {
                            displayName: username,
                        }
                    )
                }
            } else {
                setUser(null)// when the user has logged out
            }
        })
        return () => {
            //perform some cleanup actions
            unsubscribe()
        }
    }, [user, username]);



    return (
        <div className='footer'>
            {/* Sign up modal */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className='signUpModal__form'>
                        <center>
                            <img
                                className='signUpModal__logo'
                                src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/640px-Instagram_logo.svg.png'
                                alt='IG_logo'
                            />
                        </center>
                        <Input
                            placeholder='username'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            placeholder='e-mail'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={signUp}>註冊</Button>
                    </form>
                </div>
            </Modal>


            {/* Sign in modal */}
            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className='signUpModal__form'>
                        <center>
                            <img
                                className='signUpModal__logo'
                                src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/640px-Instagram_logo.svg.png'
                                alt='IG_logo'
                            />
                        </center>
                        <Input
                            placeholder='e-mail'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={signIn}>登入</Button>
                    </form>
                </div>
            </Modal>


            {user ? (
                <div className='footer__logoutContainer'>
                    <HomeOutlinedIcon className='footer__loginContainer__HomeOutlinedIcon' />
                    <Button onClick={() => auth.signOut()}>
                        <ExitToAppIcon />
                    </Button>
                    <AddBoxOutlinedIcon onClick={() => setOpenImagePost(true)}/>
                    <FavoriteBorderIcon />
                    <Avatar className='footer_avatar' />
                </div>
                
            ) : (
                    <div className='footer__loginContainer'>
                        <HomeOutlinedIcon className='footer__loginContainer__HomeOutlinedIcon'/>
                        <Button onClick={() => setOpenSignIn(true)}>登入</Button>
                        <AddBoxOutlinedIcon />
                        <Button onClick={() => setOpen(true)}>註冊</Button>
                        <Avatar className='footer_avatar' />
                    </div>
                )}



            {user?.displayName ? (
                <Modal
                    open={openImagePost}
                    onClose={() => {setOpenImagePost(false)}}
                >
                    <ImageUpload username={user.displayName} />
                </Modal> 
            ) : (
                    <small>Oops! you need to login!</small>
                )}
        </div>
    )
}

export default Footer
