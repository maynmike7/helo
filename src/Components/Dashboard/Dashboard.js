import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchPost: '',
            posts: [],
            showMyPosts: false
        }
    }

    handleInput = (val) => {
        this.setState({searchPost: val})
    }

    handleCheckClick = () => {
        if(this.state.showMyPosts === true){
            this.setState({showMyPosts: false})
        }else {
            this.setState({showMyPosts: true})
        }
    }

    getUserPosts = () => {
        axios.get(`/api/posts/${this.props.user.id}`)
        .then(res => this.setState({posts: res.data}))
        .catch(err => console.log(err));
    }

    render() {
        console.log(this.state)
        const mappedPosts = this.state.posts.map((post, i) => (
            <div>
                <img key={i} src={post.post_url} alt='helo post'/>
            </div>
        ))
        return (
            <div>
                <input 
                    value={this.state.searchPost}
                    placeholder='Search By Title'
                    onChange={(e) => this.handleInput(this.target.value)}/>
                <input type='checkbox' onClick={this.handleCheckClick}/>
                <div>
                    {mappedPosts}
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Dashboard);