
import {Link} from 'react-router-dom';

const Notfound = () => {

        return (
            <div className="loading">
               <div>
                    <h1>Oops, 404 Notfound</h1>
                    <Link to="/" className="btn btn-warning">Come back home</Link>
               </div>
            </div>
        );
  
}

export default Notfound;