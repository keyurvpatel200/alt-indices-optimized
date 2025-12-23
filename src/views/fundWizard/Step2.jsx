import { useState, useEffect, useCallback } from 'react'
import axios from '../../service/axios'
import { getLocalStorage, setLocalStorage } from '../../utils/utils'
import BackArrowIcon from 'icons/white-back-arrow.svg'
import BenchmarkCardSkeleton from './skeleton/BenchmarkCardSkeleton'

export default function Step2({ nextStep, prevStep }) {
  const [selectedBenchmark, setSelectedBenchmark] = useState(null)
  const [benchmarks, setBenchmarks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedFundData, setSelectedFundData] = useState(null)

  // Get selected fund from localStorage
  useEffect(() => {
    const fundData = getLocalStorage('fundWizard_selectedFund')
    if (fundData) {
      setSelectedFundData(fundData)
    }
  }, [])

  // Fetch benchmarks from API
  const fetchBenchmarks = useCallback(async (search = '') => {
    if (!selectedFundData?.fund_id) return

    try {
      setLoading(true)
      const searchParam = search ? `&search=${encodeURIComponent(search)}` : ''
      const response = await axios.get(`/performance-wizard/benchmark/?fund_id=${selectedFundData.fund_id}${searchParam}`)

      if (response.status === 200) {
        const fetchedBenchmarks = response.data || []
        setBenchmarks(fetchedBenchmarks)

        // Load previously selected benchmark from localStorage
        const savedBenchmark = getLocalStorage('fundWizard_selectedBenchmark')
        if (savedBenchmark) {
          const existingBenchmark = fetchedBenchmarks.find(benchmark => benchmark.id === savedBenchmark.id)
          if (existingBenchmark) {
            setSelectedBenchmark(existingBenchmark.id)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching benchmarks:', error)
      setBenchmarks([])
    } finally {
      setLoading(false)
    }
  }, [selectedFundData?.fund_id])

  useEffect(() => {
    if (selectedFundData?.fund_id) {
      fetchBenchmarks(searchTerm)
    }
  }, [selectedFundData?.fund_id, fetchBenchmarks])

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (selectedFundData?.fund_id) {
        fetchBenchmarks(searchTerm)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, selectedFundData?.fund_id, fetchBenchmarks])

  const handleBenchmarkSelect = (benchmarkId) => {
    setSelectedBenchmark(benchmarkId)

    // Find the selected benchmark and store in localStorage
    const selectedBenchmarkData = benchmarks.find(benchmark => benchmark.id === benchmarkId)
    if (selectedBenchmarkData) {
      setLocalStorage('fundWizard_selectedBenchmark', selectedBenchmarkData)
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  // Get asset class display value
  const getAssetClassDisplay = (assetClasses) => {
    if (!assetClasses) return 'N/A'
    if (typeof assetClasses === 'string') return assetClasses
    if (typeof assetClasses === 'object') {
      // Handle different possible structures
      return Object.values(assetClasses)[0] || 'N/A'
    }
    return 'N/A'
  }

  // Get strategy display value
  const getStrategyDisplay = (strategy) => {
    if (!strategy) return 'N/A'
    if (Array.isArray(strategy)) {
      return strategy.map(s => s.strategies || s).join(', ')
    }
    if (typeof strategy === 'object' && strategy.strategies) {
      return strategy.strategies
    }
    return strategy.toString()
  }

  return (
    <div className="step-out-region mt-5">
      <div className="search-section-row gap-1 mb-1 pb-1">
        <label className="steps-counts">Step 2<span className='off-white'>/4</span></label>
        <h4 className="text-white">
          Select Benchmark
        </h4>
      </div>
      <div className='w-100 global-fund-search d-flex align-items-center mb-5'>
        <input
          type="text"
          placeholder="Enter benchmark name or tag"
          className="w-100 border p-3 rounded-2 m-auto"
          value={ searchTerm }
          onChange={ handleSearchChange }
        />
      </div>

      <div className="w-100">
        {!selectedFundData ? (
          <div className="text-center text-white">
            <p>No fund selected. Please go back to Step 1 and select a fund.</p>
          </div>
        ) : (
          <div className="row">
            { loading ? (
              <BenchmarkCardSkeleton />
            ) : benchmarks.length > 0 ? (
              benchmarks.map((benchmark, index) => (
                <div key={ benchmark.id } className="col-lg-4 col-md-6 col-sm-12 mb-3">
                  <div
                    className={ `card fund-card h-100 ${selectedBenchmark === benchmark.id ? 'active' : ''}` }
                    onClick={ () => handleBenchmarkSelect(benchmark.id) }
                    style={ { cursor: 'pointer' } }
                  >
                    <div className="fund-card-body">
                      {/* First Row: Sr Number, Benchmark Name, Radio Button */}
                      <div className="fund-card-row fund-card-header mb-3">
                        <div className="fund-card-info">
                          <span className="fund-serial-number">{ String(index + 1).padStart(2, '0') }</span>
                          <span className="fund-name-truncated" title={ benchmark.benchmark_name || 'Unnamed Benchmark' }>
                            { benchmark.benchmark_name || 'Unnamed Benchmark' }
                          </span>
                        </div>
                        <div className="fund-radio-container">
                          <input
                            className="fund-radio-input"
                            type="radio"
                            name="benchmarkSelection"
                            id={ `benchmark-${benchmark.id}` }
                            checked={ selectedBenchmark === benchmark.id }
                            onChange={ () => handleBenchmarkSelect(benchmark.id) }
                          />
                        </div>
                      </div>
                      {/* Benchmark Details Rows */}
                      <div className='fund-details-container'>
                        <div className="fund-card-row fund-card-details">
                          <span className="fund-label">Date of Creation:</span>
                          <span className="fund-value">{ formatDate(benchmark.date_created) }</span>
                        </div>
                        <div className="fund-card-row fund-card-details">
                          <span className="fund-label">Vintage Year:</span>
                          <span className="fund-value">{ benchmark.vintage_year || 'N/A' }</span>
                        </div>
                        <div className="fund-card-row fund-card-details">
                          <span className="fund-label">Strategy:</span>
                          <span className="fund-value">{ getStrategyDisplay(benchmark.strategy) }</span>
                        </div>
                        <div className="fund-card-row fund-card-details">
                          <span className="fund-label">Asset Class:</span>
                          <span className="fund-value">{ getAssetClassDisplay(benchmark.asset_classes) }</span>
                        </div>
                        <div className="fund-card-row fund-card-details">
                          <span className="fund-label">Number of fund constituents:</span>
                          <span className="fund-value">{ benchmark.benchmark_fund_count || 'N/A' }</span>
                        </div>
                      </div>

                      {/* HR Line */}
                      <hr className="fund-divider" />

                      {/* Tags Row */}
                      <div className="fund-tags-container">
                        { benchmark.tags && Array.isArray(benchmark.tags) ? (
                          benchmark.tags.map((tag, tagIndex) => (
                            <span key={ tagIndex } className="fund-tag">
                              { tag }
                            </span>
                          ))
                        ) : (
                          <span className="fund-tag text-muted">No tags</span>
                        ) }
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="text-center text-white">
                  <p>No benchmarks found{ searchTerm ? ` matching "${searchTerm}"` : ' for this fund' }.</p>
                  { searchTerm && (
                    <p className="text-muted">Try adjusting your search terms or clear the search to see all benchmarks.</p>
                  ) }
                </div>
              </div>
            ) }
          </div>
        ) }
      </div>

      <div className="button-row justify-content-between">
        <button onClick={ prevStep } className="previous-btn">
          <BackArrowIcon className="back-arrow-icon" /> Back
        </button>
        <button
          onClick={ nextStep }
          className="btn"
          disabled={ !selectedBenchmark || loading }
        >
          { loading ? 'Loading...' : 'Next' }
        </button>
        { !selectedBenchmark && !loading && benchmarks.length > 0 && (
          <p className="mt-3 text-white">Please select a benchmark to continue</p>
        ) }
      </div>
    </div>
  )
}
