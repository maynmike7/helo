import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/reducer';

class Auth extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleRegister = () => {
        const {username, password} = this.state
        axios.post('/api/register', {username, password})
        .then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/dashboard')
        }).catch(err => console.log(err))
    }

    handleLogin = () => {
        const {username, password} = this.state
        axios.post('/api/login', {username, password})
        .then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/dashboard')
        }).catch(err => console.log(err))
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <input
                    value={this.state.username}
                    name='username'
                    placeholder='Username'
                    onChange={(e) => this.handleInput(e)} />
                <input
                    value={this.state.password}
                    name='password'
                    placeholder='Password'
                    onChange={(e) => this.handleInput(e)} />
                <button onClick={this.handleLogin}>Login</button>
                <button onClick={this.handleRegister}>Register</button>
            </div>
        )
    }
}

export default connect(null, {getUser})(Auth);