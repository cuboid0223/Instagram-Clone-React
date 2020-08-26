import React from 'react'
import NearMeIcon from '@material-ui/icons/NearMeOutlined';
import PhotoCameraIcon from '@material-ui/icons/PhotoCameraOutlined';
const Header = () => {
    return (
        <div className='header'>
            <PhotoCameraIcon className='header__PhotoCameraIcon' />
            <img 
                className='header__logo' 
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/640px-Instagram_logo.svg.png' 
                alt='IG_logo'
            />
            <NearMeIcon className='header__NearMeIcon'/>
        </div>
    )
}

export default Header
