// ** React Imports
import { Link } from 'react-router-dom'

// ** Mui Components Imports
import '@mui/icons-material/Archive'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { IconButton } from '@mui/material'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { alpha, styled } from '@mui/material/styles'

// ** Custom Components Imports
import { IFundDetails, IPinAndDashValue } from '../../interface/fund'

// ** Asset Imports
import PinDropActiveSVG from '../../assets/images/pin-drop-active.svg'
import ShowProfileActiveSVG from '../../assets/images/user-profile-active.svg'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={ 0 }
    anchorOrigin={ {
      vertical: 'bottom',
      horizontal: 'right',
    } }
    transformOrigin={ {
      vertical: 'top',
      horizontal: 'right',
    } }
    { ...props }
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}))

interface IFundListViewProps {
  card: IFundDetails
  handleClose: (val: string) => void
  handleClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => void
  setPinAndDashValue: (data: IPinAndDashValue) => void
  anchorEls: any
  toggleFundWizard: (fund?: IFundDetails) => void
}

interface ICommonDropdownProps {
  data: IFundDetails
  anchorEls: any
  handleClose: (id: string) => void
  setPinAndDashValue: (data: IPinAndDashValue) => void
  toggleFundWizard: (fund?: IFundDetails) => void
}

export default function FundListView({
  card,
  anchorEls,
  handleClose,
  handleClick,
  setPinAndDashValue,
  toggleFundWizard,
}: IFundListViewProps) {
  const CommonDropdown = ({
    data,
    anchorEls,
    handleClose,
    setPinAndDashValue,
  }: ICommonDropdownProps) => {
    const pinDashboardId: string = data?.pin_to_dashboard
      ? 'unPinDashboardFundModal'
      : 'pinDashboardFundModal'

    const showProfileId: string = data?.show_on_profile
      ? 'hideDashboardFundModal'
      : 'showPinDashboardFundModal'
    return (
      <StyledMenu
        id={ `long-menu-${data?.fund_id}` }
        anchorEl={ anchorEls[data?.fund_id] }
        open={ Boolean(anchorEls[data?.fund_id]) }
        onClose={ () => handleClose(data?.fund_id + '') }
        className='custom-menu-class'
      >
        <MenuItem
          data-bs-target={ `#${pinDashboardId}` }
          data-bs-toggle='modal'
          onClick={ (e) => {
            e.stopPropagation()
            handleClose(data?.fund_id + '')
            setPinAndDashValue({
              key: 'pin_to_dashboard',
              value: !data?.pin_to_dashboard,
              fund_id: data?.id + '',
            })
          } }
        >
          <span>
            <img src={ PinDropActiveSVG } alt='' />
          </span>
          { !data?.pin_to_dashboard ? 'Pin' : 'Unpin' } from Dashboard
        </MenuItem>
        <MenuItem
          onClick={ (e) => {
            e.stopPropagation()
            handleClose(data?.fund_id + '')
            setPinAndDashValue({
              key: 'show_on_profile',
              value: !data?.show_on_profile,
              fund_id: data?.id + '',
            })
          } }
          data-bs-target={ `#${showProfileId}` }
          data-bs-toggle='modal'
        >
          <span>
            <img src={ ShowProfileActiveSVG } alt='' />
          </span>
          { !data?.show_on_profile ? 'Show' : 'Don\'t show' } on profile
        </MenuItem>
        {/* <MenuItem
          onClick={ (e) => {
            e.stopPropagation()
            handleClose(data?.fund_id + '')
            toggleFundWizard(data)
          } }
        >
          <span>
            🧙‍♂️
          </span>
          Fund Wizard
        </MenuItem> */}
      </StyledMenu>
    )
  }
  const pinDashboardId: string = card?.pin_to_dashboard ? 'unPinDashboardFundModal' : 'pinDashboardFundModal'

  const showProfileId: string = card?.show_on_profile ? 'hideDashboardFundModal' : 'showPinDashboardFundModal'
  return (
    <div className='fund-item-card' key={ card?.fund_id }>
      <div className='fund-header-row'>
        <Link className='fund-name' to={ `/layout/fund/${card?.id}` }>
          { card?.name }
        </Link>
        <div className='fund-card-options'>
          { card?.pin_to_dashboard && (
            <span
              className='pin-dropped'
              onClick={ (e) => {
                e.stopPropagation()
                handleClose(card?.fund_id + '')
                setPinAndDashValue({
                  key: 'pin_to_dashboard',
                  value: !card?.pin_to_dashboard,
                  fund_id: card?.id + '',
                })
              } }
              data-bs-target={ `#${pinDashboardId}` }
              data-bs-toggle='modal'
            >
              <img src={ PinDropActiveSVG } alt='' />
            </span>
          ) }
          { card?.show_on_profile && (
            <span
              onClick={ (e) => {
                e.stopPropagation()
                handleClose(card?.fund_id + '')
                setPinAndDashValue({
                  key: 'show_on_profile',
                  value: !card?.show_on_profile,
                  fund_id: card?.id + '',
                })
              } }
              className='pin-dropped'
              data-bs-target={ `#${showProfileId}` }
              data-bs-toggle='modal'
            >
              <img src={ ShowProfileActiveSVG } alt='' />
            </span>
          ) }
          <span className='card-more-option'>
            <IconButton
              key={ card?.fund_id }
              aria-label='more'
              id={ `long-button-${card?.fund_id}` }
              aria-controls={
                anchorEls[card?.fund_id]
                  ? `long-menu-${card?.fund_id}`
                  : undefined
              }
              aria-expanded={ anchorEls[card?.fund_id] ? 'true' : undefined }
              aria-haspopup='true'
              onClick={ (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleClick(e, card?.fund_id)
              }
            >
              <MoreHorizIcon style={ { color: '#525866' } } />
            </IconButton>
            <CommonDropdown
              anchorEls={ anchorEls }
              data={ card }
              handleClose={ handleClose }
              setPinAndDashValue={ setPinAndDashValue }
              toggleFundWizard={ toggleFundWizard }
            />
          </span>
        </div>
      </div>
      <div className='fund-target-size-row'>
        <label>
          Fund Target Sizes ({ card?.fund_currency } MN){ ' ' }
          <strong>{ card?.target_size || 0 }%</strong>
        </label>
        <h4>+${ card?.fund_size_usd || 0 }</h4>
      </div>
    </div>
  )
}
