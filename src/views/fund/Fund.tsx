// ** React Imports
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { Modal, ModalBody, ModalHeader } from 'reactstrap'

// ** Mui Components Imports
import '@mui/icons-material/Archive'

// ** Custom Components Imports
import CommonConfirmationModal from '../../components/common/CommonConfirmationModal'
import CommonLoader from '../../components/common/CommonLoader'
import { IFundDetails, IPinAndDashValue } from '../../interface/fund'
import FundListView from './FundListView'

// ** Redux Actions and Reducers Imports
import { StoreType } from '@/service/store'
import { fetchFundsListApi, updateFundsData } from './state'

// ** Utils Imports
import { handleCloseModal } from '@/utils/utils'

// ** Asset Imports
import plus from '../../assets/images/round-add-icon.svg'

export default function Fund() {
  // **Hooks
  const dispatch = useDispatch()
  // **States
  const [anchorEls, setAnchorEls] = useState<{
    [key: number]: React.MouseEvent<HTMLButtonElement, MouseEvent> | null | string
  }>({})
  const [pinAndDashValue, setPinAndDashValue] = useState<IPinAndDashValue>({
    key: '',
    value: '',
    fund_id: ''
  })
  const [fundWizardModal, setFundWizardModal] = useState(false)
  const [, setFundWizardStep] = useState(1)
  const [, setSelectedFundForWizard] = useState<IFundDetails | null>(null)

  const {
    fundsList = [],
    loader,
    typeLoader
  } = useSelector((state: StoreType) => ({
    fundsList: state?.funds?.fundData?.results,
    loader: state?.funds?.loader,
    typeLoader: state?.funds?.typeLoader
  }))

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    setAnchorEls((prev: any) => ({ ...prev, [id]: event.currentTarget }))
  }

  const handleClose = (id: string) => {
    setAnchorEls((prev: any) => ({ ...prev, [id]: null }))
  }

  const toggleFundWizard = (fund?: IFundDetails) => {
    setFundWizardModal(!fundWizardModal)
    setFundWizardStep(1)
    if (fund) {
      setSelectedFundForWizard(fund)
    }
  }

  const commonSetLoading = (
    type: string,
    loader: boolean = false,
    typeLoader: string = 'fundsList'
  ) => {
    dispatch({
      type: type,
      payload: { loader, typeLoader }
    })
  }

  const onConfirm = async () => {
    commonSetLoading('funds/setFundLoader', true, 'fundPinAndUnpinModal')
    await updateFundsData(pinAndDashValue?.fund_id, {
      [pinAndDashValue?.key]: pinAndDashValue?.value
    })
      .then(async () => {
        setPinAndDashValue({
          key: '',
          value: '',
          fund_id: ''
        })
        handleCloseModal(
          pinAndDashValue?.key === 'pin_to_dashboard'
            ? !pinAndDashValue?.value
              ? 'unPinDashboardFundModal'
              : 'pinDashboardFundModal'
            : pinAndDashValue?.key === 'show_on_profile' && !pinAndDashValue?.value
              ? 'hideDashboardFundModal'
              : 'showPinDashboardFundModal'
        )
        
        commonSetLoading('funds/setFundLoader', false, 'fundPinAndUnpinModal')
        fetchFundsList()
      })
      .catch(() => {
        commonSetLoading('funds/setFundLoader', false, 'fundPinAndUnpinModal')
      })
  }

  // ** Api Call
  const fetchFundsList = useCallback(async () => {
    commonSetLoading('funds/setFundLoader', true)
    await fetchFundsListApi(1)
      .then((response) => {
        dispatch({ type: 'funds/setList', payload: response })
        commonSetLoading('funds/setFundLoader', false)
      })
      .catch(() => {
        commonSetLoading('funds/setFundLoader', false)
      })
  }, [])

  useEffect(() => {
    fetchFundsList()
  }, [fetchFundsList])

  return loader && typeLoader === 'fundsList' ? (
    <div className='common-loader'>
      <CommonLoader />
    </div>
  ) : (
    <div>
      <div className='list-of-fund-number'>{fundsList?.length} Funds</div>
      <div className='add-fund-pin-list'>
        <Link to='/layout/fund/new-fund' className='add-fund-card'>
          <img src={ plus } alt='' />
          <label>Add new fund</label>
        </Link>

        {
          fundsList?.length > 0 &&
          fundsList?.map((card: IFundDetails) => (
            <React.Fragment key={ card.id }>
              <FundListView
                anchorEls={ anchorEls }
                card={ card }
                handleClick={ handleClick }
                handleClose={ handleClose }
                setPinAndDashValue={ setPinAndDashValue }
                toggleFundWizard={ toggleFundWizard }
              />
            </React.Fragment>
          ))
        }
      </div>

      <CommonConfirmationModal
        modelId={ 'pinDashboardFundModal' }
        title={ 'Do you want to pin the fund?' }
        body={ 'You won be able to monitor this fund from the main dashboard' }
        confirmText={ 'Pin Fund' }
        onConfirm={ onConfirm }
        loader={ loader && typeLoader === 'fundPinAndUnpinModal' }
      />

      <CommonConfirmationModal
        modelId={ 'unPinDashboardFundModal' }
        title={ 'Do you want to unpin the fund?' }
        body={ 'You won’t be able to monitor this fund from the main dashboard' }
        confirmText={ 'Unpin Fund' }
        onConfirm={ onConfirm }
        loader={ loader && typeLoader === 'fundPinAndUnpinModal' }
      />

      <CommonConfirmationModal
        modelId={ 'hideDashboardFundModal' }
        title={ 'Want to hide fund on your profile?' }
        body={ 'You won’t be able to see this fund on your profile' }
        confirmText={ 'Hide Fund' }
        onConfirm={ onConfirm }
        loader={ loader && typeLoader === 'fundPinAndUnpinModal' }
      />

      <CommonConfirmationModal
        modelId={ 'showPinDashboardFundModal' }
        title={ 'Want to hide fund on your profile?' }
        body={ 'You won to be able to see this fund on your profile' }
        confirmText={ 'Show Fund' }
        onConfirm={ onConfirm }
        loader={ loader && typeLoader === 'fundPinAndUnpinModal' }
      />

      {/* <Modal
        isOpen={ fundWizardModal }
        toggle={ () => toggleFundWizard() }
        fullscreen
        className='performance-modal'
      >
        <ModalHeader toggle={ () => toggleFundWizard() }>
          Fund Wizard
          <ProgressBar currentStep={ fundWizardStep } totalSteps={ 4 } />
        </ModalHeader>
        <ModalBody className='Performance-name'>
          <CustomScrollbar height = 'calc(100vh - 70px)'>
            <FundWizardForm
              step={ fundWizardStep }
              setStep={ setFundWizardStep }
              setModal={ setFundWizardModal }
              selectedFund={ selectedFundForWizard }
            />
          </CustomScrollbar>
        </ModalBody>
      </Modal> */}
    </div>
  )
}
