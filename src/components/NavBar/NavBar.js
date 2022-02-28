import './NavBar.css'

import { CartWidget } from './CartWidget';
import { Link } from 'react-router-dom';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useEffect, useState } from 'react';

export const NavBar = () => {

    const categoriesRef = collection(db, "categories");
    const [ categories, setCategories ] = useState(null);
    useEffect(() => {
        getDocs(categoriesRef)
            .then((resp) => {
                setCategories(resp.docs.map((elem) => elem.data().name ).sort());
            })
    }, [])

    //console.log(categories)
    return(
        <div className="navbar">
            <div className="navbar-content">
                <Link to='/'>
                    <h3 className="navbar-header">La Raquela - Shop</h3>
                </Link>
                <div className="navbar-nav">
                    {categories && categories.map( 
                        (elem, i) => {
                            return(
                                <Link key={i} to={'/category/' + elem} className="navbar-nav-elem">{elem.toUpperCase()}</Link>
                            );
                        }
                    )}
                </div>
                <CartWidget/>
            </div>
            <hr/>
        </div>
    );
}