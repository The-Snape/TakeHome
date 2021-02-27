import { gql, useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';
const post_with_id = gql`
    query MyQuery($id: Int!) {
        posts(where: {id: {_eq: $id}}) {
            body
            title
        }
    }
`; 
const delete_post_with_id = gql`
    mutation ($_eq: Int!) {
        delete_posts(where: {id: {_eq: $_eq}}) {
            affected_rows
        }
    }
`;

const client= new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://touched-serval-58.hasura.app/v1/graphql',
      headers: {
        'x-hasura-admin-secret': `IwLaLm1BACwrg8vx1oN8Z6H6UJSVyUvwzVsyYLjk5EjdQSwI3KlztYLI3mJOOQKh`
      }
    }),
  });
const PostDetail: React.FC = () => {
    
    const { idx }=useParams<{ idx: string }>();
    const history=useHistory();
    var Id:number= +idx;
    const {loading,error,data} = useQuery(post_with_id,{ variables: {id:Id} });
    const handleClick=()=>{
        client.mutate({
            mutation: delete_post_with_id,
            variables:{_eq:Id}
          })
        history.push('/');
    }
    if(loading){
        return <h5>Loading</h5>
    }
    if(error){
        return (
            <div className="post-details">
                <h2>The following error occured:</h2>
                <p>{error?.message}</p>
            </div>
        );
    }
    return data.posts.map((content:any)=>{
        return(
            <div className="post-details">
                <p>{content.body}</p>
                <br/>
                <button onClick={handleClick}>delete post</button>
            </div>
        )
    });
}

export default PostDetail;