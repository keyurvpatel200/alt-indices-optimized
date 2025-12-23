import { useCallback, useEffect, useState } from 'react'
import { FormGroup, Input } from 'reactstrap'

import axios from '@/service/axios'
import AmericasSVG from 'icons/region/Americas.svg'
import AfricaSVG from 'icons/region/Africa.svg'
import AustraliaSVG from 'icons/region/Australia.svg'
import Asia from 'icons/region/Asia.svg'
import EuropeSVG from 'icons/region/Europe.svg'
import IsraelSVG from 'icons/region/Israel.svg'
import NorthAmericaSVG from 'icons/region/NorthAmerica.svg'
import CustomScrollbar from '../../components/CustomScrollbar'
import Step2Skeleton, {
  Step2SkeletonContent,
  Step2SkeletonContentInput,
  Step2SkeletonTitle
} from './skeleton/Step2Skeleton'

export default function Step2({
  nextStep,
  prevStep,
  widgetData,
  setWidgetData
}) {
  const [unselectedMap, setUnselectedMap] = useState({})
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingCountry, setLoadingCountry] = useState(false)
  const [countries, setCountries] = useState([])
  const [isSubmitLoading] = useState(false)
  const [searchCountry, setSearchCountry] = useState('')
  const [titleLoader, setTitleLoader] = useState(true)
  const [defaultLocation, setDefaultLocation] = useState([])
  const [step2Data, setStep2Data] = useState({
    primary_geographic_focus: [],
    unselected_countries: []
  })
  
  const fetchLocations = useCallback(async () => {
    try {
      if (!widgetData?.[2]?.fund_id) return
      setLoading(true)
      const response = await axios.get(
        `/performance-wizard/primary-geographic-focus/?fund_id=${widgetData?.[2]?.fund_id}`
      )
      if (response.status === 200) {
        const fetchedLocations = response.data.primary_geographic_focus_location
        const defaultFocus = response.data.default_geographic_focus
        setLocations(fetchedLocations)
        if ((widgetData?.[4]?.defaultLocation || [])?.length === 0) {
          setDefaultLocation(defaultFocus)
        }else{
          setDefaultLocation(widgetData?.[4]?.defaultLocation || [])
        }
        setUnselectedMap(widgetData?.[4]?.unselectedMap || {})
        if(Object.keys(widgetData?.[4] || {}).length > 0){
          setStep2Data(widgetData?.[4]?.step2Data || {})
        }
        setLoading(false)
      }
    } catch (error) {
      console.log('Error fetching locations:', error)
      
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLocations()
  }, [fetchLocations])

  const handleCheckboxChange = data => {
    if (defaultLocation?.includes(data)) {
      const removeData = defaultLocation?.filter(item => item !== data)
      setDefaultLocation(removeData)
      let updatedData = { ...(unselectedMap || {}) }
      delete updatedData[data]
      setUnselectedMap(updatedData)
    } else {
      setDefaultLocation([...defaultLocation, data])
    }
  }

  const handleChangeCountry = data => {
    const isSelected = step2Data?.primary_geographic_focus?.some(d => d?.name === data?.name)

    if (isSelected) {
      const removeData = step2Data?.primary_geographic_focus?.filter(
        item => item.name !== data?.name
      )
      setStep2Data({
        ...step2Data,
        primary_geographic_focus: removeData
      })
      setUnselectedMap(prev => ({
        ...prev,
        [data.continent]: [...(prev[data.continent] || []), data.name]
      }))
    } else {
      setStep2Data({
        ...step2Data,
        primary_geographic_focus: [...(step2Data?.primary_geographic_focus || []), data]
      })
      setUnselectedMap(prev => ({
        ...prev,
        [data.continent]: (prev[data.continent] || []).filter(name => name !== data.name)
      }))
    }
  }

  const handleNext = () => {
    // await axios.put('/performance-wizard/primary-geographic-focus/', {
    //   fund_id: widgetData?.[2]?.fund_id,
    //   primary_geographic_focus: defaultLocation,
    //   unselected_countries: Object.values(unselectedMap || {}).flat()
    // })
    const selectedContinents = step2Data?.primary_geographic_focus?.map(d=>d?.name)
    const data = {
      defaultLocation,
      unselectedMap,
      step2Data: {
        ...step2Data,
        unselected_countries: countries?.filter((d)=>!selectedContinents?.includes(d?.name))
      }
    }
    setWidgetData({ ...widgetData, 4: data, step: 5 })
    localStorage.setItem('widgetData', JSON.stringify({ ...widgetData, 4: data, step: 5 }))
    setSearchCountry('')
    nextStep()
  }

  const getCountry = async selectedContinents => {
    try {
      if (selectedContinents?.length === 0) return
      setLoadingCountry(true)
      const removeSpace = selectedContinents.map(item => item.replace(/\s|&/g, ''))?.join(',')
      await axios
        .get(`/performance-wizard/primary-geographic-focus/multi/?continents=${removeSpace}`)
        .then(res => {
          const newCountries = res?.data?.data || []
          const filteredCountries = newCountries.filter(country => {
            const unselected =
              (unselectedMap || widgetData?.['4']?.unselectedMap)?.[country.continent] || []
            return !unselected.includes(country.name)
          })
          setCountries(newCountries)
          setStep2Data({
            ...step2Data,
            primary_geographic_focus: filteredCountries
          })
          setLoadingCountry(false)
        })
    } catch (error) {
      setLoadingCountry(false)
      console.error('Error updating selected options:', error)
    }
  }

  useEffect(() => {
    if (defaultLocation?.length > 0 || widgetData?.[4]?.defaultLocation) {
      getCountry(defaultLocation || widgetData?.[4]?.defaultLocation)
    } else {
      setCountries([])
      setStep2Data({
        ...step2Data,
        primary_geographic_focus: []
      })
      setUnselectedMap({})
    }
  }, [defaultLocation,widgetData?.[4]?.defaultLocation])

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
          <label className="steps-counts">4/8 steps</label>
          <h4>Which geographic region would you like your peer group to represent?</h4>
        </div>
      )}

      {loading ? (
        <Step2SkeletonContent />
      ) : (
        <ul className="region-list-row">
          {locations.map((location, index) => (
            <li key={ location } className={ defaultLocation?.includes(location) ? 'active' : '' }>
              {index === 0 ? (
                <div className="text-row">
                  <AfricaSVG />
                </div>
              ) : index === 1 ? (
                <div className="text-row">
                  <AmericasSVG />
                </div>
              ) : index === 2 ? (
                <div className="text-row">
                  <Asia />
                </div>
              ) : index === 3 ? (
                <div className="text-row">
                  <AustraliaSVG />
                </div>
              ) : index === 4 ? (
                <div className="text-row">
                  <EuropeSVG />
                </div>
              ) : index === 5 ? (
                <div className="text-row">
                  <IsraelSVG />
                </div>
              ) : index === 6 ? (
                <div className="text-row">
                  <NorthAmericaSVG />
                </div>
              ) : null}

              <div className="option">{location}</div>
              {defaultLocation?.includes(location) && (
                <div className="checkbox-content">
                  <svg height="13" width="16">
                    <path
                      d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"
                      fill="#88a4c7"
                    ></path>
                  </svg>
                </div>
              )}
              <FormGroup check>
                <Input
                  name={ location }
                  type="checkbox"
                  checked={ defaultLocation?.includes(location) }
                  onChange={ () => handleCheckboxChange(location) }
                />
              </FormGroup>
            </li>
          ))}
        </ul>
      )}
      <div className="coutries-card-row">
        {titleLoader ? (
          <Step2SkeletonContentInput />
        ) : (
          <div className="search-row">
            <label>Countries:</label>
            <input
              type="text"
              onChange={ e => setSearchCountry(e?.target?.value) }
              value={ searchCountry }
              placeholder="Start typing your country"
            />
          </div>
        )}
        <div className="coutries-list mt-3">
          <CustomScrollbar maxHeight="450px">
            <ul className="region-list-row country-card">
              {loadingCountry || (!searchCountry ? countries?.length === 0 : false) ? (
                <Step2Skeleton />
              ) : (
                countries
                  ?.filter(d =>
                    searchCountry
                      ? d?.name?.toLowerCase().includes(searchCountry?.toLowerCase())
                      : true
                  )
                  ?.map(location => (
                    <li
                      key={ location?.name }
                      className={
                        step2Data?.primary_geographic_focus?.some(d => d?.name === location?.name)
                          ? 'active'
                          : ''
                      }
                    >
                      <div className="option">{location?.name}</div>
                      {step2Data?.primary_geographic_focus?.some(
                        d => d?.name === location?.name
                      ) && (
                        <div className="checkbox-content">
                          <svg height="13" width="16">
                            <path
                              d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"
                              fill="#88a4c7"
                            ></path>
                          </svg>
                        </div>
                      )}
                      <FormGroup check>
                        <Input
                          name={ location?.name }
                          type="checkbox"
                          checked={ step2Data?.primary_geographic_focus?.some(
                            d => d?.name === location?.name
                          ) }
                          onChange={ () => handleChangeCountry(location) }
                        />
                      </FormGroup>
                    </li>
                  ))
              )}
            </ul>
          </CustomScrollbar>
        </div>
      </div>
      <div className="button-row">
        <button
          onClick={ () => {
            prevStep()
            setSearchCountry('')
          } }
          disabled={ loading }
          className="back-btn"
        >
          Back
        </button>
        <button
          onClick={ () => {
            handleNext()
          } }
          className="btn"
          disabled={ step2Data?.primary_geographic_focus?.length === 0 || isSubmitLoading || loading }
        >
          {isSubmitLoading ? 'Loading...' : 'Next'}
        </button>
        {step2Data?.primary_geographic_focus?.length === 0 ? (
          <p className="ml-2 mt-3 text-white">Select at least one option</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
