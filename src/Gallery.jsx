import React, { Component } from 'react';
import './App.css';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playingUrl: '',
            audio: null,
            isPlaying: false
        }
    }

    playAudio(previewUrl) {
        let audio = new Audio(previewUrl);
        if (!this.state.isPlaying) {
            audio.play();
            this.setState({
                isPlaying: true,
                playingUrl: previewUrl,
                audio
            });
        } else {
            if (this.state.playingUrl === previewUrl) {
                this.state.audio.pause();
                this.setState({ isPlaying: false });
            } else {
                this.state.audio.pause();
                audio.play();
                this.setState({
                    playingUrl: previewUrl,
                    isPlaying: true,
                    audio
                })
            }
        }
    }

    render() {
        const { tracks } = this.props;

        return (
            <div>
                {tracks.map((track, k) => {
                    const trackImg = track.album.cover;
                    return (
                        <div onClick={() => this.playAudio(track.preview)}
                            key={k}
                            className="track">
                            <img
                                src={trackImg}
                                className="track-img"
                                alt="track"
                            />
                            <div className="track-play">
                                <div className="track-play-inner">
                                    {
                                        this.state.playingUrl === track.preview
                                            ? <span>| |</span>
                                            : <span>&#9654;</span>
                                    }
                                </div>
                            </div>
                            <p className="track-text">
                                {track.title_short}
                            </p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Gallery;