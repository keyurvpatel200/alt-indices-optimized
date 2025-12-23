import { useEffect, useState } from 'react'
import { Input } from 'reactstrap'

import { useSelector } from '@/boot/redux'
import axios from '@/service/axios'
import ChatSVG from 'icons/Chat.svg'
import HamburgerSVG from 'icons/Hamburger.svg'
import HamburgerCloseSVG from 'icons/HamburgerClose.svg'
import ProfileArrowButtonSVG from 'icons/ProfileArrowButton.svg'
import SearchSVG from 'icons/Search.svg'
import Logos from '../assets/logo.jpg'
import mUserOne from '../assets/m-user-1.png'
import mUserTwo from '../assets/m-user-2.png'
import mUser from '../assets/m-user.png'
import { useLocation } from 'react-router-dom'
import { removeLocalStorage, REVIEW_CHANGES } from '../utils/utils'
// Import Bootstrap JavaScript bundle

export default function AppHeader(props) {
  const currentUser = useSelector(state => state.user)
  const [profileAvatar, setProfileAvatar] = useState('')
  const location = useLocation()
  const fetchProfilePhoto = async () => {
    try {
      if (!currentUser) return
      const response = await axios.get('/profile-photo/')
      setProfileAvatar(response.data.photo)
    } catch (error) {
      console.error('Error fetching profile photo', error)
    }
  }

  const [AboutformData, setAboutFormData] = useState({
    name: 'Jane Eyre',
    about: `Based in California, 500 Startups is an early stage
            venture capital firm and accelerator program for
            start-ups. The firm invests globally across a diverse
            range of technology sectors including internet,
            software, mobile platforms, and business and information
            services.`
  })
  const getAboutInfo = () => {
    axios
      .get('/about-us/info/')
      .then(response => {
        if (response.status === 200) {
          const { content, title } = response.data
          setAboutFormData(prevState => ({
            ...prevState,
            name: title || prevState.name, // Update 'name' only if 'title' exists
            about: content || prevState.about // Update 'about' only if 'content' exists
          }))
        }
      })
      .catch(() => { })
  }
  useEffect(() => {
    getAboutInfo()
    fetchProfilePhoto()
  }, [])

  useEffect(() => {
    if (!location?.pathname?.startsWith('/layout/fund/review-changes')) {
      removeLocalStorage(REVIEW_CHANGES)
    }
  }, [location])
  return (
    <header
      className={ `header ${props?.hideHeader && 'd-none'} header-sticky d-flex justify-content-end` }
    >
      <div className="m-section">
        <img className="avatar-img" src={ Logos } alt="ALT" />
        <div
          className="m-sidebar-toggle"
          onClick={ () => props.setMSidebarToggle(!props.msidebarToggle) }
        >
          { props.msidebarToggle ? <HamburgerSVG /> : <HamburgerCloseSVG /> }
        </div>
      </div>
      <h4 className="me-auto mb-0">Dashboard</h4>
      <div className="common-search">
        <SearchSVG />
        <Input type="text" placeholder="Search" />
      </div>
      <div className="chat-section">
        <div className="dropdown">
          <div
            className="launch-btn"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <ChatSVG />
            <span className="c-badge"></span>

            <div
              className="dropdown-menu dropdown-menu-end message-modal"
              aria-labelledby="dropdownMenuButton"
            >
              <div className="message--column">
                {/* Chat notification list */ }
                <div className="d-none">
                  <div className="col-sm-12 d-flex flex-row justify-content-between">
                    <div className="index--row">
                      Index <span className="count">4</span>
                    </div>
                    <div className="see-expand">
                      <label>See all</label>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.6548 4.16667H11.6667V2.5H17.5V8.33333H15.8333V5.34517L12.2559 8.92258L11.0774 7.74407L14.6548 4.16667ZM2.5 11.6667H4.16667V14.6548L7.74407 11.0774L8.92258 12.2559L5.34517 15.8333H8.33333V17.5H2.5V11.6667Z"
                          fill="#525866"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Only text  */ }
                  <div className="col-sm-12 msg-blk-col">
                    <div className="user-name-row">
                      <div className="user-avatar-box">
                        <img className="avatar-img" src={ mUser } alt="" />
                      </div>
                      <div className="user-detail-row">
                        <div className="user-left-row">
                          <div className="user-name-hdr">Annette Black</div>
                          <div className="user-founder">Founder of Storylane</div>
                        </div>
                        <div className="msg-time-duration">1h ago</div>
                      </div>
                    </div>
                    <div className="user-msg-row">
                      Hi Jack, just a quick reminder. Please check the attachment from Lassie.
                      Thanks in advance.
                    </div>
                  </div>

                  {/* Email Address Attached  */ }
                  <div className="col-sm-12 msg-blk-col">
                    <div className="user-name-row">
                      <div className="user-avatar-box">
                        <img className="avatar-img" src={ mUserOne } alt="" />
                      </div>
                      <div className="user-detail-row">
                        <div className="user-left-row">
                          <div className="user-name-hdr">Annette Black</div>
                          <div className="user-founder">Founder of Storylane</div>
                        </div>
                        <div className="msg-time-duration">1h ago</div>
                      </div>
                    </div>
                    <div className="user-msg-row">
                      <div className="short-name">JE</div>
                      <div className="d-flex flex-column">
                        <label className="font-16">Jack Eyere</label>
                        <span className="gray-1">jackeyere@portfolio.company</span>
                      </div>
                    </div>
                  </div>

                  {/* PDF Attached */ }
                  <div className="col-sm-12 msg-blk-col">
                    <div className="user-name-row">
                      <div className="user-avatar-box">
                        <img className="avatar-img" src={ mUserTwo } alt="" />
                      </div>
                      <div className="user-detail-row">
                        <div className="user-left-row">
                          <div className="user-name-hdr">Annette Black</div>
                          <div className="user-founder">Founder of Storylane</div>
                        </div>
                        <div className="msg-time-duration">1h ago</div>
                      </div>
                    </div>
                    <div className="user-msg-row">
                      <div className="mb-auto mt-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.5 6.66602V17.4937C17.5 17.9578 17.1293 18.3327 16.6722 18.3327H3.32783C2.87079 18.3327 2.5 17.9627 2.5 17.5062V2.49252C2.5 2.04544 2.87392 1.66602 3.33518 1.66602H12.4973L17.5 6.66602ZM15.8333 7.49935H11.6667V3.33268H4.16667V16.666H15.8333V7.49935Z"
                            fill="#1D2939"
                          />
                        </svg>
                      </div>
                      <div className="d-flex flex-column">
                        <label className="font-16 dark-black lh-sm">Q3_Asset_Details.pdf</label>
                        <span className="font-14 gray-1 lh-sm">2MB</span>
                      </div>
                    </div>
                  </div>

                  {/* Request fund Attached */ }
                  <div className="col-sm-12 msg-blk-col">
                    <div className="user-name-row">
                      <div className="user-avatar-box">
                        <img className="avatar-img" src={ mUser } alt="" />
                      </div>
                      <div className="user-detail-row">
                        <div className="user-left-row">
                          <div className="user-name-hdr">Paggam</div>
                          <div className="user-founder">Founder of Storylane</div>
                        </div>
                        <div className="msg-time-duration">1h ago</div>
                      </div>
                    </div>
                    <div className="user-msg-row request-row-section">
                      <label className="font-14">Paggam has requested for your fund report</label>
                      <p className="font-12">
                        Hey Jack, could you send over the funding report? It would really assist us
                        in getting a clearer picture of our financial situation.{ ' ' }
                      </p>

                      <div className="btn-group">
                        <button className="approve-btn">Approve</button>
                        <button className="decline-btn">Decline</button>
                        <button className="ignore-btn">Ingnore</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User specific chat section */ }
                <div className="user-in-detail-stn" onClick={ event => event.stopPropagation() }>
                  <div className="user-detail-in-row">
                    <div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.667 15L6.66699 10L11.667 5L12.8337 6.16667L9.00033 10L12.8337 13.8333L11.667 15Z"
                          fill="#525866"
                        />
                      </svg>
                    </div>
                    <div className="d-flex flex-row gap-3">
                      <div className="user-avatar-box">
                        <img className="avatar-img" src={ mUser } alt="" />
                      </div>
                      <div className="user-detail-row">
                        <div className="user-left-row">
                          <div className="user-name-hdr font-16 lh-sm">Leslie Alexander</div>
                          <div className="user-founder font-14 lh-md">Founder of Storylane</div>
                        </div>
                      </div>
                    </div>
                    <div className="see-expand">
                      <label>See all</label>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.6548 4.16667H11.6667V2.5H17.5V8.33333H15.8333V5.34517L12.2559 8.92258L11.0774 7.74407L14.6548 4.16667ZM2.5 11.6667H4.16667V14.6548L7.74407 11.0774L8.92258 12.2559L5.34517 15.8333H8.33333V17.5H2.5V11.6667Z"
                          fill="#525866"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="chat-card">
                    <div className="receiver-chat-row">
                      <div className="rec-chat-msg">
                        Hello! Sure, I&apos;ll send over the detailed report now. Attaching it here
                      </div>
                      <div className="rec-file">
                        <label className="font-14">Q3_Asset_Details.pdf</label>
                        <span className="font-12 gray-1">2MB</span>
                      </div>
                      <div className="rec-time font-12 gray-1">9:00 AM</div>
                    </div>
                    <div className="sender-chat-row">
                      <div className="rec-chat-msg">Thank you for the details!</div>
                      <div className="user-msg-row">
                        <div className="short-name">JE</div>
                        <div className="d-flex flex-column">
                          <label className="font-16">Jack Eyere</label>
                          <span className="gray-1">jackeyere@portfolio.company</span>
                        </div>
                      </div>
                      <div className="rec-time font-12 gray-1">8:00 AM</div>
                    </div>
                  </div>
                  <div className="chat-here-row">
                    <input type="text" placeholder="Enter your message..." />
                    <div className="d-flex flex-row">
                      <button>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.9997 13.1243C14.9997 14.5688 14.4927 15.798 13.4788 16.8118C12.465 17.8257 11.2358 18.3327 9.79134 18.3327C8.3469 18.3327 7.11773 17.8257 6.10384 16.8118C5.08995 15.798 4.58301 14.5688 4.58301 13.1243V5.41602C4.58301 4.37435 4.94759 3.48893 5.67676 2.75977C6.40592 2.0306 7.29134 1.66602 8.33301 1.66602C9.37467 1.66602 10.2601 2.0306 10.9893 2.75977C11.7184 3.48893 12.083 4.37435 12.083 5.41602V12.7077C12.083 13.3466 11.8608 13.8882 11.4163 14.3327C10.9719 14.7771 10.4302 14.9993 9.79134 14.9993C9.15245 14.9993 8.61079 14.7771 8.16634 14.3327C7.7219 13.8882 7.49967 13.3466 7.49967 12.7077V4.99935H9.16634V12.7077C9.16634 12.8882 9.22537 13.0375 9.34342 13.1556C9.46148 13.2737 9.61079 13.3327 9.79134 13.3327C9.9719 13.3327 10.1212 13.2737 10.2393 13.1556C10.3573 13.0375 10.4163 12.8882 10.4163 12.7077V5.41602C10.4025 4.83268 10.1976 4.33963 9.80176 3.93685C9.40592 3.53407 8.91634 3.33268 8.33301 3.33268C7.74967 3.33268 7.25662 3.53407 6.85384 3.93685C6.45106 4.33963 6.24967 4.83268 6.24967 5.41602V13.1243C6.23579 14.1105 6.57606 14.9473 7.27051 15.6348C7.96495 16.3223 8.80523 16.666 9.79134 16.666C10.7636 16.666 11.59 16.3223 12.2705 15.6348C12.9511 14.9473 13.3052 14.1105 13.333 13.1243V4.99935H14.9997V13.1243Z"
                            fill="#525866"
                          />
                        </svg>
                      </button>
                      <button>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.0003 18.3327C8.84755 18.3327 7.76421 18.1139 6.75033 17.6764C5.73644 17.2389 4.85449 16.6452 4.10449 15.8952C3.35449 15.1452 2.76074 14.2632 2.32324 13.2493C1.88574 12.2355 1.66699 11.1521 1.66699 9.99935C1.66699 8.84657 1.88574 7.76324 2.32324 6.74935C2.76074 5.73546 3.35449 4.85352 4.10449 4.10352C4.85449 3.35352 5.73644 2.75977 6.75033 2.32227C7.76421 1.88477 8.84755 1.66602 10.0003 1.66602C11.1531 1.66602 12.2364 1.88477 13.2503 2.32227C14.2642 2.75977 15.1462 3.35352 15.8962 4.10352C16.6462 4.85352 17.2399 5.73546 17.6774 6.74935C18.1149 7.76324 18.3337 8.84657 18.3337 9.99935V11.2077C18.3337 12.0271 18.0524 12.725 17.4899 13.3014C16.9274 13.8778 16.2364 14.166 15.417 14.166C14.9309 14.166 14.4725 14.0618 14.042 13.8535C13.6114 13.6452 13.2503 13.3466 12.9587 12.9577C12.5559 13.3605 12.101 13.6625 11.5941 13.8639C11.0871 14.0653 10.5559 14.166 10.0003 14.166C8.84755 14.166 7.86491 13.7598 7.05241 12.9473C6.23991 12.1348 5.83366 11.1521 5.83366 9.99935C5.83366 8.84657 6.23991 7.86393 7.05241 7.05143C7.86491 6.23893 8.84755 5.83268 10.0003 5.83268C11.1531 5.83268 12.1357 6.23893 12.9482 7.05143C13.7607 7.86393 14.167 8.84657 14.167 9.99935V11.2077C14.167 11.5688 14.285 11.8743 14.5212 12.1243C14.7573 12.3743 15.0559 12.4993 15.417 12.4993C15.7781 12.4993 16.0767 12.3743 16.3128 12.1243C16.5489 11.8743 16.667 11.5688 16.667 11.2077V9.99935C16.667 8.13824 16.0212 6.56185 14.7295 5.27018C13.4378 3.97852 11.8614 3.33268 10.0003 3.33268C8.13921 3.33268 6.56283 3.97852 5.27116 5.27018C3.97949 6.56185 3.33366 8.13824 3.33366 9.99935C3.33366 11.8605 3.97949 13.4368 5.27116 14.7285C6.56283 16.0202 8.13921 16.666 10.0003 16.666H14.167V18.3327H10.0003ZM10.0003 12.4993C10.6948 12.4993 11.285 12.2563 11.7712 11.7702C12.2573 11.2841 12.5003 10.6938 12.5003 9.99935C12.5003 9.3049 12.2573 8.71463 11.7712 8.22852C11.285 7.7424 10.6948 7.49935 10.0003 7.49935C9.30588 7.49935 8.7156 7.7424 8.22949 8.22852C7.74338 8.71463 7.50033 9.3049 7.50033 9.99935C7.50033 10.6938 7.74338 11.2841 8.22949 11.7702C8.7156 12.2563 9.30588 12.4993 10.0003 12.4993Z"
                            fill="#525866"
                          />
                        </svg>
                      </button>

                      <button className="send-btn ms-auto">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.5 16.6673V11.6673L9.16667 10.0007L2.5 8.33398V3.33398L18.3333 10.0007L2.5 16.6673Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="vh"></div>
      <ul className="header-nav">
        <li className="nav-item dropdown">
          <a
            href="#"
            className="nav-link py-0"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="d-flex user-profile">
              <div className="avatar avatar-md">
                {profileAvatar ? (
                  <img className="avatar-img" src={ profileAvatar } alt={ AboutformData.name } />
                ) : (
                  <div className="avatar-placeholder">
                    {AboutformData.name
                      ?.split(' ')
                      .map((word) => word[0])
                      .join('')
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>
                )}
              </div>
              <div className="user-info">
                <div>
                  <b>{ AboutformData.name }</b>
                </div>
              </div>
              <div className="">
                <ProfileArrowButtonSVG />
              </div>
              <ul
                className="dropdown-menu dropdown-menu-end profile-dropdown-section"
                aria-labelledby="dropdownMenuButton"
              >
                <div className="d-flex flex-column gap-3">
                  <div className="profile-bx">
                    {profileAvatar ? (
                      <img className="avatar-img" src={ profileAvatar } alt={ AboutformData.name } />
                    ) : (
                      <div className="avatar-placeholder">
                        {AboutformData.name
                          ?.split(' ')
                          .map((word) => word[0])
                          .join('')
                          .substring(0, 2)
                          .toUpperCase()}
                      </div>
                    )}
                    <div className="user-profile-name">
                      <label>{ AboutformData.name }</label>
                      <span>Jackeyere@company.com</span>
                    </div>
                  </div>
                  <button className="view-profile-btn">View Profile</button>
                  <div className="d-flex flex-column ps-2 py-2 gap-3 setting-txt">
                    <div className="d-flex flex-row gap-2 align-items-center">
                      <span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.33982 16.9998C2.91709 16.2688 2.58848 15.4873 2.36182 14.6738C2.85512 14.4229 3.26941 14.0404 3.55885 13.5687C3.84828 13.097 4.00158 12.5544 4.00179 12.0009C4.002 11.4475 3.8491 10.9048 3.56002 10.4328C3.27094 9.96088 2.85694 9.57809 2.36382 9.32682C2.81585 7.69231 3.67655 6.19977 4.86482 4.98982C5.32891 5.29155 5.86744 5.45898 6.42079 5.4736C6.97415 5.48822 7.52077 5.34945 8.00015 5.07265C8.47952 4.79586 8.87297 4.39182 9.13694 3.90526C9.40092 3.41871 9.52512 2.8686 9.49582 2.31582C11.1379 1.89145 12.861 1.89213 14.5028 2.31782C14.4738 2.87059 14.5982 3.42061 14.8624 3.90703C15.1266 4.39345 15.5202 4.7973 15.9996 5.07388C16.4791 5.35047 17.0258 5.48901 17.5791 5.47417C18.1324 5.45934 18.6709 5.2917 19.1348 4.98982C19.7138 5.57982 20.2278 6.25082 20.6598 6.99982C21.0928 7.74882 21.4168 8.52982 21.6378 9.32582C21.1445 9.57672 20.7302 9.9592 20.4408 10.4309C20.1514 10.9027 19.9981 11.4453 19.9978 11.9987C19.9976 12.5522 20.1505 13.0949 20.4396 13.5668C20.7287 14.0388 21.1427 14.4216 21.6358 14.6728C21.1838 16.3073 20.3231 17.7999 19.1348 19.0098C18.6707 18.7081 18.1322 18.5407 17.5788 18.526C17.0255 18.5114 16.4789 18.6502 15.9995 18.927C15.5201 19.2038 15.1267 19.6078 14.8627 20.0944C14.5987 20.5809 14.4745 21.131 14.5038 21.6838C12.8617 22.1082 11.1386 22.1075 9.49682 21.6818C9.52586 21.1291 9.40141 20.579 9.13724 20.0926C8.87306 19.6062 8.47946 19.2023 7.99999 18.9258C7.52052 18.6492 6.97387 18.5106 6.42054 18.5255C5.86721 18.5403 5.32878 18.7079 4.86482 19.0098C4.27381 18.4068 3.76141 17.7314 3.33982 16.9998ZM8.99982 17.1958C10.0654 17.8105 10.8667 18.7968 11.2498 19.9658C11.7488 20.0128 12.2498 20.0138 12.7488 19.9668C13.1322 18.7977 13.9338 17.8113 14.9998 17.1968C16.065 16.5805 17.3203 16.3793 18.5248 16.6318C18.8148 16.2238 19.0648 15.7888 19.2728 15.3338C18.4522 14.4173 17.9989 13.23 17.9998 11.9998C17.9998 10.7398 18.4698 9.56282 19.2728 8.66582C19.0633 8.21097 18.8123 7.77646 18.5228 7.36782C17.3191 7.62013 16.0646 7.4193 14.9998 6.80382C13.9342 6.18919 13.133 5.20281 12.7498 4.03382C12.2508 3.98682 11.7498 3.98582 11.2508 4.03282C10.8674 5.20197 10.0658 6.18838 8.99982 6.80282C7.9346 7.41914 6.67929 7.62034 5.47482 7.36782C5.18538 7.77611 4.93495 8.21069 4.72682 8.66582C5.54739 9.58238 6.0007 10.7696 5.99982 11.9998C5.99982 13.2598 5.52982 14.4368 4.72682 15.3338C4.93629 15.7887 5.18736 16.2232 5.47682 16.6318C6.68053 16.3795 7.93502 16.5803 8.99982 17.1958ZM11.9998 14.9998C11.2042 14.9998 10.4411 14.6838 9.8785 14.1211C9.31589 13.5585 8.99982 12.7955 8.99982 11.9998C8.99982 11.2042 9.31589 10.4411 9.8785 9.8785C10.4411 9.31589 11.2042 8.99982 11.9998 8.99982C12.7955 8.99982 13.5585 9.31589 14.1211 9.8785C14.6837 10.4411 14.9998 11.2042 14.9998 11.9998C14.9998 12.7955 14.6837 13.5585 14.1211 14.1211C13.5585 14.6838 12.7955 14.9998 11.9998 14.9998ZM11.9998 12.9998C12.265 12.9998 12.5194 12.8945 12.7069 12.7069C12.8945 12.5194 12.9998 12.265 12.9998 11.9998C12.9998 11.7346 12.8945 11.4803 12.7069 11.2927C12.5194 11.1052 12.265 10.9998 11.9998 10.9998C11.7346 10.9998 11.4802 11.1052 11.2927 11.2927C11.1052 11.4803 10.9998 11.7346 10.9998 11.9998C10.9998 12.265 11.1052 12.5194 11.2927 12.7069C11.4802 12.8945 11.7346 12.9998 11.9998 12.9998Z"
                            fill="#A0A0A0"
                          />
                        </svg>
                      </span>{ ' ' }
                      Settings
                    </div>
                    <div className="d-flex flex-row gap-2 align-items-center">
                      <span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 19C12.828 19 13.5 19.672 13.5 20.5C13.5 21.328 12.828 22 12 22C11.172 22 10.5 21.328 10.5 20.5C10.5 19.672 11.172 19 12 19ZM12 2C15.314 2 18 4.686 18 8C18 10.165 17.247 11.29 15.326 12.923C13.399 14.56 13 15.297 13 17H11C11 14.526 11.787 13.305 14.031 11.399C15.548 10.11 16 9.434 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8V9H6V8C6 4.686 8.686 2 12 2Z"
                            fill="#A0A0A0"
                          />
                        </svg>
                      </span>{ ' ' }
                      Help
                    </div>
                  </div>
                  <div className="search-edit-profile">
                    <label>
                      Search and send
                      <br />
                      message to founders
                    </label>
                    <button>Edit Profile</button>
                  </div>
                </div>
              </ul>
            </div>
          </a>
        </li>
      </ul>
    </header>
  )
}
