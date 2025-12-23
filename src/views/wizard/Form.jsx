import { useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import NewStep2 from './NewStep2'
import Step6 from './Step6'
import Step7 from './Step7'
import Step8 from './Step8'

export default function Form({ step, setStep, setModal, setWidgetData, widgetData }) {

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
    localStorage.setItem('widgetData', JSON.stringify({ ...widgetData, step: step - 1 }))
  }

  const getShowComponent = (value) => {
    if (value === 0) {
      return (
        <Step7
          key='step7'
          nextStep={ nextStep }
          widgetData={ widgetData }
          setWidgetData={ setWidgetData }
        />
      )
    } else if (value === 1) {
      return (
        <Step1
          key='step1'
          nextStep={ nextStep }
          widgetData={ widgetData }
          setWidgetData={ setWidgetData }
        />
      )
    } else if (value === 2) {
      return (
        <NewStep2
          key='step2'
          nextStep={ nextStep }
          prevStep={ prevStep }
          widgetData={ widgetData }
          setWidgetData={ setWidgetData }
        />
      )
    } else if (value === 3) {
      return (
        <Step2
          key='step3'
          nextStep={ nextStep }
          prevStep={ prevStep }
          widgetData={ widgetData }
          setWidgetData={ setWidgetData }
        />
      )
    } else if (value === 4) {
      return (
        <Step3
          key='step4'
          nextStep={ nextStep }
          prevStep={ prevStep }
          widgetData={ widgetData }
          setWidgetData={ setWidgetData }
        />
      )
    } else if (value === 5) {
      return (
        <Step4
          key='step5'
          nextStep={ nextStep }
          prevStep={ prevStep }
          widgetData={ widgetData }
          setWidgetData={ setWidgetData }
        />
      )
    } else if (value === 6) {
      return (
        <Step5
          key='step5'
          prevStep={ prevStep }
          nextStep={ nextStep }
          widgetData={ widgetData }
          setWidgetData={ setWidgetData }
        />
      )
    } else if (value === 7) {
      return (
        <Step6
          key='step6'
          prevStep={ prevStep }
          nextStep={ nextStep }
          widgetData={ widgetData }
          setWidgetData={ setWidgetData }
        />
      )

    } else if (value === 8) {
      return (
        <Step8 key='step8' type={ widgetData?.['7']?.type } prevStep={ prevStep } setModal={ setModal } />
      )
    }
  }

  useEffect(()=>{
    const storedWidgetData = JSON.parse(localStorage.getItem('widgetData'))
    if (Object.keys(storedWidgetData || {}).length !== 0) {
      setWidgetData(storedWidgetData)
      setStep(storedWidgetData?.step || 1)
    }
  },[])

  return (
    <TransitionGroup>
      <CSSTransition key={ step } timeout={ 300 } classNames='fade' mountOnEnter unmountOnExit>
        {getShowComponent(step - 1)}
      </CSSTransition>
    </TransitionGroup>
  )
}
