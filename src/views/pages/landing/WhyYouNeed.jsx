import BlueLockSVG from 'icons/blue-lock.svg'
import CubeSVG from 'icons/cube.svg'
import SearchNormalSVG from 'icons/search-normal.svg'
import WaterfallSVG from 'icons/waterfall.svg'
import PlayIcon from 'icons/play.svg'
import PauseIcon from 'icons/pause.svg'
import { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from 'media-chrome/react'

export default function WhyYouNeed() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const hideTimeoutRef = useRef(null)

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, 3000) // Hide after 3 seconds
  }

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [])
  // const videoRef = useRef(null)

  // const togglePlayPause = () => {
  //   if (isPlaying) {
  //     videoRef.current.pause()
  //   } else {
  //     videoRef.current.play()
  //   }
  // }

  return (
    <div className="why-you-need-wrapper">
      <div className="container">
        <div className='col-sm-12 text-center gap-2 d-flex flex-column justify-content-center align-items-center why-you-need-header mb-4'>
          <span className='why-slogan'>Problem</span>
          <h1 className='display-5 fw-bold'>The Benchmarking Dilemma</h1>
        </div>
        <div className='col-sm-12 text-center gap-2 d-flex flex-column justify-content-center align-items-center why-you-need-content'>
          <div className="row text-center">
            <div className="col-sm-3 border-end  d-flex flex-column justify-content-center align-items-center">
              <div className='icon-wrap mb-3'>
                <WaterfallSVG />
              </div>
              <h6 className='fw-bold'>Lack of standard benchmarks</h6>
              <p className='opacity-75'>Private investors lack tools like the S&P 500 for reliable comparisons.</p>
            </div>
            <div className="col-sm-3 border-end  d-flex flex-column justify-content-center align-items-center">
              <div className='icon-wrap mb-3'>
                <SearchNormalSVG />
              </div>
              <h6 className='fw-bold'>Limited transparency</h6>
              <p className='opacity-75'>Investors struggle to assess real returns in private equity and VC.</p>
            </div>
            <div className="col-sm-3 border-end  d-flex flex-column justify-content-center align-items-center">
              <div className='icon-wrap mb-3'>
                <CubeSVG />
              </div>
              <h6 className='fw-bold'>Misleading performance claims</h6>
              <p className='opacity-75'>Non-standardized methods let many funds claim “top quartile” status.</p>
            </div>
            <div className="col-sm-3 d-flex flex-column justify-content-center align-items-center">
              <div className='icon-wrap mb-3'>
                <BlueLockSVG />
              </div>
              <h6 className='fw-bold'>Difficulty comparing strategies</h6>
              <p className='opacity-75'>Differences in methodology can distort performance and risk profiles.</p>
            </div>
          </div>
        </div>
        <div className="col-sm-12 text-center gap-2 d-flex flex-column justify-content-center align-items-center why-you-need-footer px-0 px-md-3 rounded-3 overflow-hidden mt-4 position-relative">
          {/* <ReactPlayer src='/video/addvertisment-alt.mp4' className="mb-4 w-100 rounded-3"/> */}

          <MediaController
            style={{
              width: '100%',
              aspectRatio: '16/9',
              position: 'relative',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ReactPlayer
              slot="media"
              src="https://www.youtube.com/watch?v=o4u70nPdu84"
              controls={false}
              playing={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              style={{
                width: '100%',
                height: '100%',
                '--controls': 'none',
              }}
            ></ReactPlayer>
            <MediaControlBar>
              <MediaTimeRange />
              <MediaTimeDisplay showDuration />
              <MediaMuteButton />
              <MediaVolumeRange />
              <MediaPlaybackRateButton />
              <MediaFullscreenButton />
            </MediaControlBar>
            <button onClick={() => setIsPlaying(!isPlaying)} className="position-absolute top-50 start-50 translate-middle btn rounded-circle d-flex align-items-center justify-content-center" style={{ width: '160px', height: '160px', border: 'none', display: isHovered ? 'flex' : 'none' }}>
              {isPlaying ? (
                <PauseIcon />
              ) : (
                <PlayIcon />
              )}
            </button>
          </MediaController>
        </div>
      </div>
    </div>
  )
}