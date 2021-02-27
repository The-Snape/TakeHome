import { Link } from "react-router-dom"

const NotFound: React.FC = () => {
    return (  
        <div >
            <h2>Sorry</h2>
            <p>Page cannot be found</p>
            <Link to="/">Back to the homepage</Link>
        </div>
    );
}

export default NotFound;