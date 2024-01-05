import tagService from "./tag.service";

const getTagsByPostId_ = async (postId,setTags) => {
    try {
        const response = await tagService.getTagsByPostId(postId)
        console.log("Success Tag",response.data)
        setTags(response.data)
    } catch (error) {
        console.error("Error Tags",error.message)
    }
 
};

const tagApi = {
  getTagsByPostId_,
};

export default tagApi;
