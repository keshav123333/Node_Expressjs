import React,{useState,usRef,useEffect }from 'react';
import axios from 'axios';

function Feed(){
    const [posts,setPosts]=useState([
        {id:1,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR48MixIqIiVlT9rgU3AkNv7nj_ZgZozV9t_Q&s",
            caption:"first post"
        }
    ])

useEffect(()=>{
axios.get('https://friendly-potato-69gw9qvxg4943rj4j-3000.app.github.dev/posts').then(
    (res)=>{
        setPosts(res.data.posts)  
        console.log(res.data.posts)
        console.log("posts")
    }
)

},[])

    return (
        <section className='feed-section'>
            <h1>Feed</h1>
        {
            posts.length>0?(
                posts.map((post)=>(
                    <div key={post.id} className="post">
                        <img src={post.image} alt="post" className='post-image' />
                        <p className='post-caption'>{post.caption}</p>
                    </div>
                ))
            ):(<h1>No posts available</h1>)
        }

        </section>
    )

}
export default Feed;