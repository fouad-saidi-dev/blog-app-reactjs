import { IconButton } from "@mui/material";
import { useState } from "react";
import likePostApi from "../services/likes/like-posts/like-post-api";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useParams } from "react-router-dom";



const AddLike = (props) => {

    const [isLike,setLike] = useState(true)
    
    const addLike = (e) => {

        e.preventDefault()
        
        likePostApi.addLike(e,isLike,props.postId)
        setLike((prevLike) => !prevLike)

    }

console.log(props.postId)

    return(
        <IconButton onClick={(e) => {addLike(e)}} color={isLike ? "primary" : "default"}>
            <ThumbUpIcon />
        </IconButton>
    )

}

export default AddLike;