import { gql } from "@apollo/client";
import { useState } from "react";
import { useHistory } from 'react-router-dom';

import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';
const client= new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://touched-serval-58.hasura.app/v1/graphql',
      headers: {
        'x-hasura-admin-secret': `IwLaLm1BACwrg8vx1oN8Z6H6UJSVyUvwzVsyYLjk5EjdQSwI3KlztYLI3mJOOQKh`
      }
    }),
  });
const insert_post_data = gql`
    mutation posts($body: String!, $title: String!) {
    insert_posts(objects: {body: $body, title: $title}) {
      affected_rows
    }
}`
;
const Create = () => {
    const [title,setTitle]=useState('');
    const [body,setBody]=useState('');
    const [isPending,setIsPending]=useState(false);
    const history=useHistory();
    const handleSubmit= (e:any) => {
        setIsPending(true);
        client.mutate({
            mutation: insert_post_data,
            variables:{title:title,body:body}
          })
        setIsPending(false);
        history.push('/');

    }
    return ( 
        <div className="create">
            <h2>Add a New Post</h2>
            <form onSubmit={handleSubmit}>
                <label>Post Title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e)=>{setTitle(e.target.value)}}
                />
                <label>Post Body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e)=>{setBody(e.target.value)}}
                ></textarea>
                
                {!isPending && <button>Add Post</button>}
                {isPending && <button disabled>Adding ...</button>}
            </form>
        </div>
    );
}
 
export default Create;