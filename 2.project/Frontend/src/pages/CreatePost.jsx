import axios from 'axios';
import React from 'react';
import {useNavigate} from 'react-router-dom';

function CreatePost(){
    const navigate=useNavigate();
    const handlesubmit=async (e)=>{
        e.preventDefault();
        const formData=new FormData(e.target);
        // const image=formData.get('image');
        // const caption=formData.get('caption');
        // console.log(image,caption)
 
        axios.post('https://friendly-potato-69gw9qvxg4943rj4j-3000.app.github.dev/create-post',formData)
        .then((response) => {
            console.log(response.data);
            navigate('/feed') // Redirect to the feed page after successful post creation
        })
    
    .catch((error) => {
        console.error('Error creating post:', error);

    })
    }
    return (
        <section className="create-post-section">
            <h1>Create Post</h1>
            <form onSubmit={handlesubmit} >
                <input type="file" name="image" accept="image/*" />
                <input type="text" name="caption" placeholder="Caption" required />
                <button type="submit">Create Post</button>
            </form>
        </section>
    )
}

export default CreatePost;