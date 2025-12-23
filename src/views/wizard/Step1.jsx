import { useCallback, useEffect, useState } from 'react'
import { FormGroup, Input } from 'reactstrap'

import axios from '@/service/axios'
import Step1Skeleton from './skeleton/Step1Skeleton'
import Skeleton from 'react-loading-skeleton'

export default function Step1({ nextStep, prevStep, widgetData, setWidgetData }) {
  const [selectedOption, setSelectedOption] = useState(null)
  const [funds, setFunds] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredFunds, setFilteredFunds] = useState([])
  const [loading, setLoading] = useState(false)
  const [titleLoader, setTitleLoader] = useState(true)

  const fetchLocations = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get('/performance-wizard/fund_id_name/')
      if (response.status === 200) {
        const fetchedLocations = response.data?.results
        setFunds(fetchedLocations)
        setFilteredFunds(fetchedLocations)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.error('Error fetching locations:', error)
    }
  }, [])

  useEffect(() => {
    fetchLocations()
  }, [fetchLocations])

  useEffect(() => {
    const filtered = funds.filter(
      fund =>
        fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fund.fund_id.toString().includes(searchTerm)
    )
    setFilteredFunds(filtered)
  }, [searchTerm, funds])

  const handleSearch = e => {
    setSearchTerm(e.target.value)
  }

  const handleCheckboxChange = (e, fund) => {
    const { checked } = e.target
    if (checked) {
      setSelectedOption(fund)
    } else {
      setSelectedOption(null)
    }
  }

  const handleNext = () => {
    const data = {
      ...widgetData,
      '2': selectedOption,
      '3': {
        vintage_year: selectedOption?.vintage_year,
        asset_class: selectedOption?.asset_class
      },
      step: 3
    }
    setWidgetData(data)
    localStorage.setItem('widgetData', JSON.stringify(data))
    nextStep()
  }

  useEffect(() => {
    if(widgetData?.['2']){
      setSelectedOption(widgetData?.['2'])
    }
    setTimeout(() => {
      setTitleLoader(false)
    }, 2000)
  }, [])

  return (
    <div className="custom-first-box mt-5">
      <div className="search-section-row">
        <label className="steps-counts">
          {titleLoader ? <Skeleton width={ 80 } height={ 20 } className="mb-2" /> : '2/8 steps'}
        </label>
        <h4 className="text-white">
          {titleLoader ? (
            <Skeleton width={ 600 } height={ 20 } className="mb-1" />
          ) : (
            'What fund ID are you looking for a benchmark?'
          )}
        </h4>
        <div className="col-sm-6">
          {titleLoader ? (
            <Skeleton width={ 700 } height={ 40 } className="mb-1" />
          ) : (
            <input
              type="text"
              placeholder="Enter fund name or ID"
              className="w-100 border p-3 rounded-2"
              value={ searchTerm }
              onChange={ handleSearch }
            />
          )}
        </div>
      </div>

      {loading ? (
        <ul>
          <Step1Skeleton />
        </ul>
      ) : (
        <ul>
          {filteredFunds.length > 0 ? (
            filteredFunds.map((fund, index) => (
              <li
                key={ fund.fund_id }
                className={ selectedOption?.fund_id === fund.fund_id ? 'active' : '' }
              >
                <div>
                  <span className="option-number">{index + 1}</span>
                </div>
                <div className="option">
                  <div className="f-name">{fund.name}</div>
                  <div className="list-of-detl">
                    <label>
                      Vintage Year: <b>{fund.vintage_year}</b>
                    </label>
                    <label>
                      Asset Class: <b>{fund.asset_class}</b>
                    </label>
                    <label>
                      Fund ID: <b>{fund.fund_id}</b>
                    </label>
                  </div>
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
                    name={ fund.fund_id }
                    type="checkbox"
                    checked={ selectedOption?.fund_id === fund.fund_id }
                    onChange={ e => handleCheckboxChange(e, fund) }
                  />
                </FormGroup>
              </li>
            ))
          ) : (
            <label className="h-100 d-flex w-100 justify-content-start align-items-start text-white">
              No record found
            </label>
          )}
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
          disabled={ !selectedOption?.fund_id || loading }
        >
          Next
        </button>
        {!selectedOption?.fund_id && <p className="mt-3 text-white">Select at least one option</p>}
      </div>
    </div>
  )
}




