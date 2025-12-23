// ...existing code...
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import './ProgressBar.css'

export default function Form({ step, setStep, setModal }) {

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const getShowComponent = (value) => {
    switch (value) {
      case 1:
        return <Step1 key='step1' nextStep={ nextStep } prevStep={ prevStep } />
      case 2:
        return <Step2 key='step2' nextStep={ nextStep } prevStep={ prevStep } />
      case 3:
        return <Step3 key='step3' nextStep={ nextStep } prevStep={ prevStep } />
      case 4:
        return <Step4 key='step4' nextStep={ nextStep } prevStep={ prevStep } setModal={ setModal } />
      default:
        return <Step1 key='step1' nextStep={ nextStep } prevStep={ prevStep } />
    }
  }

  return (
    <div>
      <TransitionGroup>
        <CSSTransition key={ step } timeout={ 300 } classNames='fade' mountOnEnter unmountOnExit>
          {getShowComponent(step)}
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}