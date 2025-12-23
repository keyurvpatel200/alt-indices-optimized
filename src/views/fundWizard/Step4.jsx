import { useState, useEffect, useCallback } from 'react'
import axios from '../../service/axios'
import { setLocalStorage, getLocalStorage } from '../../utils/utils'
import HealthcareIcon from 'icons/healthcare.svg'
import DiversifiedIcon from 'icons/diversified.svg'
import InformationTechIcon from 'icons/informationTech.svg'
import BusinessIcon from 'icons/business.svg'
import IndustrialIcon from 'icons/industrial.svg'
import ConsumerIcon from 'icons/consumer.svg'
import EnergyIcon from 'icons/energy.svg'
import TelecomsIcon from 'icons/telecoms.svg'
import FinancialIcon from 'icons/financial.svg'
import RowMaterialIcon from 'icons/rowMaterial.svg'
import RealEstateIcon from 'icons/realEstate.svg'
import CloseIcon from 'icons/close-circle.svg'
import BackArrowIcon from 'icons/white-back-arrow.svg'
import IndustryCardSkeleton from './skeleton/IndustryCardSkeleton'

export default function Step4({ prevStep, setModal }) {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [industries, setIndustries] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [, setSelectedCoreIndustries] = useState([])
  const [coreIndustries, setCoreIndustries] = useState([])

  const handleFinish = async () => {
    try {
      setSubmitting(true)

      // Save selected industries to localStorage before finishing
      setLocalStorage('fundWizard_selectedIndustries', selectedCategories)

      // Prepare data for API call
      const selectedIndustryNames = selectedCategories
        .map(categoryId => {
          const industry = industries.find(ind => ind.id === categoryId)
          return industry ? industry.name : null
        })
        .filter(name => name !== null)

      const coreIndustryNames = coreIndustries.map(ci => ci.name)

      // Get additional data from localStorage if needed
      const selectedFund = getLocalStorage('fundWizard_selectedFund')
      const selectedBenchmark = getLocalStorage('fundWizard_selectedBenchmark')

      // Validate required data
      if (!selectedBenchmark?.id) {
        alert('No benchmark selected. Please go back to Step 2 and select a benchmark.')
        return
      }

      if (selectedIndustryNames.length === 0) {
        alert('Please select at least one industry before finishing.')
        return
      }

      if (coreIndustryNames.length === 0) {
        alert('No core industries found. Please go back to Step 3 and select core industries.')
        return
      }



      // Create unique benchmark name with timestamp to avoid duplicates
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
      const uniqueBenchmarkName = `Industry benchmark for ${selectedFund?.name || 'Selected Fund'} - ${timestamp}`

      // Prepare the request payload
      const requestData = {
        benchmark_id: selectedBenchmark?.id || null, // Required by API
        benchmark_name: uniqueBenchmarkName,
        benchmark_privacy: selectedBenchmark?.benchmark_privacy || 'Public',
        benchmark_frequency: selectedBenchmark?.benchmark_frequency || 'monthly',
        tags: selectedBenchmark?.tags || [], // Get tags from selected benchmark
        core_industries: coreIndustryNames,
        industries: selectedIndustryNames
      }
      // Make the API call
      const response = await axios.post('/performance-wizard/industry-benchmark/', requestData)

      if (response.status === 200 || response.status === 201) {
        // Close the modal when finishing
        setModal(false)
      } else {
        console.error('Failed to create industry benchmark:', response.statusText)
        alert('Failed to create industry benchmark. Please try again.')
      }
    } catch (error) {
      console.error('Error creating industry benchmark:', error)
      alert('An error occurred while creating the industry benchmark. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Icon mapping for industries based on core industry
  const iconMapping = {
    'Healthcare': HealthcareIcon,
    'Diversified': DiversifiedIcon,
    'Information Technology': InformationTechIcon,
    'Business Services': BusinessIcon,
    'Industrials': IndustrialIcon,
    'Consumer Discretionary': ConsumerIcon,
    'Energy & Utilities': EnergyIcon,
    'Telecoms & Media': TelecomsIcon,
    'Financial & Insurance Services': FinancialIcon,
    'Raw Materials & Natural Resources': RowMaterialIcon,
    'Real Estate': RealEstateIcon
  }

  // Get core industries and load saved data on component mount
  useEffect(() => {
    // Load previously selected core industries from Step 3
    const savedCoreIndustries = getLocalStorage('fundWizard_selectedCoreIndustries')
    if (savedCoreIndustries && Array.isArray(savedCoreIndustries)) {
      setSelectedCoreIndustries(savedCoreIndustries)

      // Load only the selected core industries data
      const coreIndustriesData = getLocalStorage('fundWizard_coreIndustriesData') || []
      if (coreIndustriesData.length > 0) {
        // Filter to show only selected core industries
        const selectedCoreIndustriesData = coreIndustriesData.filter(coreIndustry =>
          savedCoreIndustries.includes(coreIndustry.id)
        )

        const mappedCoreIndustries = selectedCoreIndustriesData.map(coreIndustry => ({
          id: coreIndustry.id,
          name: coreIndustry.name,
          iconComponent: iconMapping[coreIndustry.name] || BusinessIcon
        }))
        setCoreIndustries(mappedCoreIndustries)
      }
    }

    // Load previously selected industries
    const savedIndustries = getLocalStorage('fundWizard_selectedIndustries')
    if (savedIndustries && Array.isArray(savedIndustries)) {
      setSelectedCategories(savedIndustries)
    }
  }, [])

  // Fetch industries from API
  const fetchIndustries = useCallback(async (coreIndustryNames = [], search = '') => {
    try {
      setLoading(true)

      // Always fetch all industries first, then filter if needed
      let allIndustries = []

      if (coreIndustryNames.length === 0) {
        // Fetch all industries without core industry filter
        const searchParam = search ? `&search=${encodeURIComponent(search)}` : ''
        const response = await axios.get(`/performance-wizard/industries/?${searchParam}`)

        if (response.status === 200) {
          allIndustries = response.data || []
        }
      } else {
        // Fetch industries for each selected core industry
        for (const coreIndustryName of coreIndustryNames) {
          const searchParam = search ? `&search=${encodeURIComponent(search)}` : ''
          const response = await axios.get(`/performance-wizard/industries/?core_industry=${encodeURIComponent(coreIndustryName)}${searchParam}`)

          if (response.status === 200) {
            const industriesData = response.data || []
            allIndustries = [...allIndustries, ...industriesData]
          }
        }
      }

      // Remove duplicates based on industry id
      const uniqueIndustries = allIndustries.filter((industry, index, self) =>
        index === self.findIndex(i => i.id === industry.id)
      )

      // Map industries with icons based on core industry
      const mappedIndustries = uniqueIndustries.map(industry => ({
        id: industry.id,
        name: industry.name,
        core_industry: industry.core_industry,
        iconComponent: iconMapping[industry.core_industry?.name] || BusinessIcon
      }))

      setIndustries(mappedIndustries)
    } catch (error) {
      console.error('Error fetching industries:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch industries when component mounts and when search term changes
  useEffect(() => {
    // Always fetch all industries initially, then filter by search if needed
    fetchIndustries([], searchTerm)
  }, [searchTerm, fetchIndustries])



  const handleCategorySelect = (categoryId) => {
    let updatedCategories
    if (selectedCategories.includes(categoryId)) {
      updatedCategories = selectedCategories.filter(id => id !== categoryId)
    } else {
      updatedCategories = [...selectedCategories, categoryId]
    }

    setSelectedCategories(updatedCategories)
    // Save to localStorage
    setLocalStorage('fundWizard_selectedIndustries', updatedCategories)
  }

  const handleRemoveCategory = (categoryId) => {
    const updatedCategories = selectedCategories.filter(id => id !== categoryId)
    setSelectedCategories(updatedCategories)
    // Save to localStorage
    setLocalStorage('fundWizard_selectedIndustries', updatedCategories)
  }

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }




    

  return (
    <div className="step-out-region mt-5">
      <div className="search-section-row gap-1 mb-2 pb-3 pb-1">
        <label className="steps-counts">Step 4<span className='off-white'>/4</span></label>
        <h4 className="text-white mb-0">
          Select Industries
        </h4>
      </div> 
      <div className='w-100 global-fund-search d-flex align-items-center mb-5'>
        <input
          type="text"
          placeholder="Search industries..."
          className="w-100 border p-3 rounded-2 m-auto"
          value={ searchTerm }
          onChange={ handleSearchChange }
        />
      </div>

      {/* Selected Core Industries from Step 3 - Display as Cards (Read-only) */}
      {!loading && coreIndustries.length > 0 && (
        <div className="w-100 mb-4">
          <div className="mb-3">
            <label className='text-white'>Selected Core Industries from Step 3 ({coreIndustries.length})</label>
          </div>
          <div className="row">
            {coreIndustries.map((coreIndustry) => (
              <div key={ coreIndustry.id } className="col-lg-3 col-md-6 col-sm-12 mb-3">
                <div className="category-card active" style={ { cursor: 'default' } }>
                  <div className="category-card-body">
                    <div className="category-content">
                      <div className="category-icon-container">
                        <coreIndustry.iconComponent className="category-icon" />
                      </div>
                      <div className="category-name">
                        {coreIndustry.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tag Input Section */}
      {/* <div className='w-100 mb-4'>
        <div className="mb-3">
          <label className='text-white'>Add Custom Tags</label>
        </div>
        <div className="tag-input-section">
          {selectedTags.length > 0 && (
            <div className="selected-tags-container mb-3">
              {selectedTags.map((tag, index) => (
                <div key={ index } className="tag-item">
                  {tag}
                  <button
                    className="remove-tag-btn"
                    onClick={ () => handleDeleteTag(index) }
                    type="button"
                  >
                    <CloseIcon className="remove-tag-icon" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className='global-fund-search d-flex align-items-center'>
            <input
              type="text"
              placeholder="Enter tag name and press Enter"
              className="w-100 border p-3 rounded-2"
              value={ inputValue }
              onChange={ handleInputChange }
              onKeyDown={ handleKeyPress }
            />
          </div>
        </div>
      </div> */}


      {loading ? (
        <IndustryCardSkeleton />
      ) : (
        <>
          {/* Selected Industries Section */}
          {selectedCategories.length > 0 && (
            <div className="w-100 mb-4">
              <div className="mb-3">
                <label className='text-white'>Selected Industries ({selectedCategories.length})</label>
              </div>
              <div className="selected-categories-container">
                {selectedCategories.map((categoryId) => {
                  const industry = industries.find(ind => ind.id === categoryId)
                  return industry ? (
                    <div key={ categoryId } className="selected-category-tag">
                      <div className="selected-category-content">
                        <span className="selected-category-name">{industry.name}</span>
                        <button
                          className="remove-category-btn"
                          onClick={ () => handleRemoveCategory(categoryId) }
                          type="button"
                        >
                          <CloseIcon className="remove-icon" />
                        </button>
                      </div>
                    </div>
                  ) : null
                })}
              </div>
            </div>
          )}



          {/* All Industries List Section */}
          <div className="w-100 categories-section">
            <div className="mb-3">
              <label className='text-white'>All Industries ({industries.length})</label>
            </div>
            <div className="categories-list-container">
              <div className="categories-grid">
                {industries.map((industry) => (
                  <div
                    key={ industry.id }
                    className={ `category-item ${selectedCategories.includes(industry.id) ? 'selected' : ''}` }
                    onClick={ () => handleCategorySelect(industry.id) }
                  >
                    <div className="category-item-content">
                      <span className="category-item-name">{industry.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="categories-shadow-overlay"></div>
            </div>
          </div>
        </>
      )}

      <div className="button-row justify-content-between">
        <button onClick={ prevStep } className="previous-btn">
          <BackArrowIcon className="back-arrow-icon" /> Back
        </button>
        <button
          onClick={ handleFinish }
          className="btn"
          disabled={ submitting }
        >
          {submitting ? 'Creating Benchmark...' : 'Finish'}
        </button>
      </div>
    </div>
  )
}
