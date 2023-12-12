import { IconButton } from "@mui/material";
import { useState } from "react";
import likePostApi from "../services/likes/like-posts/like-post-api";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';



const AddLike = (props) => {

    const [like_,setLike] = useState(true)
    
    const addLike = (e) => {

        e.preventDefault()
        
        likePostApi.addLike(e,like_,props.postId)
        setLike((prevLike) => !prevLike)

    }



    return(
        <IconButton onClick={(e) => {addLike(e)}} color={like_ ? "primary" : "default"}>
            <ThumbUpIcon />
        </IconButton>
    )

}

export default AddLike;