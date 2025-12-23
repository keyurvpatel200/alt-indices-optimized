import { useCallback, useEffect, useState } from 'react'
import { FormGroup, Input } from 'reactstrap'

import axios from '@/service/axios'
import FundSizeDensityChart from './chart/FundSizeDensityChart'
import Skeleton from 'react-loading-skeleton'
import Step4Skeleton, { Step4ChartSkeleton } from './skeleton/Step4Skeleton'

export default function Step4({
  nextStep,
  prevStep,
  widgetData,
  setWidgetData
}) {
  const [selectedOptions, setSelectedOptions] = useState([])
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [fundSize, setFundSize] = useState([])
  const [loading, setLoading] = useState(false) // State for loading
  const [selectedPercentageType, setSelectedPercentageType] = useState('fund_percentage')
  const [fundDistribution, setFundDistribution] = useState(null)
  const [comparedFund, setComparedFund] = useState(null)
  const [titleLoader, setTitleLoader] = useState(true)
  const [chartData, setChartData] = useState({})

  const fetchSelectedOptions = useCallback(async () => {
    try {
      const response = await axios.get(`/performance-wizard/all-fund-size/?fund_id=${widgetData?.[2]?.fund_id}`)

      if (response.status === 200) {
        const fetchFundsize = response.data.fund_sizes
        const defaultFocus = response.data.fund_size_category
        setFundSize(fetchFundsize)
        if ((widgetData?.['6']?.selectedFundSize || []).length > 0) {
          setSelectedOptions(widgetData?.['6']?.selectedFundSize)
        } else {
          setSelectedOptions([defaultFocus])
        }
      }
    } catch (error) {
      console.error('Error fetching fund size options:', error)
    }
  }, [])

  const getAllFundDistributionDetail = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/performance-wizard/combined-fund/', {
        fund_id: widgetData?.['2']?.fund_id,
        asset_class: widgetData?.['3']?.asset_class ? [widgetData?.['3']?.asset_class] : [],
        vintage_year: widgetData?.['3']?.vintage_year ? +widgetData?.['3']?.vintage_year : '',
        strategies: Object.keys(widgetData?.['5']?.selectedStrategies || {}),
        primary_geographic_focus: widgetData?.['4']?.defaultLocation || []
      })
      if (response.status === 200) {
        setFundDistribution(response.data.fund_distribution)
        setComparedFund(response.data.compared_fund)
        setChartData(response.data)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error fetching fund Details:', error)
    }
  }

  useEffect(() => {
    getAllFundDistributionDetail()
  }, [])

  // Fetch fund sizes and apply pre-selection if selectedFundSize exists
  useEffect(() => {
    fetchSelectedOptions()
  }, [fetchSelectedOptions])

  // Handle checkbox changes (both for custom and other options)
  const handleCheckboxChange = e => {
    const { checked, dataset } = e.target

    const index = dataset.index // Get the index of the clicked checkbox

    let updatedSelections = [...selectedOptions]

    if (checked) {
      // If checked, add the index (or name) to the selectedOptions
      updatedSelections.push(parseInt(index))
    } else {
      // If unchecked, remove the index from selectedOptions
      updatedSelections = updatedSelections.filter(item => item !== parseInt(index))
    }

    setSelectedOptions(updatedSelections)
  }

  const handleSelectedPercentageTypeChange = event => {
    setSelectedPercentageType(event.target.value)
  }

  const handleNext = async () => {
    try {
      setIsSubmitLoading(true)
      const data = {
        fund_sizes: selectedOptions,
        fund_id: widgetData?.['2']?.fund_id,
        asset_class: widgetData?.['3']?.asset_class ? [widgetData?.['3']?.asset_class] : [],
        vintage_year: widgetData?.['3']?.vintage_year ? +widgetData?.['3']?.vintage_year : '',
        strategies: Object.keys(widgetData?.['5']?.selectedStrategies || {}),
        primary_geographic_focus: widgetData?.['4']?.defaultLocation || []
      }
      const response1 = await axios.post('/performance-wizard/update_fund_sizes/', data)

      if (response1.status === 200) {
        const data = {
          ...widgetData,
          6: {
            selectedFundSize: selectedOptions,
            ...response1.data,
            ...chartData
          },
          step: 7
        }
        setWidgetData(data)
        localStorage.setItem('widgetData', JSON.stringify(data))
        setIsSubmitLoading(false)
        nextStep()
      }
    } catch (error) {
      setIsSubmitLoading(false)
      console.error('Error during API calls:', error)
      setIsSubmitLoading(false)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setTitleLoader(false)
    }, 2000)
  }, [])

  return (
    <div className="step-out-region mt-5">
      <div className="search-section-row">
        <label className="steps-counts">
          {titleLoader ? <Skeleton width={ 80 } height={ 20 } className="mb-2" /> : '6/8 steps'}
        </label>
        <h4>
          {titleLoader ? (
            <Skeleton width={ 600 } height={ 20 } className="mb-1" />
          ) : (
            'What fund size range would you like to include in your peer group for comparison?'
          )}
        </h4>
        <p className="text-white">
          {titleLoader ? (
            <Skeleton width={ 250 } height={ 20 } className="mb-1" />
          ) : (
            <>
              <a href="#read-article" className="text-decoration-underline text-white">
                Read our article
              </a>{' '}
              to choose a better option
            </>
          )}
        </p>
      </div>
      <div className="w-100 d-flex">
        <div className="col-sm-5 d-flex flex-column">
          <div className="font-14 text-white mb-5 mt-2">
            {titleLoader ? (
              <Skeleton width={ 300 } height={ 20 } className="mb-1" />
            ) : (
              'Please select the size of benchmark peers'
            )}
          </div>
          {loading ? (
            <Step4Skeleton />
          ) : (
            <ul className="fund-size-list">
              {/* Render the options dynamically */}
              {fundSize.map((size, index) => (
                <li
                  key={ size }
                  className={ selectedOptions.includes(index) ? 'active' : '' }
                >
                  <div>
                    <span className="option-number">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <div className="option">{size}</div>
                  <div className="checkbox-content">
                    <svg height="13" width="16">
                      <path
                        d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"
                        fill="#88a4c7"
                      ></path>
                    </svg>
                  </div>
                  <FormGroup check>
                    <Input
                      name={ size }
                      type="checkbox"
                      checked={ selectedOptions.includes(index) }
                      data-index={ index }
                      onChange={ handleCheckboxChange }
                    />
                  </FormGroup>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-sm-7">
          <div className="col-sm-12 col-xxl-12 full-width">
            <div className="growth-section">
              <div className="chart-option">
                {loading && <Step4ChartSkeleton />}
                {fundDistribution && comparedFund && (
                  <div>
                    <div>
                      <fieldset>
                        <legend>
                          Check coverage by{' '}
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
                        </legend>
                        <div className="chart-label">
                          {[
                            { key: 'fund_percentage', title: 'Number of funds' },
                            { key: 'size_percentage', title: 'Invested Capital' }
                          ].map(value => (
                            <label key={ value?.key }>
                              <input
                                type="radio"
                                name="percentageType"
                                value={ value?.key }
                                checked={ selectedPercentageType === value?.key }
                                onChange={ handleSelectedPercentageTypeChange }
                              />
                              {value?.title}
                              <div className="help-i me-auto">
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.00033 17.3327C4.39795 17.3327 0.666992 13.6017 0.666992 8.99935C0.666992 4.39697 4.39795 0.666016 9.00033 0.666016C13.6027 0.666016 17.3337 4.39697 17.3337 8.99935C17.3337 13.6017 13.6027 17.3327 9.00033 17.3327ZM9.00033 15.666C12.6822 15.666 15.667 12.6813 15.667 8.99935C15.667 5.31745 12.6822 2.33268 9.00033 2.33268C5.31843 2.33268 2.33366 5.31745 2.33366 8.99935C2.33366 12.6813 5.31843 15.666 9.00033 15.666ZM8.16699 4.83268H9.83366V6.49935H8.16699V4.83268ZM8.16699 8.16602H9.83366V13.166H8.16699V8.16602Z"
                                    fill="white"
                                  />
                                </svg>
                              </div>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                    {fundDistribution && comparedFund && (
                      <FundSizeDensityChart
                        fundThresholds={ [0, 50, 250, 1000, 1500] }
                        fundDistribution={ fundDistribution }
                        comparedFund={ comparedFund }
                        selectedFundSizes={ selectedOptions }
                        selectedPercentageType={ selectedPercentageType }
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="button-row">
        <button onClick={ prevStep } className="back-btn" disabled={ isSubmitLoading || loading }>
          Back
        </button>
        <button
          onClick={ () => {
            handleNext()
          } }
          className="btn"
          disabled={ isSubmitLoading || selectedOptions.length === 0 || loading }
        >
          {isSubmitLoading ? 'Loading...' : 'Next'}
        </button>
        {selectedOptions.length === 0 ? (
          <p className="ml-2 mt-3 text-white">Select at least one option</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
