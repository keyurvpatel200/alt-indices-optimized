import { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

import axios from '@/service/axios'
import DownloadSVG from 'icons/Download.svg'
import BenchmarkingGraySVG from 'icons/sidebar/BenchmarkingGray.svg'
import FundSVG from 'icons/sidebar/Fund.svg'
import ReportSVG from 'icons/sidebar/Report.svg'
import finanace from '../../assets/barchart.svg'
import Form from '../wizard/Form'
import FundWizardForm from '../fundWizard/Form'
import ProgressBar from '../fundWizard/ProgressBar'
import CustomScrollbar from '../../components/CustomScrollbar'

export default function Dashboard() {
  const [modal, setModal] = useState(false)
  const [fundWizardModal, setFundWizardModal] = useState(false)
  const [firmName, setFirmName] = useState(null)
  const [funds, setFunds] = useState([])
  const [step, setStep] = useState(1)
  const [fundWizardStep, setFundWizardStep] = useState(1)
  const [widgetData, setWidgetData] = useState({})

  const getAboutInfo = () => {
    axios
      .get('/firm_name/')
      .then((response) => {
        if (response.status === 200) {
          setFirmName(response.data.firm_name)
        }
      })
  }

  const fetchTopFunds = () => {
    axios.get('top-3-fund')
      .then(response => {
        if (response.status === 200) setFunds(response.data)
      })
  }

  useEffect(() => {
    getAboutInfo()
    fetchTopFunds()
  }, [])

  const toggle = (flag=true) => {
    setModal(!modal)
    setStep(1)
    if(flag){
      setWidgetData({})
      localStorage.removeItem('widgetData')
    }
  }

  const toggleFundWizard = () => {
    setFundWizardModal(!fundWizardModal)
    setFundWizardStep(1)
  }

  const startUpData = [
    {
      id: 1,
      name: 'Eisai Name Foud PE',
      company: 'Eisai Co.Ltd',
      date: 'Nov 2024',
      funding: '$10,50,20',
      domain: 'Healthcard',
    },
    {
      id: 2,
      name: 'Eisai Name Foud PE',
      company: 'Eisai Co.Ltd',
      date: 'Nov 2024',
      funding: '$20,50,20',
      domain: 'Healthcard',
    },
    {
      id: 3,
      name: 'Eisai Name Foud PE',
      company: 'Eisai Co.Ltd',
      date: 'Oct 2024',
      funding: '$50,50,20',
      domain: 'Healthcard',
    },
    {
      id: 4,
      name: 'Eisai Name Foud PE',
      company: 'Eisai Co.Ltd',
      date: 'Dec 2024',
      funding: '$25,50,20',
      domain: 'Healthcard',
    },
    {
      id: 5,
      name: 'Eisai Name Foud PE',
      company: 'Eisai Co.Ltd',
      date: 'Jul 2024',
      funding: '$11,50,20',
      domain: 'Healthcard',
    },
  ]

  return (
    <div className='wrapper-box'>
      <div className='dashboard-wrapper'>
        <div className='updated-dashboard-section'>
          <div className='left-bar'>
            <div className='top-heading'>
              <h3>{ firmName }</h3>
              <div className='button-grp'>
                <button className='shown-all'>Show all</button>
                <div className='dropdown'>
                  <button
                    className='launch-btn'
                    type='button'
                    id='dropdownMenuButton'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    <DownloadSVG /> Launch
                  </button>
                  <ul
                    className='dropdown-menu dropdown-menu-end'
                    aria-labelledby='dropdownMenuButton'
                  >
                    <li>
                      <a onClick={ toggleFundWizard } className='dropdown-item'>
                        <span>
                          <FundSVG />
                        </span>
                        Fund
                      </a>
                    </li>
                    <li>
                      <a  onClick={ ()=> toggle(false) } className='dropdown-item'>
                        <span>
                          <BenchmarkingGraySVG />
                        </span>
                        Benchmark
                      </a>
                    </li>
                    <li>
                      <a href='#report' className='dropdown-item'>
                        <span>
                          <ReportSVG />
                        </span>{ ' ' }
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='add-fund-section d-none' title='Add fund'>
              <div>
                <svg
                  width='24'
                  height='25'
                  viewBox='0 0 24 25'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M11 11.5V5.5H13V11.5H19V13.5H13V19.5H11V13.5H5V11.5H11Z'
                    fill='#2F2B43'
                  />
                </svg>
              </div>
              <h4>Add new fund</h4>
              <label>Click here to start</label>
            </div>

            <div className='calculate-section'>
              { funds?.map((fund, index) => (
                <div
                  key={ index }
                  className={ `col-box fund-${(index % 3) + 1}` }
                >
                  <div className='top-col'>
                    <div className='name-fund'>
                      <div className='avatar-detail'>
                        <span>{ fund.fund_name }</span>
                      </div>
                    </div>
                  </div>
                  <div className='btm-col'>
                    <span>
                      Fund Target Sizes <br /> (USD MN){ ' ' }
                      <strong>{ (fund.net_irr / 1000).toFixed(1) }%</strong>
                    </span>
                    <label>+${ fund.fund_size_usd.toLocaleString() }</label>
                  </div>
                </div>
              )) }
            </div>
            <div className='col-sm-12 half-width mt-3'>
              <div className='discover-startup'>
                <div className='title'>
                  <h3>Portfolio Activity</h3>
                  <button>View all</button>
                </div>
                <div className='list-of-startup'>
                  <div className='no-data d-none'>No Data</div>
                  { startUpData.map((item) => (
                    <div className='start-up-box' key={ item.id }>
                      <div className='fund-avatar'>
                        <div className='start-up-name'>
                          <label>{ item.name }</label>
                          <p>{ item.company }</p>
                        </div>
                      </div>
                      <div className='fund-amount'>
                        <div className='start-up-funding'>
                          <span>Date</span>
                          <label>{ item.date }</label>
                        </div>
                        <div className='start-up-funding'>
                          <span>{ item.funding }</span>
                          <label>Total funding</label>
                        </div>
                        <div className='domain-name'>{ item.domain }</div>
                      </div>
                    </div>
                  )) }
                </div>
              </div>
            </div>
          </div>
          <div className='chart-bar-section'>
            <div className='side-bar-chart'>
              <label>Side by side chart</label>
              <div className='w-100'>
                <img src={ finanace } alt='Chart' />
              </div>
            </div>
            <div className='side-bar-chart mt-4'>
              <label>Growing Business Section</label>
              <div className='w-100'>
                <img src={ finanace } alt='Chart' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={ modal }
        toggle={ toggle }
        fullscreen
        className='performance-modal'
      >
        <ModalHeader toggle={ toggle }>Performance Assessment Wizard</ModalHeader>
        <ModalBody className='Performance-name'>
          <CustomScrollbar height = 'calc(100vh - 70px)'>
            <Form step={ step } setStep={ setStep } widgetData={ widgetData } setWidgetData={ setWidgetData } setModal={ setModal } />
          </CustomScrollbar>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={ fundWizardModal }
        toggle={ toggleFundWizard }
        fullscreen
        className='performance-modal fund-wizard-modal'
      >
        <ModalHeader toggle={ toggleFundWizard }>
          Fund Wizard
          <ProgressBar currentStep={ fundWizardStep } totalSteps={ 4 } />
        </ModalHeader>
        <ModalBody className='Performance-name'>
          <CustomScrollbar height = 'calc(100vh - 70px)'>
            <FundWizardForm
              step={ fundWizardStep }
              setStep={ setFundWizardStep }
              setModal={ setFundWizardModal }
              selectedFund={ null }
            />
          </CustomScrollbar>
        </ModalBody>
      </Modal>
    </div>
  )
}