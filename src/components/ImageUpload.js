import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCameraOutlined';
import firebase from "firebase";
import { db, storage } from '../firebase';

const ImageUpload = ({username}) => {
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)   
    const [progress, setProgress] = useState(0)

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])// only chose the first selected photo
        }
    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                //progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes)*100
                );
                setProgress(progress)
            },
            (error) => {
                //Error func
                console.log(error)
                alert(error.message)
            },
            () => {
                // Complete func
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                       
                        //post image inside db
                        db.collection('posts').add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption : caption,
                                imageUrl: url,
                                username: username
                        });
                        setProgress(0);//when the file uploaded down, let the progress from 100 to 0
                        setCaption('');// let the caption clear 
                        setImage(null);// let the file null
                    }) 
            }
        )
        // setOpenImagePost(false)
    }
    return (
        <div className='imageUpload'>
            <img
                className='header__logo'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/640px-Instagram_logo.svg.png'
                alt='IG_logo'
            />
            <progress className="imageUpload__progress" value={progress} max="100"/>
            {/* caption input */}
            {/* 
             <input
                className='imageUpload__caption'
                type='text'
                placeholder='input sth'
                onChange={event => setCaption(event.target.value)}
                value={caption}/>
            */}
           
            <textarea 
                className='imageUpload__caption'
                type='text'
                maxlength = "300"
                placeholder='input sth'
                onChange={event => setCaption(event.target.value)}
                value={caption}>
            </textarea>
            {/* file picker */}
            <input className='imageUpload__filePicker' id='imageUpload__filePicker' type='file' onChange={handleChange} />
            <label 
                htmlFor="imageUpload__filePicker" 
                rows="6"
                cols="40"
                required>
                <IconButton color="black" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            {/* submit btn */}
            <Button className='imageUpload__button' onClick={handleUpload}>upload post</Button>
        </div>
    )
}

export default ImageUpload
