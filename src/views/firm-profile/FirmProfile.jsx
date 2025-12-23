import { useEffect, useState } from 'react'

import axios from '@/service/axios'
import camera from '../../assets/icons/camera.png'
import EditISVG from 'icons/EditIcon.svg'
import CancleSVG from 'icons/Cancel.svg'
import FileSVG from 'icons/File.svg'

export default function UserProfile () {
  const [isAboutEditing, setIsAboutEditing] = useState(false)
  const [isContactEditing, setIsContactEditing] = useState(false)
  const [isProfileEditing, setIsProfileEditing] = useState(false)
  const [AboutformData, setAboutFormData] = useState({
    name: 'Jane Eyre',
    about: `Based in California, 500 Startups is an early stage
            venture capital firm and accelerator program for
            start-ups. The firm invests globally across a diverse
            range of technology sectors including internet,
            software, mobile platforms, and business and information
            services.`,
  })
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

  const [ProfileformData, setProfileFormData] = useState({
    firm_type: '',
    years_established: '',
    currency_managed: '',
    pe_main_firm_strategy: '',
    aum_cur_mn: '',
    aum_usd_mn: '',
    aum_eur_mn: '',
  })

  const [ManagerId, setManagerId] = useState(null)
  const [avatar, setAvatar] = useState('') // Initialize with an empty string or default avatar URL

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

  const getContactInfo = () => {
    axios.get('contact-details/')
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

  const getFundManagerProfileInfo = () => {
    axios.get('/firm-manager-fund-profile/')
      .then(response => {
        if (response.status === 200) {
          const {
            id,
            firm_type,
            years_established,
            currency_managed,
            pe_main_firm_strategy,
            aum_cur_mn,
            aum_usd_mn,
            aum_eur_mn,
          } = response.data
          setManagerId(id)
          setProfileFormData(prevState => ({
            ...prevState,
            firm_type: firm_type || prevState.firm_type,
            years_established: years_established || prevState.years_established,
            currency_managed: currency_managed || prevState.currency_managed,
            pe_main_firm_strategy: pe_main_firm_strategy || prevState.pe_main_firm_strategy,
            aum_cur_mn: aum_cur_mn || prevState.aum_cur_mn,
            aum_usd_mn: aum_usd_mn || prevState.aum_usd,
            aum_eur_mn: aum_eur_mn || prevState.aum_eur_mn,
          }))
        }
      })
  }

  const fetchProfilePhoto = async () => {
    try {
      const response = await axios.get('/profile-photo/')
      setAvatar(response.data.photo)
    } catch (error) {
      console.error('Error fetching profile photo', error)
    }
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]

    if (file) {
      const formData = new FormData()
      formData.append('profile_photo', file)
      try {
        const response = await axios.put('/profile-photo/', formData)
        setAvatar(response.data.photo)
      } catch (error) {
        console.error('Upload failed', error)
      }
    }
  }

  useEffect(() => {
    getAboutInfo()
    getContactInfo()
    getFundManagerProfileInfo()
    fetchProfilePhoto()
  }, [])

  const AbouthandleEditClick = () => {
    setIsAboutEditing(true)
  }

  const AbouthandleCancelClick = () => {
    setIsAboutEditing(false)
  }

  const ContacthandleEditClick = () => {
    setIsContactEditing(true)
  }

  const ContacthandleCancelClick = () => {
    setIsContactEditing(false)
  }

  const ProfilehandleEditClick = () => {
    setIsProfileEditing(true)
  }

  const ProfilehandleCancelClick = () => {
    setIsProfileEditing(false)
  }

  const AbouthandleSaveClick = () => {
    const data = {
      'title': AboutformData.name,
      'content': AboutformData.about,
    }
    axios.put('/about-us/info/', data)
      .then(response => {
        if (response.status === 200) getAboutInfo()
      })
    setIsAboutEditing(false)
  }

  const formatURL = (input) => {
    // Remove leading and trailing whitespace
    input = input.trim()

    // Check if the input starts with "www"
    if (input.startsWith('www')) return 'https://' + input

    // Check if the input already has "https://" or "http://"
    if (input.startsWith('http://') || input.startsWith('https://')) {
      return input
    }

    // Otherwise, prepend "https://"
    return 'https://' + input
  }

  const ContacthandleSaveClick = () => {
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
    setIsContactEditing(false)
  }

  const ProfilehandleSaveClick = () => {
    const data = {
      'address': ContactformData.address,
      'city': ContactformData.city,
      'email': ContactformData.email,
      'first_name': ContactformData.first_name,
      'job_title': ContactformData.job_title,
      'last_name': ContactformData.last_name,
      'linkedin_url': ContactformData.linkedin_url,
      'state_country': ContactformData.state_country,
      'telephone': ContactformData.telephone,
      'website': ContactformData.website,
      'zip_code': ContactformData.zip_code,
    }
    axios.put(`/firm-manager-fund-profile/${ ManagerId }/`, data)
      .then(response => {
        if (response.status === 200) {
          getFundManagerProfileInfo()
        }
      })
    setIsProfileEditing(false)
  }

  const handleAboutInputChange = (e) => {
    const { name, value } = e.target
    setAboutFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleContactInputChange = (e) => {
    const { name, value } = e.target
    setContactFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target
    setProfileFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className="wrapper-box">
      <div className="profile-wrapper">
        <div className="col-sm-12">
          <div className="row">
            <div className="col-sm-12 gap-in">
              <div className={ `your-profile user-cmn-section ${ isAboutEditing ? 'edit-section' : ''
              }` }>
                <div className="head">
                  <label>Basic Details</label>
                  <span>Joined 2/6/23</span>
                </div>
                <div className="user-profile-avt">
                  <div className="avt-img">
                    <img src={ avatar } alt=""/>
                    { isAboutEditing && (
                      <span className="upload-over">
                        <img src={ camera } alt=""/>
                        <input type="file" accept="image/*" onChange={ handleFileChange }/>
                      </span>
                    ) }
                  </div>

                  <div className="action-icons">
                    { !isAboutEditing && (
                      <div className="edit-btn" title="Edit" onClick={ AbouthandleEditClick }>
                        <EditISVG/>
                      </div>
                    ) }
                    { isAboutEditing && (
                      <div className="save-btn" title="Save" onClick={ AbouthandleSaveClick }>
                        <FileSVG/>
                      </div>
                    ) }
                    { isAboutEditing && (
                      <div className="can-btn" title="Cancel" onClick={ AbouthandleCancelClick }>
                        <CancleSVG/>
                      </div>
                    ) }
                  </div>
                </div>
                <div className="user-prf-name">
                  <div className="detail-box">
                    <input className="name"
                      type="text"
                      name="name"
                      value={ AboutformData.name }
                      onChange={ handleAboutInputChange }
                      readOnly={ !isAboutEditing }/>
                    <div className="About-section">
                      <label className="mb-2">
                        <b>About us</b>
                      </label>
                      <textarea readOnly={ !isAboutEditing }
                        value={ AboutformData.about }
                        name="about"
                        onChange={ handleAboutInputChange }/>
                    </div>
                  </div>
                  {/* <button className="edit-btn"><img src={pencil} /> Edit</button> */ }
                </div>
              </div>
            </div>

            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div className={ `user-cmn-section ${ isContactEditing ? 'edit-section' : ''
                  }` }>
                    <div className="title-name">
                      Contact Details
                      <div className="action-icons">
                        { !isContactEditing && (
                          <div className="edit-btn" title="Edit" onClick={ ContacthandleEditClick }>
                            <EditISVG/>
                          </div>
                        ) }
                        { isContactEditing && (
                          <div className="save-btn" title="Save" onClick={ ContacthandleSaveClick }>
                            <FileSVG/>
                          </div>
                        ) }
                        { isContactEditing && (
                          <div className="can-btn"
                            title="Cancel"
                            onClick={ ContacthandleCancelClick }>
                            <CancleSVG/>
                          </div>
                        ) }
                      </div>
                    </div>

                    <div className="user-field-section">
                      <span className="category">Primary</span>
                      <div className="cate-one">
                        <div className="col-box">
                          <label>City</label>
                          <span>
                            <input type="text"
                              name="city"
                              value={ ContactformData.city }
                              onChange={ handleContactInputChange }
                              readOnly={ !isContactEditing }/>
                          </span>
                        </div>
                        <div className="col-box">
                          <label>Address</label>
                          <span>
                            <input type="text"
                              name="address"
                              value={ ContactformData.address }
                              onChange={ handleContactInputChange }
                              readOnly={ !isContactEditing }/>
                          </span>
                        </div>
                        <div className="col-box">
                          <label>State/Country</label>
                          <span>
                            <input type="text"
                              name="state_country"
                              value={ ContactformData.state_country }
                              onChange={ handleContactInputChange }
                              readOnly={ !isContactEditing }/>
                          </span>
                        </div>
                        <div className="col-box">
                          <label>Zip Code</label>
                          <span>
                            <input type="text"
                              name="zip_code"
                              value={ ContactformData.zip_code }
                              onChange={ handleContactInputChange }
                              readOnly={ !isContactEditing }/>
                          </span>
                        </div>
                        <div className="col-box">
                          <label>Website</label>
                          <span>
                            <input type="text"
                              name="website"
                              value={ ContactformData.website }
                              onChange={ handleContactInputChange }
                              readOnly={ !isContactEditing }/>
                          </span>
                        </div>
                        <div className="col-box">
                          <label>Email</label>
                          <span>
                            <input type="text"
                              name="email"
                              value={ ContactformData.email }
                              onChange={ handleContactInputChange }
                              readOnly={ !isContactEditing }/>
                          </span>
                        </div>
                        <div className="col-box">
                          <label>Telephone</label>
                          <span>
                            <input type="text"
                              name="telephone"
                              value={ ContactformData.telephone }
                              onChange={ handleContactInputChange }
                              readOnly={ !isContactEditing }/>
                          </span>
                        </div>
                        <div className="col-box">
                          <label>Linkedin URL</label>
                          <span>
                            <input type="text"
                              name="linkedin_url"
                              value={ ContactformData.linkedin_url }
                              onChange={ handleContactInputChange }
                              readOnly={ !isContactEditing }/>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-12 col-md-6 gap-in">
                  <div className={ `user-cmn-section ${ isProfileEditing ? 'edit-section' : ''
                  }` }>
                    <div className="title-name">
                      Fund Manager Profile
                      <div className="action-icons">
                        { !isProfileEditing && (
                          <div className="edit-btn" title="Edit" onClick={ ProfilehandleEditClick }>
                            <EditISVG/>
                          </div>
                        ) }
                        { isProfileEditing && (
                          <div className="save-btn" title="Save" onClick={ ProfilehandleSaveClick }>
                            <FileSVG/>
                          </div>
                        ) }
                        { isProfileEditing && (
                          <div className="can-btn"
                            title="Cancel"
                            onClick={ ProfilehandleCancelClick }>
                            <CancleSVG/>
                          </div>
                        ) }
                      </div>
                    </div>
                    <div className="user-field-section">
                      <span className="category">Primary</span>
                      <div className="cate-one">
                        <div className="col-box">
                          <label>Firm Type</label>
                          <span>
                            <input type="text"
                              name="firm_type"
                              value={ ProfileformData.firm_type }
                              onChange={ handleProfileInputChange }
                              readOnly/>
                          </span>
                        </div>
                        <div className="col-box">
                          <label>Year EST</label>
                          <span>
                            <input type="text"
                              name="years_established"
                              value={ ProfileformData.years_established }
                              onChange={ handleProfileInputChange }
                              readOnly={ !isProfileEditing }/>
                          </span>
                        </div>
                        <div className="col-box">
                          <label>Currency of fund managed</label>
                          <span>
                            <input type="text"
                              name="currency_managed"
                              value={ ProfileformData.currency_managed }
                              onChange={ handleProfileInputChange }
                              readOnly={ !isProfileEditing }/>
                          </span>
                        </div>
                        <div className="col-box">
                          <label>PE: Main Firm Strategy</label>
                          <span>
                            <input type="text"
                              name="pe_main_firm_strategy"
                              value={ ProfileformData.pe_main_firm_strategy }
                              onChange={ handleProfileInputChange }
                              readOnly={ !isProfileEditing }/>
                          </span>
                        </div>
                        <div className="col-box">
                          <label>AUM (CURR MN)</label>
                          <span>
                            <input type="text"
                              name="aum_curr_mn"
                              value={ ProfileformData.aum_cur_mn }
                              onChange={ handleProfileInputChange }
                              readOnly={ !isProfileEditing }/>
                          </span>
                        </div>
                        <div className="col-box">
                          <label>AUM (USD MN)</label>
                          <span>
                            <input type="text"
                              name="aum_usd_mn"
                              value={ ProfileformData.aum_usd_mn }
                              onChange={ handleProfileInputChange }
                              readOnly={ !isProfileEditing }/>
                          </span>
                        </div>
                        <div className="col-box">
                          <label>AUM (EUR MN)</label>
                          <span>
                            <input type="text"
                              name="aum_eur_mn"
                              value={ ProfileformData.aum_eur_mn }
                              onChange={ handleProfileInputChange }
                              readOnly={ !isProfileEditing }/>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End of Section */ }
    </div>
  )
}