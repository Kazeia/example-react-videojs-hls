import React from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './videojs-resolution-switcher.css'
import './customVideoPlayer.css'

export default class App extends React.Component {
    state = {
        sources: [{
            src: 'https://pocrv2-prod.s3.us-east-2.amazonaws.com/videos/test.m3u8',
            type: 'application/x-mpegURL',
            label: 'auto',
        }, {
            src: 'https://pocrv2-prod.s3.us-east-2.amazonaws.com/videos/test720.m3u8',
            type: 'application/x-mpegURL',
            res: 720,
            label: '720p',
        }, {
            src: 'https://pocrv2-prod.s3.us-east-2.amazonaws.com/videos/test480.m3u8',
            type: 'application/x-mpegURL',
            res: 480,
            label: '480p',
        }, {
            src: 'https://pocrv2-prod.s3.us-east-2.amazonaws.com/videos/test360.m3u8',
            type: 'application/x-mpegURL',
            res: 360,
            label: '360p',
        }]
    }

    componentDidMount() {
        // Instantiate resolution switcher
        if (!window.videojs) window.videojs = videojs
        require('./videojs-resolution-switcher')

        // instantiate Video.js
        this.player = videojs(this.videoNode, {
            plugins: {
                videoJsResolutionSwitcher: {
                    default: 480
                },
            }
        }, () => {
            this.player.updateSrc(this.state.sources)
        })
    }

    componentWillUnmount() {
        if (this.player) this.player.dispose()
    }

    render = () =>
        <div style={{ width: "1280px", height: "720px" }} >
            <div data-vjs-player >
                <video
                    controls={true}
                    autoPlay={true}
                    preload="auto"
                    ref={node => this.videoNode = node}
                    className='video-js vjs-16-9 vjs-big-play-centered'>
                </video>
            </div>
        </div>
}
