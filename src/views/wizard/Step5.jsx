import { useEffect, useState } from 'react'

import axios from '@/service/axios'
import OutliersChart from './chart/OutliersChart/OutliersChart'
import Layout from './chart/OutliersChart/Layout/Layout'
import { Step2SkeletonTitle } from './skeleton/Step2Skeleton'
import {
  Step5OutliersChartSkeleton,
  Step5OutliersSkeleton,
  Step5OutliersTableSkeleton,
  Step5SkeletonChart
} from './skeleton/Step5Skeleton'
import Skeleton from 'react-loading-skeleton'
import { FormControlLabel, Switch } from '@mui/material'

const { LeftSide, RightSide } = Layout

export default function Step5({ nextStep, prevStep, widgetData, setWidgetData }) {
  const [funds, setFunds] = useState(null)
  const [outliers, setOutliers] = useState(null)
  const [contourLines, setContourLines] = useState(null)
  const [enableContour, setEnableContour] = useState(true)
  const [titleLoader, setTitleLoader] = useState(true)
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('')

  const fetchMinMaxValues = async () => {
    try {
      setLoading(true)
      setType(widgetData?.['7']?.type)
      const response = await axios.post('/performance-wizard/bubble-chart_v1/', {
        asset_class: widgetData?.['3']?.asset_class ? [widgetData?.['3']?.asset_class] : [],
        vintage_year: widgetData?.['3']?.vintage_year ? +widgetData?.['3']?.vintage_year : '',
        strategies: Object.keys(widgetData?.['5']?.selectedStrategies || {}),
        primary_geographic_focus: widgetData?.['4']?.defaultLocation || [],
        unselected_countries: widgetData?.['4']?.step2Data?.unselected_countries?.map((d)=>d?.name) || [],
        custom_size_min: widgetData?.['6']?.custom_size_min || 0,
        custom_size_max: widgetData?.['6']?.custom_size_max || 0,
        fund_id: widgetData?.['2']?.fund_id,
      })
      if (response.status === 200) {
        setFunds(response.data.funds)
        setLoading(false)
        setOutliers(response.data.outliers)
        setContourLines(response.data.contour_lines)
      }
    } catch (error) {
      setLoading(false)
      console.log('Error fetching min-max values:', error)
    }
  }

  function handleNext() {
    const data = {
      ...widgetData,
      '7': {
        type: type,
        outliers_ids: outliers?.map(outlier => outlier?.fund_id) || []
      },
      step:8
    }
    setWidgetData(data)
    localStorage.setItem('widgetData', JSON.stringify(data))
    nextStep()
  }
  // Call the fetch function when the component mounts
  useEffect(() => {
    fetchMinMaxValues()
    setTimeout(() => {
      setTitleLoader(false)
    }, 2000)
  }, [])

  return (
    <div className="step-out justify-content-start mt-5">
      {titleLoader ? (
        <Step2SkeletonTitle />
      ) : (
        <div className="search-section-row">
          <label className="steps-counts">6/8 steps</label>
          <h4>How would you prefer to handle outliers when creating your peer benchmark?</h4>
        </div>
      )}
      <div className="w-100 d-flex">
        <div className="col-sm-5 d-flex flex-column">
          {titleLoader ? (
            <Step5OutliersSkeleton />
          ) : (
            <div className="why-adjust">
              <label>Why Adjust Outliers in IRR?</label>
              <p>
                Extreame IRR Values can distort performance measurements, exaggerating returns or
                masking risks, By adusting these outliers, we maintain data integrity investment
                performance.
              </p>
              <span className="help-icon">
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
              </span>
            </div>
          )}
          <div className="choose-table-points">
            {titleLoader ? (
              <Step5OutliersTableSkeleton />
            ) : (
              <div className="grid-col">
                <div className="grid-header-row">Winsorize</div>
                <div className="grid-header-row">Drop</div>
                <div className="grid-header-row">Ignore</div>

                <div className="grid-item-row">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      onChange={ () => setType('Winsorize') }
                      checked={ type === 'Winsorize' }
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
                      onChange={ () => setType('Drop') }
                      checked={ type === 'Drop' }
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
                      onChange={ () => setType('Ignore') }
                      checked={ type === 'Ignore' }
                      type="radio"
                      name="radioGroup3"
                      id="radio3"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="list-points">
            <div className="table-container">
              {titleLoader ? (
                <Step5OutliersChartSkeleton />
              ) : (
                <div className="table-header">
                  <div className="header-cell">Size</div>
                  <div className="header-cell">IRR</div>
                  <div className="header-cell">MOI</div>
                </div>
              )}

              <div className="table-body">
                {loading ? (
                  <Skeleton width={ 600 } height={ 40 } count={ 2 } />
                ) : outliers && outliers?.length > 0 ? (
                  outliers?.map((fund, index) => (
                    <div className="table-row" key={ index }>
                      <div className="table-cell">${fund?.fund_size_usd?.toFixed(2)}M</div>
                      <div className="table-cell">
                        {fund?.net_irr !== null ? `${fund.net_irr}%` : 'N/A'}
                      </div>
                      <div className="table-cell">
                        {fund?.Mahalanobis_Distance !== null
                          ? `${fund?.Mahalanobis_Distance?.toFixed(2)}X`
                          : 'N/A'}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="table-row">
                    <div className="table-cell" colSpan="3">
                      No funds available
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-7">
          <div className="col-sm-12 col-xxl-12 full-width">
            {loading ? (
              <div className="growth-section">
                <Step5SkeletonChart />
              </div>
            ) : (
              <div className="growth-section">
                <div className="chart-option">
                  <div className="outline-row">
                    Outliers Bubble Chart
                    <span>
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
                    </span>
                  </div>
                  {funds && funds?.length > 0 ? (
                    <Layout>
                      <LeftSide />
                      <RightSide>
                        <div className="d-flex ms-auto">
                          <FormControlLabel
                            label="Enable contour lines"
                            labelPlacement="start"
                            sx={ { width: '100%', justifyContent: 'space-between' } }
                            control={
                              <Switch
                                checked={ enableContour }
                                onChange={ (e) => setEnableContour(e.target.checked) }
                              />
                            }
                          />
                        </div>
                        <OutliersChart
                          funds={ funds }
                          outliers={ outliers }
                          contours={ contourLines }
                          enableContour={ enableContour }
                        />
                      </RightSide>
                    </Layout>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="button-row">
        <button onClick={ prevStep } className="back-btn">
          Back
        </button>
        <button
          disabled={ !type }
          onClick={ () => {
            handleNext()
          } }
          className="btn"
        >
          Next
        </button>
      </div>
    </div>
  )
}
