import AboutImg from '../../../assets/landing/contain.svg'

export default function AboutUs () {
  return (
    <div className="about-wrapper">
      <div className="container">
        <div className="cover-img">
          <img src={ AboutImg } alt="company"/>
        </div>
        <div className="about-contain">
          <h3>The Benchmarking Dilemma</h3>
          <p>
            Unlike public markets that often rely on benchmarks like the S&P500,
            the private market lacks standardized benchmarks. This poses a
            significant challenge for investors as they seek clarity in the
            performance of venture capital and private equity investments. </p>
          <p>
            Make informed investment decisions with Alt Indices by your side.
            Our platform is designed to help you effectively address key
            questions and seamlessly convert information into investor
            confidence. </p>
          <p className="bold large-font">
            “Due to non-standardized benchmarking, modest variation in
            methodology can result in half of all the funds being able to claim
            top quartile results”. </p>
          <p className="bold small-font">
            - ‘Are Too Many Private Equity Funds Top Quartile?’ Journal of
            Applied Corporate Finance. </p>
        </div>
      </div>
    </div>
  )
}