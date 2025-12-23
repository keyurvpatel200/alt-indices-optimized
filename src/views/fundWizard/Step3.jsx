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
import BackArrowIcon from 'icons/white-back-arrow.svg'
import CategoryCardSkeleton from './skeleton/CategoryCardSkeleton'

export default function Step3({ nextStep, prevStep }) {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  // Icon mapping for core industries
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

  // Fetch core industries from API
  const fetchCoreIndustries = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get('/performance-wizard/core-industries/')

      if (response.status === 200) {
        const fetchedIndustries = response.data || []

        // Map API data to category structure with icons
        const mappedCategories = fetchedIndustries.map(industry => ({
          id: industry.id,
          name: industry.name,
          icon: iconMapping[industry.name] || BusinessIcon // fallback icon
        }))

        setCategories(mappedCategories)

        // Store core industries data for Step 4 to access
        setLocalStorage('fundWizard_coreIndustriesData', fetchedIndustries)

        // Load previously selected categories from localStorage
        const savedCategories = getLocalStorage('fundWizard_selectedCoreIndustries')
        if (savedCategories && Array.isArray(savedCategories)) {
          setSelectedCategories(savedCategories)
        }
      }
    } catch (error) {
      console.error('Error fetching core industries:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCoreIndustries()
  }, [fetchCoreIndustries])

  const handleCategorySelect = (categoryId) => {
    let updatedCategories
    if (selectedCategories.includes(categoryId)) {
      updatedCategories = selectedCategories.filter(id => id !== categoryId)
    } else {
      updatedCategories = [...selectedCategories, categoryId]
    }

    setSelectedCategories(updatedCategories)

    // Save to localStorage
    setLocalStorage('fundWizard_selectedCoreIndustries', updatedCategories)
  }
  
    
  return (
    <div className="step-out-region mt-5">
      <div className="search-section-row gap-1 mb-4 pb-3 pb-1">
        <label className="steps-counts">Step 3<span className='off-white'>/4</span></label>
        <h4 className="text-white mb-0">
          Select Core Industries
        </h4>
      </div>
      {/* <div className='w-100 global-fund-search d-flex align-items-center mb-5'>
        <input
          type="text"
          placeholder="Enter fund name or tag"
          className="w-100 border p-3 rounded-2 m-auto"
        />
      </div>  */}
      <div className="w-100">
        <div className="row">
          {loading ? (
            <CategoryCardSkeleton />
          ) : (
            categories.map((category) => (
              <div key={ category.id } className="col-lg-3 col-md-6 col-sm-12 mb-3">
                <div
                  className={ `category-card ${selectedCategories.includes(category.id) ? 'active' : ''}` }
                  onClick={ () => handleCategorySelect(category.id) }
                  style={ { cursor: 'pointer' } }
                >
                  <div className="category-card-body">
                    <div className="category-content">
                      <div className="category-icon-container">
                        <category.icon className="category-icon" />
                      </div>
                      <div className="category-name">
                        {category.name}
                      </div>
                      <div className="category-checkbox-container">
                        <input
                          className="category-checkbox"
                          type="checkbox"
                          name="categorySelection"
                          id={ `category-${category.id}` }
                          checked={ selectedCategories.includes(category.id) }
                          onChange={ () => handleCategorySelect(category.id) }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="button-row justify-content-between">
        <button onClick={ prevStep } className="previous-btn">
          <BackArrowIcon className="back-arrow-icon" /> Back
        </button>
        <button
          onClick={ nextStep }
          className="btn"
          disabled={ selectedCategories.length === 0 }
        >
          Next
        </button>
      </div>
    </div>
  )
}
