import congrats from '../../../assets/images/congrates.svg'

export default function Congratulation () {
  return (
    <div className="congrates-wrap">
      <img src={ congrats } alt="google" width={ 123 } height={ 110 }/>
      <h3 className="welcome-text">Congratulations!</h3>
      <p className="description">Your request is successfully submitted!! <br></br>
        our team will contact you soon.</p>
    </div>
  )
}