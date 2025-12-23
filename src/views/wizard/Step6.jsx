import { useEffect, useState } from 'react'

import axios from '@/service/axios'
import { FormGroup, Input } from 'reactstrap'
import { Step2SkeletonTitle } from './skeleton/Step2Skeleton'
import Skeleton from 'react-loading-skeleton'
import Step6Skeleton from './skeleton/Step6Skeleton'

export default function Step6({ nextStep, prevStep, widgetData, setWidgetData }) {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [titleLoader, setTitleLoader] = useState(true)
  const [step6Data, setStep6Data] = useState({
    benchmark_name: '',
    benchmark_privacy: '',
    benchmark_frequency: '',
    tags: []
  })

  const handleNext = () => {
    try {
      const data = {
        ...widgetData,
        ['8'] : step6Data,
        step:8
      }

      const updatedData = {
        fund_id: data?.['2']?.fund_id,
        firm_id: data?.['2']?.firm,
        asset_class: data?.['3']?.asset_class === 'Venture Capital' ? '1' : data?.['3']?.asset_class === 'Private Equity' ? '2' : '',
        vintage_year: +data?.['3']?.vintage_year || '',
        fund_sizes: data?.['6']?.selectedFundSize || [],
        custom_size_min: +data?.['6']?.custom_size_min || 0,
        custom_size_max: +data?.['6']?.custom_size_max || 0,
        benchmark_name: data?.['8']?.benchmark_name || '',
        benchmark_constituents: data?.['6']?.benchmark_constituents || [],
        outliers_method: data?.['7']?.type,
        total_fund: data?.['6']?.total_fund || 0,
        benchmark_privacy: data?.['8']?.benchmark_privacy || '',
        benchmark_frequency: data?.['8']?.benchmark_frequency || '',
        tags:data?.['8']?.tags || [],
        fund_distribution: data?.['6']?.fund_distribution || [],
        selected_fund: data?.['6']?.selected_fund ? data?.['6']?.selected_fund : {
          selected_fund_sizes_range: '',
          selected_fund_kde_values: ''
        },
        compared_fund: data?.['6']?.compared_fund || [],
        strategy: Object.keys(data?.['5']?.selectedStrategies || {}) || [],
        primary_geographic_focus: data?.['4']?.defaultLocation || []
      }
      
      setWidgetData(data)
      localStorage.setItem('widgetData', JSON.stringify(data))
      setLoading(true)
      
      axios
        .post('/performance-wizard/atomic/save-to-benchmark/', {
          ...updatedData,
        })
        .then(() => {
          nextStep()
          //localStorage.removeItem('widgetData')
          setLoading(false)
        })
        .catch(error => {
          setLoading(false)
          console.error('Error updating strategies:', error)
        })
    } catch (error) {
      console.error('Error updating selected options:', error)
    }
  }

  // Handle input change
  const handleInputChange = e => {
    setInputValue(e.target.value)
  }

  // Handle Enter key press to add tag
  const handleKeyPress = e => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setStep6Data({
        ...step6Data,
        tags: [...new Set([...(step6Data?.tags || []), inputValue?.trim()])] // Add unique tag
      })
      setInputValue('') // Clear the input field
    }
  }
  // Handle tag deletion
  const handleDelete = index => {
    setStep6Data({ ...step6Data, tags: step6Data?.tags?.filter((_, i) => i !== index) }) // Remove the tag by index
  }

  useEffect(() => {
    if (Object.keys(widgetData)?.length > 0 && widgetData?.['8']) {
      setStep6Data(widgetData?.['8'])
    }
    setTimeout(() => {
      setTitleLoader(false)
    }, 2000)
  }, [])
  return (
    <div className="step-out justify-content-start align-items-center mt-5">
      <div className="card-layer-row">
        <div className="d-flex col-sm-12 d-flex flex-column">
          {titleLoader ? (
            <Step2SkeletonTitle />
          ) : (
            <div className="search-section-row">
              <label className="steps-counts">7/8 steps</label>
              <h4>What would you like to name this benchmark?</h4>
            </div>
          )}
          {titleLoader ? (
            <Skeleton width={ 600 } height={ 40 } />
          ) : (
            <input
              className="search-box"
              type="text"
              value={ step6Data?.benchmark_name }
              onChange={ e => setStep6Data({ ...step6Data, benchmark_name: e?.target?.value }) }
              placeholder="Name of benchmark"
            />
          )}
          <div className="multiple-table-points">
            <h4 className="justify-content-start align-items-center mb-2 text-white d-flex font-14">
              {titleLoader ? (
                <Skeleton width={ 300 } height={ 20 } />
              ) : (
                'Who should this benchmark be visible to?'
              )}
              <span className="help-icon">
                {titleLoader ? (
                  <Skeleton width={ 20 } height={ 20 } circle={ true } />
                ) : (
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
                )}
              </span>
            </h4>
            {titleLoader ? (
              <Skeleton width={ 600 } height={ 100 } />
            ) : (
              <div className="grid-col">
                <div className="grid-header-row">Only Me</div>
                <div className="grid-header-row">Only persons within the same fund</div>
                <div className="grid-header-row">Only persons within the same firm</div>

                <div className="grid-item-row">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      onChange={ () => setStep6Data({ ...step6Data, benchmark_privacy: 'Only Me' }) }
                      checked={ step6Data?.benchmark_privacy === 'Only Me' }
                      type="radio"
                      name="radioGroup1"
                      id="radio1"
                    />
                  </div>
                </div>
                <div className="grid-item-row">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      onChange={ () =>
                        setStep6Data({
                          ...step6Data,
                          benchmark_privacy: 'Only persons within the same fund'
                        })
                      }
                      checked={ step6Data?.benchmark_privacy === 'Only persons within the same fund' }
                      type="radio"
                      name="radioGroup2"
                      id="radio2"
                    />
                  </div>
                </div>
                <div className="grid-item-row">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      onChange={ () =>
                        setStep6Data({
                          ...step6Data,
                          benchmark_privacy: 'Only persons within the same firm'
                        })
                      }
                      checked={ step6Data?.benchmark_privacy === 'Only persons within the same firm' }
                      type="radio"
                      name="radioGroup3"
                      id="radio3"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          {titleLoader ? (
            <Step6Skeleton />
          ) : (
            <ul className="sub-strategy row-sub-strategy-list">
              {['Monthly', 'Quaterly', 'Annually'].map(strategy => {
                return (
                  <li
                    key={ strategy }
                    className={ step6Data?.benchmark_frequency === strategy ? 'active' : '' }
                  >
                    <div className="option">{strategy}</div>
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
                        checked={ step6Data?.benchmark_frequency === strategy }
                        onChange={ () =>
                          setStep6Data({ ...step6Data, benchmark_frequency: strategy })
                        }
                      />
                    </FormGroup>
                  </li>
                )
              })}
            </ul>
          )}
          <div className="list-points">
            <h4 className="justify-content-start align-items-center mb-2 text-white d-flex font-14">
              {titleLoader ? (
                <Skeleton width={ 320 } height={ 20 } />
              ) : (
                'Select or add tags to categorize this benchmark'
              )}
            </h4>
            {titleLoader ? (
              <Skeleton width={ 600 } height={ 150 } />
            ) : (
              <div className="two-grid-data">
                <div className="added-item">
                  {step6Data?.tags?.map((tag, index) => (
                    <div key={ index } className="tag-i">
                      {tag}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={ () => handleDelete(index) }
                      >
                        <path
                          d="M10.0006 8.82208L14.1254 4.69727L15.3039 5.87577L11.1791 10.0006L15.3039 14.1253L14.1254 15.3038L10.0006 11.1791L5.87578 15.3038L4.69727 14.1253L8.82207 10.0006L4.69727 5.87577L5.87578 4.69727L10.0006 8.82208Z"
                          fill="#88A4C7"
                        />
                      </svg>
                    </div>
                  ))}
                </div>
                <div className="add-input-tag">
                  <input
                    type="text"
                    placeholder="Type to add new tags"
                    value={ inputValue }
                    onChange={ handleInputChange }
                    onKeyDown={ handleKeyPress }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="button-row">
        <button onClick={ prevStep } className="back-btn" disabled={ loading }>
          Back
        </button>
        <button
          onClick={ () => {
            handleNext()
          } }
          disabled={
            !step6Data?.benchmark_name ||
            step6Data?.tags?.length === 0 ||
            !step6Data?.benchmark_privacy ||
            !step6Data?.benchmark_frequency ||
            loading
          }
          className="btn"
        >
          {loading ? 'Loading...' : 'Next'}
        </button>
      </div>
    </div>
  )
}
