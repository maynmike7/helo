import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';


const Nav = (props) => {
console.log(props)
    return (
        <div>
            {props.location.pathname !== '/'
        ? (<nav>
            <div>
                <img className='profile-picture'
                        src={props.user.profile_picture}
                        alt={props.user.username}/>
                <h2>{props.user.username}</h2>
            </div>
            <ul>
                <li>
                    <Link to='/dashboard' className='nav-links'>Home</Link>
                </li>
                <li>
                    <Link to='/new' className='nav-links'>New Post</Link>
                </li>
                <li>
                    <Link to='/' className='nav-links'>Logout</Link>
                </li>
            </ul>
           </nav>)
        : null}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState

export default withRouter(connect(mapStateToProps)(Nav));