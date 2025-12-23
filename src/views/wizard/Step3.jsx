import { useCallback, useEffect, useState } from 'react'
import { FormGroup, Input } from 'reactstrap'

import axios from '@/service/axios'
import { Step2SkeletonTitle } from './skeleton/Step2Skeleton'
import Step3Skeleton from './skeleton/Step3Skeleton'

export default function Step3({
  nextStep,
  prevStep,
  widgetData,
  setWidgetData,
}) {
  const [selectedOptions, setSelectedOptions] = useState({})
  const [titleLoader, setTitleLoader] = useState(true)
  const [strategies, setStrategies] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchSelectedOptions = useCallback(async () => {
    try {
      setLoading(true) // Show loader while fetching data
      const response = await axios.get('/performance-wizard/strategy/')

      if (response.status === 200) {
        const fetchedStrategies = response.data.strategies
        setStrategies(fetchedStrategies)
        
        if (!!widgetData?.['5']?.selectedStrategies && Object.keys(widgetData?.['5']?.selectedStrategies).length > 0) {
          setSelectedOptions(widgetData?.['5']?.selectedStrategies)
        } else if (fetchedStrategies?.length > 0) {
          let data = {}
          fetchedStrategies.forEach(strategy => {
            data[strategy] = true
          })
          setSelectedOptions(data)
        }
        setLoading(false)
      }
    } catch (error) {
      console.log('error',error)
      setLoading(false)
    }
  }, [])

  // Fetch strategies and apply pre-selection if selectedStrategies exist
  useEffect(() => {
    fetchSelectedOptions()
  }, [fetchSelectedOptions])

  const handleCheckboxChange = e => {
    const { name, checked } = e.target

    const updatedSelections = { ...selectedOptions }

    if (checked) {
      updatedSelections[name] = true
    } else {
      delete updatedSelections[name]
    }

    setSelectedOptions(updatedSelections)
  }

  const handleNext = () => {
    const data = {
      ...widgetData,
      5: {
        selectedStrategies: selectedOptions
      },
      step: 6
    }
    setWidgetData(data)
    localStorage.setItem('widgetData', JSON.stringify(data))
    // strategies: Object.keys(selectedOptions)
    nextStep()
  }

  useEffect(() => {
    setTimeout(() => {
      setTitleLoader(false)
    }, 2000)
  }, [])

  return (
    <div className="step-out-region mt-5">
      {titleLoader ? (
        <Step2SkeletonTitle />
      ) : (
        <div className="search-section-row">
          <label className="steps-counts">5/8 steps</label>
          <h4>What sub-strategy would you prefer your peer group to follow?</h4>
        </div>
      )}

      {/* Show loader while fetching data */}
      {loading ? (
        <ul className="sub-strategy">
          <Step3Skeleton />
        </ul>
      ) : (
        <ul className="sub-strategy">
          {strategies.map((strategy, index) => {
            return (
              <li
                key={ strategy }
                className={ selectedOptions[strategy] ? 'active' : '' }
              >
                <div>
                  <span className="option-number">{index + 1}</span>
                </div>
                <div className="option">{strategy}</div>
                <div className="help-i me-auto">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0003 18.3327C5.39795 18.3327 1.66699 14.6017 1.66699 9.99935C1.66699 5.39697 5.39795 1.66602 10.0003 1.66602C14.6027 1.66602 18.3337 5.39697 18.3337 9.99935C18.3337 14.6017 14.6027 18.3327 10.0003 18.3327ZM10.0003 16.666C13.6822 16.666 16.667 13.6813 16.667 9.99935C16.667 6.31745 13.6822 3.33268 10.0003 3.33268C6.31843 3.33268 3.33366 6.31745 3.33366 9.99935C3.33366 13.6813 6.31843 16.666 10.0003 16.666ZM9.16699 5.83268H10.8337V7.49935H9.16699V5.83268ZM9.16699 9.16602H10.8337V14.166H9.16699V9.16602Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="checkbox-content">
                  <div className="white-dot"></div>
                  <span>
                    <svg height="13" width="16">
                      <path
                        d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"
                        fill="#88a4c7"
                      ></path>
                    </svg>
                  </span>
                </div>
                <FormGroup check>
                  <Input
                    name={ strategy }
                    type="checkbox"
                    checked={ selectedOptions[strategy] }
                    onChange={ handleCheckboxChange }
                  />
                </FormGroup>
              </li>
            )
          })}
        </ul>
      )}

      <div className="button-row">
        <button onClick={ prevStep } className="back-btn" disabled={ loading }>
          Back
        </button>
        <button
          onClick={ () => {
            handleNext()
          } }
          className="btn"
          disabled={ Object.keys(selectedOptions).length === 0 || loading }
        >
          Next
        </button>
        {Object.keys(selectedOptions).length === 0 ? (
          <p className="ml-2 mt-3 text-white">Select at least one option</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
