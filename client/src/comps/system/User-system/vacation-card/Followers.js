import React from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { domain } from '../../../../config'

export default function Followers({ vacationId, followersArr, setshow }) {
    const [isFollow, setisFollow] = React.useState()
    const user = JSON.parse(localStorage.getItem('user'))

    React.useEffect(() => {
        const found = followersArr.find(follow => follow.user_id === user.id)
        setisFollow(found)
    }, [followersArr])

    const follow = async () => {
        try {
            const res = await fetch(domain + '/addfollow', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.id,
                    vacationId
                })
            })
            const data = await res.json()
            setshow(followersArr)
            setisFollow(!isFollow)
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            {
                !isFollow
                    ?
                    <FavoriteBorderIcon
                        onClick={follow}
                    /> :
                    <FavoriteIcon
                        onClick={follow}
                    />}
        </>
    )
}
