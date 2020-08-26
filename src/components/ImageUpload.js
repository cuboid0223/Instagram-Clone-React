import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import firebase from "firebase";
import { db, storage } from '../firebase';

const ImageUpload = ({username}) => {
    const [caption, setCaption] = useState(null)
    const [image, setImage] = useState('')
    
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
                    .getDownLoadURL()
                    .then(url => {
                        //post image inside db
                        db.collection('post').add(
                            {
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption : caption,
                                imageUrl: url,
                                username: username
                            }
                        )
                    })
            }


        )
    }
    return (
        <div className='imageUpload'>
            {/* caption input */}
            <input type='text' placeholder='input sth' onChange={event => setCaption(event.target.value)} value={caption}/>

            {/* file picker */}
            <input type='file' onChange={handleChange} />
            {/* submit btn */}
            <Button className='imageUpload__button' onClick={handleUpload}>upload post</Button>
        </div>
    )
}

export default ImageUpload
