import LockSVG from 'icons/Lock.svg'
import InstagramSVG from 'icons/Instagram.svg'
import NotificationSVG from 'icons/Notification.svg'
import DeleteSVG from 'icons/Delete.svg'

function Sidebar (props) {
  return (
    <div className="profile-menu-bar card">
      <ul className="profile-menu">
        <li>
          <a href="#change-password" className={ props.activeTab === 1 && 'active' }
            onClick={ () => props.setActiveTab(1) }><span><LockSVG/> </span> Change Password</a>
        </li>
        <li>
          <a href="#portfolio" className={ props.activeTab === 2 && 'active' }
            onClick={ () => props.setActiveTab(2) }><span><NotificationSVG/></span> Portfolio
            Account</a>
        </li>
        <li>
          <a href="#document" className={ props.activeTab === 3 && 'active' }
            onClick={ () => props.setActiveTab(3) }><span><InstagramSVG/></span> Document</a>
        </li>
        <li>
          <a href="#delete-account"><span><DeleteSVG/></span> Delete account</a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar