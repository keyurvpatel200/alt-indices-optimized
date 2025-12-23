import logo1 from '../../../assets/landing/logo1.png'
import logo2 from '../../../assets/landing/logo2.png'
import logo3 from '../../../assets/landing/logo3.png'
import logo4 from '../../../assets/landing/logo4.png'

export default function Client () {

  return (
    <div className="client-wrapper">
      <div className="container">
        <ul>
          <li><img src={ logo1 } alt="company"/></li>
          <li><img src={ logo2 } alt="company"/></li>
          <li><img src={ logo3 } alt="company"/></li>
          <li><img src={ logo4 } alt="company"/></li>
        </ul>
      </div>
    </div>
  )
}