import { memo } from 'react'

import navigation from '../_nav'
import { AppSidebarNav } from './AppSidebarNav'
import CollapseSVG from 'icons/Collapse.svg'
import AltSVG from 'icons/Alt.svg'
import CustomScrollbar from './CustomScrollbar'

export default memo(function AppSidebar (props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <a href="#logo"><AltSVG/></a>
      </div>
      <CustomScrollbar height = 'calc(100vh - 160px)'>
        <AppSidebarNav items={ navigation }/>
      </CustomScrollbar>
      <div className="sidebar-toggle"
        onClick={ () => props.setSidebarToggle(!props.sidebarToggle) }>
        {
          props.sidebarToggle ? <CollapseSVG/> : <CollapseSVG/>
        }
      </div>
    </aside>
  )
})