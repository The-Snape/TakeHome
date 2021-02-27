import { gql, useQuery } from '@apollo/client';
import React from 'react';
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
        return <h5>Something's Wrong...</h5>;
    }
    return data.posts.map((content:any)=>{
        return(
            <div className="post-preview">
                <h2>{content.title}</h2>
                <p>{content.body}</p>
            </div>
        )
    });

}
 
export default Home;