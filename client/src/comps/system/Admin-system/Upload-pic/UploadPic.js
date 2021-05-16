import React from 'react'
import './style.css';
import './query.css';
import CircularStatic from './CircularStatic';

export default function UploadPic({ image, setImage, editVacation }) {
    const [currentPic, setcurrentPic] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'vacation-app')
        setLoading(true)
        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/pwm/image/upload',
                {
                    method: 'POST',
                    body: data
                })
            const file = await res.json()
            setImage(file.secure_url)
            setLoading(false)
            setcurrentPic(true)
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='upload-pic-warp'>
            <label className='upload-profle-pic-label' for='file-upload'>UPLOAD IMAGE</label>
            <input
                id='file-upload'
                className='add-pic-input'
                type='file'
                name='file'
                placeholder='upload image'
                onChange={uploadImage}
            />
            {loading ? <CircularStatic /> : (<>
                {
                    currentPic ?
                        <img src={image} className='currentImage' />
                        :
                        <img className='currentImage' src={editVacation.pics} />
                }
            </>
            )}
        </div>
    )
}
