// ** React Imports
import { useCallback, useEffect, useRef, useState } from 'react'

// ** Third Party Imports
import Skeleton from 'react-loading-skeleton'

// ** Custom Components Imports
import axios from '@/service/axios'
import axiosInstance from '../../service/axios'
import FundSizeDensityChart from './chart/FundSizeDensityChart2/FundSizeDensityChart'
import BoxWhiskerChart from './chart/BoxWhiskerChart/BoxWhiskerChart'

// ** Asset Imports
import CircleInfo from 'icons/circle-info.svg'
import { FormControlLabel, Switch } from '@mui/material'


const FinalFirstStep = ({ data }) => {
  const [includeOutliers, setIncludeOutliers] = useState(true)

  return (
    <div className="final-step-inner-left">
      <h4 className="mb-0">Peer Return Distribution by Vintage Year [YY]: </h4>
      <div className="d-flex justify-content-between flex-row w-100">
        <div className="alt-fund-name">
          <CircleInfo /> [Fund name]&apos;s Return
        </div>
        <div className="alt-fund-date">As on date: 30 April 2025</div>
      </div>
      {/* <SwitchToggle
        title="Include outliers"
        checked={ includeOutliers }
        setChecked={ setIncludeOutliers }
      /> */}
      <div className="d-flex ms-auto">
        <FormControlLabel
          label="Include outliers"
          labelPlacement="start"
          sx={ { width: '100%', justifyContent: 'space-between' } }
          control={
            <Switch
              checked={ includeOutliers }
              onChange={ (e) => setIncludeOutliers(e.target.checked) }
            />
          }
        />
      </div>
      <div style={ { flex: 1, width: '100%' } }>
        {data  && <BoxWhiskerChart data={ data } includeOutliers={ includeOutliers } className="chart-responsive"
          style={ { width: '100%', height: '100%' } } />}
      </div>
      <div className="d-flex w-100 benchmark-id-label">Benchmark ID: B455321</div>
    </div>
  )
}

const FinalMiddleStep = ({
  fundThresholds,
  fundDistribution,
  comparedFund,
  selectedFundSizes,
  selectedPercentageType
}) => {
  return (
    <div className="final-step-inner-center">
      <h4 className="mb-0">Benchmark Coverage</h4>
      <div>
        <p>
          The benchmark covers [X%] of the total funds and [X%] of the total capital invested in the
          vintage year. The fund size range within the benchmark spans from [$x Million to $x
          Million].
        </p>
        <p>
          The benchmark covers [x]% of funds in the [vintage year] vintage year where the vintage
          year represents the first year of investment or drawdown from the investor.
        </p>
        <div className="benchmark-coverage-chart">
          <fieldset>
            <legend>
              Check coverage by <CircleInfo />{' '}
            </legend>
            <div className="chart-label">
              <div>
                <div className="dash-"></div>
                Number of funds <CircleInfo />
              </div>
              <div>
                <span className="blue-dot"></span>
                Percentage of total capital
                <CircleInfo />
              </div>
            </div>
          </fieldset>
        </div>
        {fundDistribution && comparedFund && <div className="bg-slate-600">
          <FundSizeDensityChart
            fundThresholds={ fundThresholds }
            fundDistribution={ fundDistribution }
            comparedFund={ comparedFund }
            selectedFundSizes={ selectedFundSizes }
            selectedPercentageType={ selectedPercentageType }
          />
        </div>}
      </div>
    </div>
  )
}

const FinalLastStep = () => {
  return (
    <div className="final-step-inner-right">
      <h4 className="mb-0">Benchmark Composition</h4>
      <ol>
        <li>
          <b>Asset Class:</b> Funds operating within [Asset Class].
        </li>
        <li>
          <b>Sub-Asset Class:</b> Specifically focuses on the [Sub-Asset Class].
        </li>
        <li>
          <b>Geographic Region:</b> Primarily covers the geographic area of [Primary Geographic
          Area].
        </li>
        <li>
          <b>Countries Included:</b> Includes funds operating in [List of Countries].
        </li>
      </ol>
    </div>
  )
}

export default function Step8({ selectedFundSize, setModal, type }) {
  const [data, setData] = useState()
  const hasGeneratedData = useRef(false)
  const [titleLoader, setTitleLoader] = useState(true)
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState(selectedFundSize || [])
  const [selectedPercentageType] = useState('fund_percentage')
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [fundDistribution, setFundDistribution] = useState(null)
  const [comparedFund, setComparedFund] = useState(null)

  const fundThresholds = [0, 50, 250, 1000, 1500]

  const fetchSelectedOptions = useCallback(async () => {
    try {
      // Get fund_id from localStorage or use a default value
      const widgetData = JSON.parse(localStorage.getItem('widgetData') || '{}')
      const fundId = widgetData?.['2']?.fund_id
      
      if (!fundId) {
        console.error('No fund_id found in widgetData')
        return
      }

      const response = await axios.get(`/performance-wizard/all-fund-size/?fund_id=${fundId}`)

      if (response.status === 200) {
        const defaultFocus = response.data.fund_size_category
        const preselectedOptions = []

        if (selectedFundSize && Object.keys(selectedFundSize).length > 0) {
          selectedFundSize.forEach(location => {
            preselectedOptions.push(location)
          })
        } else {
          preselectedOptions.push(defaultFocus)
        }
        setSelectedOptions(preselectedOptions)
      }
    } catch (error) {
      console.log('Error fetching fund size options:', error)
    }
  }, [])

  const getAllFundDistributionDetail = async () => {
    try {
      // Get required data from localStorage
      const widgetData = JSON.parse(localStorage.getItem('widgetData') || '{}')
      const requestData = {
        fund_id: widgetData?.['2']?.fund_id,
        asset_class: widgetData?.['3']?.asset_class ? [widgetData?.['3']?.asset_class] : [],
        vintage_year: widgetData?.['3']?.vintage_year ? +widgetData?.['3']?.vintage_year : '',
        strategies: Object.keys(widgetData?.['5']?.selectedStrategies || {}),
        primary_geographic_focus: widgetData?.['4']?.defaultLocation || []
      }

      const response = await axios.post('/performance-wizard/combined-fund/', requestData)
      if (response.status === 200) {
        setFundDistribution(response.data.fund_distribution)
        setComparedFund(response.data.compared_fund)
      }
    } catch (error) {
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

  // Call the fetch function when the component mounts
  const handleNext = () => {
    try {
      setIsSubmitLoading(true) // Show loader while processing
      axios
        .put('/strategy/update/', { strategies: selectedOptions })
        .then(() => {
          setModal(false)
          localStorage.removeItem('widgetData')
          setIsSubmitLoading(false)
        })
        .catch(error => {
          setIsSubmitLoading(false)
          console.error('Error updating strategies:', error)
        })
    } catch (error) {
      console.log('Error updating selected options:', error)
    }
  }

  const getHandleOutliers = async type => {
    setLoading(true)
    
    try {
      // Get required data from localStorage  
      const widgetData = JSON.parse(localStorage.getItem('widgetData') || '{}')
      
      const requestData = {
        fund_id: widgetData?.['2']?.fund_id,
        outliers_ids: widgetData?.['7']?.outliers_ids || [], // This might come from step 7
        outlier_handling_method: type || 'winsorize',
        benchmark_constituents: widgetData?.['6']?.benchmark_constituents || []
      }

      // Check if we have the required data
      if (!requestData.fund_id) {
        console.error('Missing fund_id for handle outliers API')
        setLoading(false)
        return
      }

      if (!requestData.benchmark_constituents || requestData.benchmark_constituents.length === 0) {
        console.error('Missing benchmark_constituents for handle outliers API')
        setLoading(false)
        return
      }

      const res = await axiosInstance.post('/performance-wizard/handle-outliers/', requestData)
      
      if (res?.data) {
        setLoading(false)
        setData({
          ...res?.data,
          winsorize:
            Object.keys(res?.data?.winsorize || {})?.length > 0 ? res?.data?.winsorize : 
              Object.keys(res?.data?.drop || {})?.length > 0 ? res?.data?.drop : 
                Object.keys(res?.data?.ignore || {})?.length > 0 ? res?.data?.ignore : {}
        })
      }
    } catch (error) {
      console.error('Error fetching handle outliers:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!hasGeneratedData.current) {
      getHandleOutliers(type)
      hasGeneratedData.current = true
    }
    setTimeout(() => {
      setTitleLoader(false)
    }, 2000)
  }, [])

  return (
    <div className="step-out justify-content-start align-items-center mt-5">
      <div className="card-layer-row w-100">
        <div className="d-flex col-sm-12 d-flex flex-column">
          <div className="search-section-row">
            <h4 className="mb-0">
              {titleLoader ? <Skeleton width={ 200 } height={ 20 } /> : 'Your Benchmark is Ready!'}
            </h4>
            <label className="text-white mb-0">
              {titleLoader ? (
                <Skeleton width={ 800 } height={ 20 } />
              ) : (
                'Your benchmark will update automatically on schedule and is now ready to share. You can create reports and add components for more insights.'
              )}
            </label>
          </div>
          {loading ? (
            <Skeleton width={ 1300 } height={ 500 } />
          ) : (
            <div className="final-step-out">
              <div className="final-step-inner">
                <FinalFirstStep data={ data } />
                <FinalMiddleStep
                  fundThresholds={ fundThresholds }
                  fundDistribution={ fundDistribution }
                  comparedFund={ comparedFund }
                  selectedFundSizes={ selectedOptions }
                  selectedPercentageType={ selectedPercentageType }
                />
                <FinalLastStep />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="button-row">
        <button
          onClick={ () => {
            handleNext()
          } }
          disabled={ loading || isSubmitLoading }
          className="btn"
        >
          {isSubmitLoading ? 'Loading...' : 'Final'}
        </button>
      </div>
    </div>
  )
}
