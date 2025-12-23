import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AppContent, AppHeader, AppSidebar } from '../components/index'
import CustomScrollbar from '../components/CustomScrollbar'

export default function DefaultLayout() {
  const [sidebarToggle, setSidebarToggle] = useState(true)
  const [msidebarToggle, setMSidebarToggle] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const location = useLocation()

  const hideSideBarAndHeader = ![
    '/layout/fund/new-fund',
    '/layout/add-fund-manager',
    '/layout/fund/performance',
    '/layout/fund/cashflow',    
  ]?.find((d) => location.pathname?.startsWith(d))

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <div className={ msidebarToggle ? 'm-sidebar-hide' : 'm-sidebar-active' }>
        <div className={ sidebarToggle ? 'sidebar-hide' : 'sidebar-active' }>
          { hideSideBarAndHeader && (
            <AppSidebar
              setMSidebarToggle={ setMSidebarToggle }
              setSidebarToggle={ setSidebarToggle }
              sidebarToggle={ sidebarToggle }
              openModal={ openModal }
            />
          ) }
          <div className={ `${hideSideBarAndHeader && 'wrapper'} d-flex flex-column min-vh-100` }>            
            <CustomScrollbar height = 'calc(100vh)'>
              <AppHeader
                hideHeader={ !hideSideBarAndHeader }
                setMSidebarToggle={ setMSidebarToggle }
                msidebarToggle={ msidebarToggle }
              />
              <div className="body flex-grow-1 content-area">
                <AppContent
                  setSidebarToggle={ setSidebarToggle }
                  isModalOpen={ isModalOpen }
                  toggleModal={ closeModal }
                />
              </div>
            </CustomScrollbar>
          </div>
          <div className={ sidebarToggle ? 'sidebar-overlay-hide' : 'sidebar-overlay' }></div>
        </div>
      </div>
    </>
  )
}
