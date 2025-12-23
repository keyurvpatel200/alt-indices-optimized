import { useEffect, useState } from 'react'
import { Button, FormGroup, Input, Label } from 'reactstrap'

import axios from '@/service/axios'

export default function FirstStep ({ formData, setFormData }) {
  const [funds, setFunds] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredFunds, setFilteredFunds] = useState([])

  // Fetch fund data on component mount
  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await axios.get('/fund_id_name/')
        setFunds(response.data)
        setFilteredFunds(response.data) // Set initial filtered funds
      } catch (error) {
        console.error('Error fetching fund data:', error)
      }
    }

    fetchFunds()
  }, [])

  // Handle radio button change
  const handleRadioChange = (e) => {
    const selectedFundId = e.target.value
    const selectedFund = filteredFunds.find((fund) => fund.fund_id === parseInt(selectedFundId))

    setFormData({
      ...formData,
      selectedFund: selectedFund,
    })
  }

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Handle search by name
  const handleSearch = async () => {
    try {
      const response = await axios.get('/search_fund/', { params: { name: searchTerm } })
      setFilteredFunds(response.data)
    } catch (error) {
      console.error('Error searching by name:', error)
    }
  }

  // Clear the search and show all funds
  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredFunds(funds) // Reset to show all funds
  }

  return (
    <div className="common-box">
      <FormGroup tag="fieldset">
        <legend>I&apos;m selecting a fund...</legend>
        { filteredFunds.length > 0 ? (
          filteredFunds.map((fund) => (
            <FormGroup check key={ fund.fund_id }>
              <Input name="fundSelection"
                type="radio"
                value={ fund.fund_id }
                onChange={ handleRadioChange }/>
              { ' ' }
              <Label check>
                { fund.name }
              </Label>
            </FormGroup>
          ))
        ) : (
          <p>No funds found</p>
        ) }
      </FormGroup>

      {/* Search Input */ }
      <FormGroup>
        <Label for="search">Search Fund by Name</Label>
        <Input type="text"
          name="search"
          id="search"
          placeholder="Enter fund name"
          value={ searchTerm }
          onChange={ handleSearchInputChange }/>
        <Button color="primary" onClick={ handleSearch } style={ { marginRight: '10px' } }>
          Search
        </Button>
        <Button color="secondary" onClick={ handleClearSearch }>
          Clear
        </Button>
      </FormGroup>
    </div>
  )
}