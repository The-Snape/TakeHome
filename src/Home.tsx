import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
const all_posts = gql`
{
  posts(order_by: {id: desc}) {
    id
    body
    title
  }
}
`; 
const Home: React.FC = () => {
    const {loading,error,data} = useQuery(all_posts);
    // var x:any=data;
    // console.log(x);
    if(loading){
        return <h5>Loading</h5>
    }
    if(error){
        return (
            <div>
                <h3>The following error has occured:</h3>
                <p>{error?.message}</p>
            </div>
        );
    }
    return data.posts.map((content:any)=>{
        return(
            <div className="post-preview">
                <Link to={`/posts/${content.id}`}>
                <h2>{content.title}</h2>
                {/* <p>{content.body}</p> */}
                </Link>
            </div>
        )
    });

}
 
export default Home;