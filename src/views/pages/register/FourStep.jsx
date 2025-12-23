import { useEffect, useState } from 'react'

import axios from '@/service/axios'
import company from '../../../assets/images/clarity_building-line.png'
import mNumber from '../../../assets/images/akar-icons_mobile-device.png'
import email from '../../../assets/images/ic_twotone-alternate-email.png'
import address from '../../../assets/images/akar-icons_location.png'

export default function FourStep () {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    axios.get('/user-details/')
      .then(response => {
        setUserData(response.data)
      })
  }, [])

  return (
    <div className="grid-container">
      <div className="grid-item">
        <ul>
          <li className="icon"><img src={ company } alt="company"/></li>
          <li className="name">Company</li>
          <li className="e-dtl">{ userData?.company_name }</li>
        </ul>
      </div>
      <div className="grid-item">
        <ul>
          <li className="icon"><img src={ address } alt="company"/></li>
          <li className="name">Address</li>
          <li className="e-dtl">{ userData?.state }</li>
        </ul>
      </div>
      <div className="grid-item">
        <ul>
          <li className="icon"><img src={ mNumber } alt="company"/></li>
          <li className="name">Phone Number</li>
          <li className="e-dtl">{ userData?.phone_number }</li>
        </ul>
      </div>
      {/* <div className="grid-item">
                <ul>
                    <li className='icon'><img src={address} alt="company" /></li>
                    <li className='name'>Zip Code</li>
                    <li className='e-dtl'>987 655</li>
                </ul>
            </div> */ }
      <div className="grid-item">
        <ul>
          <li className="icon"><img src={ email } alt="company"/></li>
          <li className="name">Email</li>
          <li className="e-dtl">{ userData?.email }</li>
        </ul>
      </div>
      <div className="grid-item">
        <ul>
          <li className="icon"><img src={ address } alt="company"/></li>
          <li className="name">Country</li>
          <li className="e-dtl">{ userData?.country }</li>
        </ul>
      </div>
    </div>
  )
}