import { useEffect } from 'react'
import mUser from '../../assets/m-user.png'
import mUserOne from '../../assets/m-user-1.png'
import mUserTwo from '../../assets/m-user-2.png'

export default function Chat () {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const lunchBtn = document.querySelector('.chat-section')
    const hideSidebar = document.querySelector('.sidebar-hide')

    if (lunchBtn) {
      lunchBtn.style.display = 'none'
    }
    if (hideSidebar) {
      hideSidebar.classList.add('chat-wrap')
    }

    return () => {
      document.body.style.overflow = 'auto'
      if (lunchBtn) {
        lunchBtn.style.display = 'flex'
      }
      if (hideSidebar) {
        hideSidebar.classList.remove('chat')
      }
    }
  }, [])

  return (
    <div className="chat-messages-wrap">
      <div className="chat-list-section">
        <div className="user-chat-search">
          <div className="user-search-row">
            <input type="text" placeholder="Search"/>
            <span className="search-icon">
              <svg width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M9.25 2.5C12.976 2.5 16 5.524 16 9.25C16 12.976 12.976 16 9.25 16C5.524 16 2.5 12.976 2.5 9.25C2.5 5.524 5.524 2.5 9.25 2.5ZM9.25 14.5C12.1502 14.5 14.5 12.1502 14.5 9.25C14.5 6.349 12.1502 4 9.25 4C6.349 4 4 6.349 4 9.25C4 12.1502 6.349 14.5 9.25 14.5ZM15.6137 14.5532L17.7355 16.6742L16.6742 17.7355L14.5532 15.6137L15.6137 14.5532Z"
                  fill="#525866"/>
              </svg>
            </span>
          </div>
          <div className="option--filter">
            <svg width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M6 14C5.45 14 4.97917 13.8042 4.5875 13.4125C4.19583 13.0208 4 12.55 4 12C4 11.45 4.19583 10.9792 4.5875 10.5875C4.97917 10.1958 5.45 10 6 10C6.55 10 7.02083 10.1958 7.4125 10.5875C7.80417 10.9792 8 11.45 8 12C8 12.55 7.80417 13.0208 7.4125 13.4125C7.02083 13.8042 6.55 14 6 14ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM18 14C17.45 14 16.9792 13.8042 16.5875 13.4125C16.1958 13.0208 16 12.55 16 12C16 11.45 16.1958 10.9792 16.5875 10.5875C16.9792 10.1958 17.45 10 18 10C18.55 10 19.0208 10.1958 19.4125 10.5875C19.8042 10.9792 20 11.45 20 12C20 12.55 19.8042 13.0208 19.4125 13.4125C19.0208 13.8042 18.55 14 18 14Z"
                fill="#5F6368"/>
            </svg>
          </div>
        </div>
        <div className="list-of-chat-user-row">
          {/* Only text  */ }
          <div className="col-sm-12 msg-blk-col">
            <div className="user-name-row">
              <div className="user-avatar-box">
                <img className="avatar-img" src={ mUser } alt=""/>
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
              Hi Jack, just a quick reminder. Please check the attachment from
              Lassie. Thanks in advance.
            </div>
          </div>

          {/* Email Address Attached  */ }
          <div className="col-sm-12 msg-blk-col">
            <div className="user-name-row">
              <div className="user-avatar-box">
                <img className="avatar-img" src={ mUserOne } alt=""/>
              </div>
              <div className="user-detail-row">
                <div className="user-left-row">
                  <div className="user-name-hdr">Annette Black</div>
                  <div className="user-founder">Founder of Storylane</div>
                </div>
                <div className="msg-time-duration">
                  <span>
                    <svg width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.7015 11.3201L10.7605 12.3791L17.11 6.02962L18.1705 7.09012L10.7605 14.5001L5.9875 9.72712L7.048 8.66663L8.64175 10.2604L9.7015 11.3194V11.3201ZM9.703 9.19913L13.417 5.48438L14.4745 6.54187L10.7605 10.2566L9.703 9.19913ZM7.58275 13.4404L6.523 14.5001L1.75 9.72712L2.8105 8.66663L3.87025 9.72638L3.8695 9.72712L7.58275 13.4404Z"
                        fill="#525866"/>
                    </svg>
                  </span>{ ' ' }
                  1h ago
                </div>
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
                <img className="avatar-img" src={ mUserTwo } alt=""/>
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
                <svg width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 6.66602V17.4937C17.5 17.9578 17.1293 18.3327 16.6722 18.3327H3.32783C2.87079 18.3327 2.5 17.9627 2.5 17.5062V2.49252C2.5 2.04544 2.87392 1.66602 3.33518 1.66602H12.4973L17.5 6.66602ZM15.8333 7.49935H11.6667V3.33268H4.16667V16.666H15.8333V7.49935Z"
                    fill="#1D2939"/>
                </svg>
              </div>
              <div className="d-flex flex-column">
                <label className="font-16 dark-black lh-sm">
                  Q3_Asset_Details.pdf
                </label>
                <span className="font-14 gray-1 lh-sm">2MB</span>

                <div className="dot"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-message-card">
        <div className="user-in-detail-stn">
          <div className="user-detail-in-row">
            <div className="d-flex flex-row gap-3">
              <div className="user-avatar-box">
                <img className="avatar-img" src={ mUser } alt=""/>
              </div>
              <div className="user-detail-row">
                <div className="user-left-row">
                  <div className="user-name-hdr font-16 lh-sm">
                    Leslie Alexander
                  </div>
                  <div className="user-founder font-14 lh-md">
                    Founder of Storylane
                  </div>
                </div>
              </div>
            </div>
            <div className="see-expand">
              <svg width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M4.99967 11.6654C4.54134 11.6654 4.14898 11.5022 3.82259 11.1758C3.4962 10.8494 3.33301 10.457 3.33301 9.9987C3.33301 9.54036 3.4962 9.148 3.82259 8.82161C4.14898 8.49523 4.54134 8.33203 4.99967 8.33203C5.45801 8.33203 5.85037 8.49523 6.17676 8.82161C6.50315 9.148 6.66634 9.54036 6.66634 9.9987C6.66634 10.457 6.50315 10.8494 6.17676 11.1758C5.85037 11.5022 5.45801 11.6654 4.99967 11.6654ZM9.99967 11.6654C9.54134 11.6654 9.14898 11.5022 8.82259 11.1758C8.4962 10.8494 8.33301 10.457 8.33301 9.9987C8.33301 9.54036 8.4962 9.148 8.82259 8.82161C9.14898 8.49523 9.54134 8.33203 9.99967 8.33203C10.458 8.33203 10.8504 8.49523 11.1768 8.82161C11.5031 9.148 11.6663 9.54036 11.6663 9.9987C11.6663 10.457 11.5031 10.8494 11.1768 11.1758C10.8504 11.5022 10.458 11.6654 9.99967 11.6654ZM14.9997 11.6654C14.5413 11.6654 14.149 11.5022 13.8226 11.1758C13.4962 10.8494 13.333 10.457 13.333 9.9987C13.333 9.54036 13.4962 9.148 13.8226 8.82161C14.149 8.49523 14.5413 8.33203 14.9997 8.33203C15.458 8.33203 15.8504 8.49523 16.1768 8.82161C16.5031 9.148 16.6663 9.54036 16.6663 9.9987C16.6663 10.457 16.5031 10.8494 16.1768 11.1758C15.8504 11.5022 15.458 11.6654 14.9997 11.6654Z"
                  fill="#5F6368"/>
              </svg>
            </div>
          </div>
          <div className="chat-card">
            <div className="receiver-chat-row">
              <div className="rec-chat-msg">
                Hello! Sure, I&apos;ll send over the detailed report now. Attaching
                it here
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
            <input type="text" placeholder="Enter your message..."/>
            <div className="d-flex flex-row">
              <button>
                <svg width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.9997 13.1243C14.9997 14.5688 14.4927 15.798 13.4788 16.8118C12.465 17.8257 11.2358 18.3327 9.79134 18.3327C8.3469 18.3327 7.11773 17.8257 6.10384 16.8118C5.08995 15.798 4.58301 14.5688 4.58301 13.1243V5.41602C4.58301 4.37435 4.94759 3.48893 5.67676 2.75977C6.40592 2.0306 7.29134 1.66602 8.33301 1.66602C9.37467 1.66602 10.2601 2.0306 10.9893 2.75977C11.7184 3.48893 12.083 4.37435 12.083 5.41602V12.7077C12.083 13.3466 11.8608 13.8882 11.4163 14.3327C10.9719 14.7771 10.4302 14.9993 9.79134 14.9993C9.15245 14.9993 8.61079 14.7771 8.16634 14.3327C7.7219 13.8882 7.49967 13.3466 7.49967 12.7077V4.99935H9.16634V12.7077C9.16634 12.8882 9.22537 13.0375 9.34342 13.1556C9.46148 13.2737 9.61079 13.3327 9.79134 13.3327C9.9719 13.3327 10.1212 13.2737 10.2393 13.1556C10.3573 13.0375 10.4163 12.8882 10.4163 12.7077V5.41602C10.4025 4.83268 10.1976 4.33963 9.80176 3.93685C9.40592 3.53407 8.91634 3.33268 8.33301 3.33268C7.74967 3.33268 7.25662 3.53407 6.85384 3.93685C6.45106 4.33963 6.24967 4.83268 6.24967 5.41602V13.1243C6.23579 14.1105 6.57606 14.9473 7.27051 15.6348C7.96495 16.3223 8.80523 16.666 9.79134 16.666C10.7636 16.666 11.59 16.3223 12.2705 15.6348C12.9511 14.9473 13.3052 14.1105 13.333 13.1243V4.99935H14.9997V13.1243Z"
                    fill="#525866"/>
                </svg>
              </button>
              <button>
                <svg width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.0003 18.3327C8.84755 18.3327 7.76421 18.1139 6.75033 17.6764C5.73644 17.2389 4.85449 16.6452 4.10449 15.8952C3.35449 15.1452 2.76074 14.2632 2.32324 13.2493C1.88574 12.2355 1.66699 11.1521 1.66699 9.99935C1.66699 8.84657 1.88574 7.76324 2.32324 6.74935C2.76074 5.73546 3.35449 4.85352 4.10449 4.10352C4.85449 3.35352 5.73644 2.75977 6.75033 2.32227C7.76421 1.88477 8.84755 1.66602 10.0003 1.66602C11.1531 1.66602 12.2364 1.88477 13.2503 2.32227C14.2642 2.75977 15.1462 3.35352 15.8962 4.10352C16.6462 4.85352 17.2399 5.73546 17.6774 6.74935C18.1149 7.76324 18.3337 8.84657 18.3337 9.99935V11.2077C18.3337 12.0271 18.0524 12.725 17.4899 13.3014C16.9274 13.8778 16.2364 14.166 15.417 14.166C14.9309 14.166 14.4725 14.0618 14.042 13.8535C13.6114 13.6452 13.2503 13.3466 12.9587 12.9577C12.5559 13.3605 12.101 13.6625 11.5941 13.8639C11.0871 14.0653 10.5559 14.166 10.0003 14.166C8.84755 14.166 7.86491 13.7598 7.05241 12.9473C6.23991 12.1348 5.83366 11.1521 5.83366 9.99935C5.83366 8.84657 6.23991 7.86393 7.05241 7.05143C7.86491 6.23893 8.84755 5.83268 10.0003 5.83268C11.1531 5.83268 12.1357 6.23893 12.9482 7.05143C13.7607 7.86393 14.167 8.84657 14.167 9.99935V11.2077C14.167 11.5688 14.285 11.8743 14.5212 12.1243C14.7573 12.3743 15.0559 12.4993 15.417 12.4993C15.7781 12.4993 16.0767 12.3743 16.3128 12.1243C16.5489 11.8743 16.667 11.5688 16.667 11.2077V9.99935C16.667 8.13824 16.0212 6.56185 14.7295 5.27018C13.4378 3.97852 11.8614 3.33268 10.0003 3.33268C8.13921 3.33268 6.56283 3.97852 5.27116 5.27018C3.97949 6.56185 3.33366 8.13824 3.33366 9.99935C3.33366 11.8605 3.97949 13.4368 5.27116 14.7285C6.56283 16.0202 8.13921 16.666 10.0003 16.666H14.167V18.3327H10.0003ZM10.0003 12.4993C10.6948 12.4993 11.285 12.2563 11.7712 11.7702C12.2573 11.2841 12.5003 10.6938 12.5003 9.99935C12.5003 9.3049 12.2573 8.71463 11.7712 8.22852C11.285 7.7424 10.6948 7.49935 10.0003 7.49935C9.30588 7.49935 8.7156 7.7424 8.22949 8.22852C7.74338 8.71463 7.50033 9.3049 7.50033 9.99935C7.50033 10.6938 7.74338 11.2841 8.22949 11.7702C8.7156 12.2563 9.30588 12.4993 10.0003 12.4993Z"
                    fill="#525866"/>
                </svg>
              </button>
              <button className="send-btn ms-auto">
                <svg width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 16.6673V11.6673L9.16667 10.0007L2.5 8.33398V3.33398L18.3333 10.0007L2.5 16.6673Z"
                    fill="white"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}