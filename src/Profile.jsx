import React, { Component } from 'react';
import './App.css';

class Profile extends Component {

    render() {
        let artist = { name: '', nb_fan: '', picture: '' };
        artist = this.props.artist !== null ? this.props.artist : artist;
        
        return (
            <div className='profile'>
                <img
                    className="profile-img"
                    alt="Profile"
                    src={artist.picture}
                />
                <div className="profile-info">
                    <div className="profile-name">{artist.name}</div>
                    <div className="profile-followers">{artist.nb_fan} followers</div>
                </div>
            </div>
        )
    }
}

export default Profile;