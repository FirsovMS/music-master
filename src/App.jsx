import React, { Component } from 'react';
import './App.css'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: null
        }
    }

    search() {
        const BASE_URL = 'https://api.deezer.com';
        const FETCH_ID_URL = `${BASE_URL}/search?q=artist:"${this.state.query}}"`;
        fetch(FETCH_ID_URL, {
            method: 'GET'
        }).then(response => response.json()).then(json => {
            const artist_id = json.data[0].artist.id;
            this.setState({tracks: json.data});

            if (artist_id != null) {
                const FETCH_ARTIST_URL = `${BASE_URL}/artist/${artist_id}`;
                fetch(FETCH_ARTIST_URL, {
                    method: 'GET'
                }).then(response => response.json()).then(json => this.setState({ artist: json }))
            }
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">
                    Music Master
                </div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Seacrh for an Artist"
                            query={this.state.query}
                            onChange={event => this.setState({ query: event.target.value })}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search();
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search" />
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null
                        ? <div>
                            <Profile
                                artist={this.state.artist}
                            />
                            <Gallery
                                tracks={this.state.tracks}
                            />
                        </div>
                        : <div></div>
                }
            </div>
        )
    }
}

export default App;