import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap'

import { useDispatch } from '@/boot/redux'
import axios from '@/service/axios'
import Grayemail from 'icons/Grayemail.svg'
import Google from 'icons/Google.svg'
import ALTSVG from 'icons/Add copy.svg'
import FirstStep from '../register/FirstStep'
import SecondStep from '../register/SecondStep'
import ThirdStep from '../register/ThirdStep'
import FourStep from '../register/FourStep'
import Candal from '../../../assets/Vector.svg'

export default function Login (args) {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    errors: {},
  })
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  const [page, setPage] = useState(0)
  const textStyle = {
    width: '100%',
    marginTop: '0.25rem',
    color: '#dc3545',
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const login = async e => {
    e.preventDefault()
    const errors = validateForm(formData)
    if (Object.keys(errors).length === 0) {
      try {
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
        // Make a POST request to submit form data
        const response = await axios.post('/login/', formData, { headers })
        if (response.data?.token) {
          dispatch({ type: 'user/onLogin', payload: response.data.token })
          if (response.data.first_login) setModal(!modal)
        }
      } catch (error) {
        if (error.response?.data?.error) {
          const errors = { apiError: error.response.data.error }
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

  const validateForm = data => {
    const errors = {}
    if (!data.username) {
      errors.username = 'Username is required'
    }
    if (!data.password) {
      errors.password = 'Password is required'
    }
    return errors
  }

  const closeBtn = (
    <button className="close" onClick={ toggle } type="button">
      &times;
    </button>
  )

  const FormTitles = ['Select Type', 'Select Type', 'Select Firm', 'Verify Firm']

  const PageDisplay = () => {

    if (page === 0) {
      return <FirstStep formData={ formData } setFormData={ setFormData }/>
    } else if (page === 1) {
      return <SecondStep formData={ formData } setFormData={ setFormData }/>
    } else if (page === 2) {
      return <ThirdStep formData={ formData } setFormData={ setFormData }/>
    } else if (page === 3) {
      return <FourStep formData={ formData } setFormData={ setFormData }/>
    } else {
      return <FirstStep formData={ formData } setFormData={ setFormData }/>
    }
  }

  return (
    <div className="login-wrapper">
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
          <div className="highlight-text">
            <h2>Log in</h2>
          </div>
          <Form className="form-signin" onSubmit={ login }>
            <FormGroup>
              <Label for="exampleEmail">
                Email address
              </Label>
              <div className="input-box">
                <div className="field-icon">
                  <Grayemail/>
                </div>
                <Input id="username"
                  name="username"
                  placeholder="Enter email"
                  type="email"
                  value={ formData.username }
                  invalid={ formData.errors.username }
                  onChange={ handleChange }/>
                <FormFeedback>{ formData.errors.username }</FormFeedback>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">
                Password
              </Label>
              <div className="input-box">
                <div className="field-icon">
                  <Grayemail/>
                </div>
                <Input id="password"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  value={ formData.password }
                  invalid={ formData.errors.password }
                  onChange={ handleChange }/>
                <FormFeedback>{ formData.errors.password }</FormFeedback>
              </div>
            </FormGroup>
            <div style={ textStyle }>
              { formData.errors.apiError }
            </div>

            <div className="forgot-link">
              <FormGroup check inline>
                <Input type="checkbox"/>
                <Label check>
                  Remember me
                </Label>
              </FormGroup>

              <a href="#forgot-password" className="link">Forgot your password?</a>
            </div>
            <Col md={ 12 } className="submit-column">
              {/* <Link to="/dashboard">
                                Login
                            </Link> */ }
              <Button type="submit" className="submit-btn">Login</Button>
            </Col>

            <Col md={ 12 } className="not-a-link">
              <span>Not registered yet? <Link to="/register">Create an Account</Link></span>
            </Col>

            <Col md={ 12 } className="or-section">
              <span>OR</span>
            </Col>

            <Col md={ 12 } className="third-party-login">
              <Button>
                <Google/> Sign in with Google
              </Button>
            </Col>

          </Form>

          <Modal isOpen={ modal } toggle={ toggle } { ...args } centered>
            <ModalHeader toggle={ toggle } close={ closeBtn }>
              <h1>{ FormTitles[page] }</h1>
            </ModalHeader>
            <ModalBody>
              { PageDisplay() }
            </ModalBody>
            <ModalFooter>
              <div className="footer action-btn">
                { page !== 3 &&
                  <>
                    <button className="choose-btn" disabled={ page === 0 } onClick={ () => {
                      setPage((currPage) => currPage - 1)
                    } }>
                      { page === FormTitles.length - 2 ? 'Cancel' : 'Cancel' }
                    </button>
                    <button className="done-btn" onClick={ () => {
                      if (page === FormTitles.length - 1) {
                        alert('FORM SUBMITTED')
                        setModal(!modal)
                      } else {
                        setPage((currPage) => currPage + 1)
                      }
                    } }>
                      { page === FormTitles.length - 2 ? 'Continue' : 'Continue' }
                    </button>
                  </>
                }

                { page === 3 &&
                  <button className="done-btn" onClick={ () => {
                    if (page === FormTitles.length - 1) {
                      setModal(!modal)
                      window.location.href = '/layout/dashboard'
                      setPage(0)
                    } else {
                      setPage((currPage) => currPage + 1)
                    }
                  } }>
                    Done </button>
                }

              </div>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  )
}