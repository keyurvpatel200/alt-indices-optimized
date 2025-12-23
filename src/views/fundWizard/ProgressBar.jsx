export default function ProgressBar({ currentStep, totalSteps = 4 }) {
  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="fund-wizard-progress-container">
      <div className="fund-wizard-progress-bar">
        <div 
          className="fund-wizard-progress-fill" 
          style={ { width: `${progressPercentage}%` } }
        ></div>
      </div>
      {/* <div className="fund-wizard-step-indicators">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div 
            key={ index + 1 }
            className={ `fund-wizard-step-indicator ${
              index + 1 <= currentStep ? 'active' : ''
            }` }
          >
            {index + 1}
          </div>
        ))}
      </div> */}
    </div>
  )
}