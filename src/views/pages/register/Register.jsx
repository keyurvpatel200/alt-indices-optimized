import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'

import axios from '@/service/axios'
import ALTSVG from 'icons/Add copy.svg'
import Candal from '../../../../src/assets/Vector.svg'

export default function Register () {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    email: '',
    password: '',
    state: '',
    country: 'USA',
    errors: {},
  })
  const [states, setStates] = useState([])

  useEffect(() => {
    if (formData.country) fetchStates(formData.country)
  }, [formData.country])

  const fetchStates = async (country) => {
    try {
      const response = await axios.get(`/provinces-or-states/?country=${ country }`)
      if (country === 'USA') setStates(response.data.states || [])
      else setStates(response.data.provinces || [])
    } catch (error) {
      console.error('Error fetching states:', error)
      setStates([]) // Ensure states is always an array even on error
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errors = validateForm(formData)
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('/register/', formData)
        if (response.status && response.status === 201) {
          window.location.href = '/login'
        }
      } catch (error) {
        console.error('Error submitting form:', error)
        if (error.response?.data?.email) {
          const errors = { email: error.response.data.email }
          setFormData({
            ...formData,
            errors,
          })
        }
      }
    } else {
      setFormData({
        ...formData,
        errors,
      })
    }
  }

  const handleCancel = async e => {
    e.preventDefault()
    window.location.href = '/'
  }

  /**
   *
   * @param {*} data
   * @returns
   */
  const validateForm = data => {
    const errors = {}
    if (!data.first_name.trim()) {
      errors.first_name = 'FirstName is required'
    }
    if (!data.last_name.trim()) {
      errors.last_name = 'LastName is required'
    }
    if (!data.company_name.trim()) {
      errors.company_name = 'CompanyName is required'
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid'
    }
    if (!data.state) {
      errors.state = 'State is required'
    }
    if (!data.country) {
      errors.country = 'Country is required'
    }
    if (!data.password) {
      errors.password = 'Password is required'
    } else if (
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W|_).{8,}/.test(data.password)
    ) {
      errors.password =
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long'
    }
    return errors
  }

  return (
    <div className="register-wrapper">
      <div className="common-section">
        <div className="right-bar">
          <div className="logo-name">
            <ALTSVG/>
          </div>
          <div className="highlight-b">
            <h4>Join Us</h4>
            <p>Turn Data into Confidence & Tell Your Investment Story</p>
          </div>
          <div className="vector-img">
            <img alt="" src={ Candal }/>
          </div>
        </div>
        <div className="left-bar">
          <div className="common-box">
            <div className="highlight-text">
              <h2>Sign Up Now</h2>
            </div>
            <Form onSubmit={ handleSubmit }>
              <Row>
                <Col md={ 12 } lg={ 6 }>
                  <FormGroup>
                    <Label for="first_name">
                      FirstName<span className="astrick">*</span>
                    </Label>
                    <Input id="first_name"
                      name="first_name"
                      placeholder="First Name"
                      type="text"
                      value={ formData.first_name }
                      onChange={ handleChange }
                      invalid={ formData.errors.first_name }/>
                    <FormFeedback>{ formData.errors.first_name }</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={ 12 } lg={ 6 }>
                  <FormGroup>
                    <Label for="last_name">
                      LastName <span className="astrick">*</span>
                    </Label>
                    <Input id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      type="text"
                      value={ formData.last_name }
                      onChange={ handleChange }
                      invalid={ formData.errors.last_name }/>
                    <FormFeedback>{ formData.errors.last_name }</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={ 12 } lg={ 6 }>
                  <FormGroup>
                    <Label for="company_name">
                      Company Name<span className="astrick">*</span>
                    </Label>
                    <Input id="company_name"
                      name="company_name"
                      placeholder="Company Name"
                      type="text"
                      value={ formData.company_name }
                      onChange={ handleChange }
                      invalid={ formData.errors.company_name }/>
                    <FormFeedback>{ formData.errors.company_name }</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={ 12 } lg={ 6 }>
                  <FormGroup>
                    <Label for="email">
                      Email <span className="astrick">*</span>
                    </Label>
                    <Input id="email"
                      name="email"
                      placeholder="Enter Email"
                      type="email"
                      value={ formData.email }
                      onChange={ handleChange }
                      invalid={ formData.errors.email }/>
                    <FormFeedback>{ formData.errors.email }</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={ 12 } lg={ 6 }>
                  <FormGroup>
                    <Label for="password">
                      Password <span className="astrick">*</span>
                    </Label>
                    <Input id="password"
                      name="password"
                      placeholder="Enter Password"
                      type="password"
                      value={ formData.password }
                      onChange={ handleChange }
                      invalid={ formData.errors.password }/>
                    <FormFeedback>{ formData.errors.password }</FormFeedback>
                  </FormGroup>
                </Col>
                <Col md={ 12 } lg={ 6 }>
                  <FormGroup>
                    <Label for="country">
                      Country / Region<span className="astrick">*</span>
                    </Label>
                    <Input id="country"
                      name="country"
                      type="select"
                      value={ formData.country }
                      onChange={ handleChange }
                      invalid={ formData.errors.country }>
                      <option disabled>
                        State / Province
                      </option>
                      <option>
                        USA
                      </option>
                      <option>
                        Canada
                      </option>
                    </Input>
                    <FormFeedback>{ formData.errors.country }</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={ 12 } lg={ 6 }>
                  <FormGroup>
                    <Label for="state">
                      State / Province<span className="astrick">*</span>
                    </Label>
                    <Input id="state"
                      name="state"
                      type="select"
                      value={ formData.state }
                      onChange={ handleChange }
                      invalid={ formData.errors.state }>
                      <option>Select State / Province</option>
                      { states && states.map((state, index) => (
                        <option key={ index } value={ state }>
                          { state }
                        </option>
                      )) }
                    </Input>
                    <FormFeedback>{ formData.errors.state }</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>

              <div className="row-panel action-btn">
                <Button className="cancel-btn" onClick={ handleCancel }>Cancel</Button>
                <Button className="submit-btn" type="submit">Continue</Button>
              </div>
              <div className="row-panel login-option">
                Already have an account?<NavLink to="/login">Login</NavLink>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}