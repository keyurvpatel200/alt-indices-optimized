import { useEffect, useState } from 'react'
import { Col, FormGroup, Input, Label, Row } from 'reactstrap'

import axios from '@/service/axios'
import verified from '../../assets/verified.png'
import EditISVG from 'icons/EditIcon.svg'
import CancleSVG from 'icons/Cancel.svg'
import FileSVG from 'icons/File.svg'

export default function UserProfile () {
  const [isEditing, setIsEditing] = useState(false)
  const [profileAvatar, setProfileAvatar] = useState('') // Initialize with an empty string or default avatar URL
  const [ContactformData, setContactFormData] = useState({
    address:
      '',
    city:
      '',
    email:
      '',
    first_name:
      '',
    job_title:
      '',
    last_name:
      '',
    linkedin_url:
      '',
    state_country:
      '',
    telephone:
      '',
    website:
      '',
    zip_code:
      '',
  })
  const [AboutformData, setAboutFormData] = useState({
    name: 'Jane Eyre',
    about: `Based in California, 500 Startups is an early stage
            venture capital firm and accelerator program for
            start-ups. The firm invests globally across a diverse
            range of technology sectors including internet,
            software, mobile platforms, and business and information
            services.`,
  })

  const getAboutInfo = () => {
    axios.get('/about-us/info/')
      .then(response => {
        if (response.status === 200) {
          const { content, title } = response.data
          setAboutFormData(prevState => ({
            ...prevState,
            name: title || prevState.name, // Update 'name' only if 'title' exists
            about: content || prevState.about, // Update 'about' only if 'content' exists
          }))
        }
      })
  }

  const fetchProfilePhoto = async () => {
    try {
      const response = await axios.get('/profile-photo/')
      setProfileAvatar(response.data.photo)
    } catch (error) {
      console.error('Error fetching profile photo', error)
    }
  }

  const getContactInfo = () => {
    axios.get('/contact-details/')
      .then(response => {
        if (response.status === 200) {
          const {
            address,
            city,
            email,
            first_name,
            job_title,
            last_name,
            linkedin_url,
            state_country,
            telephone,
            website,
            zip_code,
          } = response.data
          setContactFormData(prevState => ({
            ...prevState,
            address: address || prevState.address,
            city: city || prevState.city,
            email: email || prevState.email,
            first_name: first_name || prevState.first_name,
            job_title: job_title || prevState.job_title,
            last_name: last_name || prevState.last_name,
            linkedin_url: linkedin_url || prevState.linkedin_url,
            state_country: state_country || prevState.state_country,
            telephone: telephone || prevState.telephone,
            website: website || prevState.website,
            zip_code: zip_code || prevState.zip_code,
          }))
        }
      })
  }

  const handleContactInputChange = (e) => {
    const { name, value } = e.target
    setContactFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  useEffect(() => {
    getAboutInfo()
    getContactInfo()
    fetchProfilePhoto()
  }, [])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    setIsEditing(false)
  }

  const formatURL = (input) => {
    // Remove leading and trailing whitespace
    input = input.trim()

    // Check if the input starts with "www"
    if (input.startsWith('www')) {
      return 'https://' + input
    }

    // Check if the input already has "https://" or "http://"
    if (input.startsWith('http://') || input.startsWith('https://')) {
      return input
    }

    // Otherwise, prepend "https://"
    return 'https://' + input
  }
  const handleSaveClick = () => {
    const data = {
      'address': ContactformData.address,
      'city': ContactformData.city,
      'email': ContactformData.email,
      'first_name': ContactformData.first_name,
      'job_title': ContactformData.job_title,
      'last_name': ContactformData.last_name,
      'linkedin_url': formatURL(ContactformData.linkedin_url),
      'state_country': ContactformData.state_country,
      'telephone': ContactformData.telephone,
      'website': formatURL(ContactformData.website),
      'zip_code': ContactformData.zip_code,
    }
    axios.put('/contact-details/update/', data)
      .then(response => {
        if (response.status === 200) getContactInfo()
      })
    setIsEditing(false)
  }

  return (
    <div className="wrapper-box">
      <div className="user-profile-wrapper">
        <div className="col-sm-12">
          <div className="head-title">
            <h2>User Profile</h2>
            <p>Manage your details, view your tier status.</p>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <div className="user-profile-avatar">
                <figure>
                  <img src={ profileAvatar } alt=""/>
                </figure>
                <h4>{ AboutformData.name }</h4>
                <span>
                  { ContactformData.telephone } <img src={ verified } alt=""/>
                </span>
              </div>
            </div>
            <div className="col-sm-9">
              <div className={ `general-information ${ isEditing ? 'edit-section' : ''
              }` }>
                <div className="col-sm-12 d-flex flex-row justify-content-between align-items-center mb-3 mb-sm-4 w-100">
                  <h3>General information</h3>

                  <span className="d-flex flex-row justify-content-between align-items-center gap-2">
                    <div className="action-icons">
                      { !isEditing && (
                        <div className="edit-btn" title="Edit" onClick={ handleEditClick }>
                          <EditISVG/>
                        </div>
                      ) }
                      { isEditing && (
                        <div className="save-btn" title="Save" onClick={ handleSaveClick }>
                          <FileSVG/>
                        </div>
                      ) }
                      { isEditing && (
                        <div className="can-btn" title="Cancel" onClick={ handleCancelClick }>
                          <CancleSVG/>
                        </div>
                      ) }
                    </div>
                  </span>
                </div>
                <div className="col-sm-12">
                  <Row>
                    <Col md={ 6 }>
                      <FormGroup>
                        <Label for="exampleEmail">First Name</Label>
                        <Input id="firstname"
                          name="first_name"
                          value={ ContactformData.first_name }
                          onChange={ handleContactInputChange }
                          placeholder="Enter First Name"
                          type="text"
                          readOnly={ !isEditing }/>
                      </FormGroup>
                    </Col>
                    <Col md={ 6 }>
                      <FormGroup>
                        <Label for="examplePassword">Last Name</Label>
                        <Input id="lastname"
                          name="last_name"
                          value={ ContactformData.last_name }
                          onChange={ handleContactInputChange }
                          placeholder="Enter Last Name"
                          type="text"
                          readOnly={ !isEditing }/>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={ 6 }>
                      <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input id="companyName"
                          name="email"
                          value={ ContactformData.email }
                          onChange={ handleContactInputChange }
                          placeholder="Enter email"
                          type="text"
                          readOnly={ !isEditing }/>
                      </FormGroup>
                    </Col>
                    <Col md={ 6 }>
                      <FormGroup>
                        <Label for="examplePassword">Job Title</Label>
                        <Input id="job-title"
                          name="job_title"
                          value={ ContactformData.job_title }
                          onChange={ handleContactInputChange }
                          placeholder="Enter Job title"
                          type="text"
                          readOnly={ !isEditing }/>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={ 6 }>
                      <FormGroup>
                        <Label for="exampleEmail">Telephone</Label>
                        <Input id="telephone"
                          name="telephone"
                          value={ ContactformData.telephone }
                          onChange={ handleContactInputChange }
                          placeholder="Enter number"
                          type="text"
                          readOnly={ !isEditing }/>
                      </FormGroup>
                    </Col>
                    <Col md={ 6 }>
                      <FormGroup>
                        <Label for="examplePassword">City</Label>
                        <Input id="city"
                          name="city"
                          value={ ContactformData.city }
                          onChange={ handleContactInputChange }
                          placeholder="Enter city"
                          type="text"
                          readOnly={ !isEditing }/>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={ 6 }>
                      <FormGroup>
                        <Label for="exampleEmail">Country</Label>
                        <Input id="country"
                          name="state_country"
                          value={ ContactformData.state_country }
                          onChange={ handleContactInputChange }
                          placeholder="Enter Country"
                          type="text"
                          readOnly={ !isEditing }/>
                      </FormGroup>
                    </Col>
                    <Col md={ 6 }>
                      <FormGroup>
                        <Label for="examplePassword">Zip code</Label>
                        <Input id="zipcode"
                          name="zip_code"
                          value={ ContactformData.zip_code }
                          onChange={ handleContactInputChange }
                          placeholder="Enter zipcode"
                          type="text"
                          readOnly={ !isEditing }/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={ 6 }>
                      <FormGroup>
                        <Label for="exampleEmail">Address</Label>
                        <Input id="address"
                          name="address"
                          value={ ContactformData.address }
                          onChange={ handleContactInputChange }
                          placeholder="Enter Address"
                          type="text"
                          readOnly={ !isEditing }/>
                      </FormGroup>
                    </Col>
                    <Col md={ 6 }>
                      <FormGroup>
                        <Label for="examplePassword">Website</Label>
                        <Input id="website"
                          name="website"
                          value={ ContactformData.website }
                          onChange={ handleContactInputChange }
                          placeholder="Enter Website"
                          type="text"
                          readOnly={ !isEditing }/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={ 12 }>
                      <FormGroup>
                        <Label for="examplePassword">Linkedin URL</Label>
                        <Input id="url"
                          name="linkedin_url"
                          value={ ContactformData.linkedin_url }
                          onChange={ handleContactInputChange }
                          placeholder="Enter Linkedin URL"
                          type="text"
                          readOnly={ !isEditing }/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    {/* <Col md={12}>
                      <button className="updat-btn">Update</button>
                    </Col> */ }
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}