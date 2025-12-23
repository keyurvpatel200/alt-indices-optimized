import { useState, useEffect, useCallback } from 'react'
import axios from '../../service/axios'
import { setLocalStorage, getLocalStorage } from '../../utils/utils'
import FundCardSkeleton from './skeleton/FundCardSkeleton'

export default function Step1({ nextStep }) {
  const [selectedFund, setSelectedFund] = useState(null)
  const [funds, setFunds] = useState([])
  const [filteredFunds, setFilteredFunds] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch funds from API
  const fetchFunds = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get('/performance-wizard/fund_id_name/')
      if (response.status === 200) {
        const fetchedFunds = response.data?.results || response.data
        setFunds(fetchedFunds)
        setFilteredFunds(fetchedFunds)

        // Load previously selected fund from localStorage
        const savedFund = getLocalStorage('fundWizard_selectedFund')
        if (savedFund) {
          const existingFund = fetchedFunds.find(fund => fund.fund_id === savedFund.fund_id)
          if (existingFund) {
            setSelectedFund(existingFund.id)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching funds:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFunds()
  }, [fetchFunds])

  // Filter funds based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredFunds(funds)
    } else {
      const filtered = funds.filter(fund =>
        fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fund.fund_id.toString().includes(searchTerm)
      )
      setFilteredFunds(filtered)
    }
  }, [searchTerm, funds])

  const handleFundSelect = (fundId) => {
    setSelectedFund(fundId)

    // Find the selected fund and store in localStorage
    const selectedFundData = funds.find(fund => fund.id === fundId)
    if (selectedFundData) {
      setLocalStorage('fundWizard_selectedFund', selectedFundData)
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="step-out-region mt-5">
      <div className="search-section-row gap-1 mb-1 pb-1">
        <label className="steps-counts">Step 1<span className="off-white">/4</span></label>
        <h4 className="text-white">
          What fund are you looking for a benchmark?
        </h4>
      </div>
      <div className='w-100 global-fund-search d-flex align-items-center mb-5'>
        <input
          type="text"
          placeholder="Enter fund name or ID"
          className="w-100 border p-3 rounded-2 m-auto"
          value={ searchTerm }
          onChange={ handleSearchChange }
        />
      </div>
      <div className="w-100">
        <div className="row">
          {loading ? (
            <FundCardSkeleton />
          ) : filteredFunds.length > 0 ? (
            filteredFunds.map((fund, index) => (
              <div key={ fund.id } className="col-lg-3 col-md-6 col-sm-12 mb-3">
                <div
                  className={ `card fund-card h-100 ${selectedFund === fund.id ? 'active' : ''}` }
                  onClick={ () => handleFundSelect(fund.id) }
                  style={ { cursor: 'pointer' } }
                >
                  <div className="fund-card-body">
                    {/* First Row: Sr Number, Fund Name, Radio Button */}
                    <div className="fund-card-row fund-card-header mb-3">
                      <div className="fund-card-info">
                        <span className="fund-serial-number">{ String(index + 1).padStart(2, '0') }</span>
                        <span className="fund-name-truncated" title={ fund.name }>
                          { fund.name }
                        </span>
                      </div>
                      <div className="fund-radio-container">
                        <input
                          className="fund-radio-input"
                          type="radio"
                          name="fundSelection"
                          id={ `fund-${fund.id}` }
                          checked={ selectedFund === fund.id }
                          onChange={ () => handleFundSelect(fund.id) }
                        />
                      </div>
                    </div>
                    {/* Fund Details */}
                    <div className='d-flex flex-column gap-1'>
                      <div className="fund-card-row fund-card-details">
                        <span className="fund-label">Vintage Year:</span>
                        <span className="fund-value">{ fund.vintage_year || 'N/A' }</span>
                      </div>
                      <div className="fund-card-row fund-card-details">
                        <span className="fund-label">Asset Class:</span>
                        <span className="fund-value">{ fund.asset_class || 'N/A' }</span>
                      </div>
                      <div className="fund-card-row fund-card-details">
                        <span className="fund-label">Fund ID:</span>
                        <span className="fund-value">{ fund.fund_id || 'N/A' }</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center text-white">
                <p>No funds found matching your search criteria.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="button-row justify-content-end">
        { !selectedFund && !loading && (
          <p className="mt-3 text-white">Please select a fund to continue</p>
        ) }
        <button
          onClick={ nextStep }
          className="btn"
          disabled={ !selectedFund || loading }
        >
          { loading ? 'Loading...' : 'Next' }
        </button>
      </div>
    </div>
  )
}