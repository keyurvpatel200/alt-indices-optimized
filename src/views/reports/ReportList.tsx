import { Link, useNavigate } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Menu, MenuItem } from '@mui/material'
import plus from '../../assets/images/round-add-icon.svg'
import archived from '../../assets/icons/archived.svg'
import './reports.css'
import { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

export default function ReportList() {
  const navigate = useNavigate()
  const rows = [
    { id: 1, name: 'Benchmark ABC', tags: ['Growth', 'High Risk'], privacy: 'Public', lastOpened: '2025-05-08', dateCreated: '2025-05-01' },
    { id: 2, name: 'Benchmark XYZ', tags: ['Moderate'], privacy: 'Private', lastOpened: '2025-05-07', dateCreated: '2025-05-02' },
  ]

  const tagColors = ['#DAEAF6', '#D4AFB9', '#9CADCE', '#7EC4CF', '#A133FF']
  const tagBorderColors = ['#78A7CA', '#A47481', '#3A5486', '#397A84', '#A133FF']

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return(
    <div className="recently-access-reports-wrapper">
      <div className="list-of-fund-number">Recently Accessed Reports</div>
      <div className="recently-accessed-fund-list-container">
        <div className="recently-accessed-fund-list">
          <Link to="/layout/add-new-fund" className='recent-aceessed-picture'>
            <img src={ plus } alt="" />              
          </Link>            
          <Link className='recent-link-row' to="/layout/add-new-fund">Report ABC<img src={ plus } alt="" /></Link>
        </div>

        <div className="recently-accessed-fund-list">
          <Link to="/layout/add-new-fund" className='recent-aceessed-picture'>
            <img src={ plus } alt="" />              
          </Link>            
          <Link className='recent-link-row' to="/layout/add-new-fund">2nd Template <img src={ plus } alt="" /></Link>
        </div>

        <div className="recently-accessed-fund-list">
          <Link to="/layout/add-new-fund" className='recent-aceessed-picture'>
            <img src={ plus } alt="" />              
          </Link>            
          <Link className='recent-link-row' to="/layout/add-new-fund">3rd Template <img src={ plus } alt="" /></Link>
        </div>

        <div className="recently-accessed-fund-list">
          <Link to="/layout/add-new-fund" className='recent-aceessed-picture'>
            <img src={ plus } alt="" />              
          </Link>            
          <Link className='recent-link-row' to="/layout/add-new-fund">4rd Template <img src={ plus } alt="" /></Link>
        </div>
      </div>

      <div className='report-list-of-fund-row'>
        <div className='report-list-of-fund-number'>[X] Reports</div>
        <div className='report-list-of-fund-search-row'>
          <div className='d-flex position-relative benchmark-name-icon'>
            <input type="text" placeholder='Search Report' />
            <img src={ plus } alt="" />
          </div>
          <button onClick={ ()=> navigate('/layout/reports/create') } className='recalculate-selected-button'><img src={ plus } alt="" /> Create new report</button>
        </div>
      </div>
      <div className='list-of-reports-table-row'>
        <TableContainer className='styled-table-container'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='styled-table-cell'>Benchmark Name</TableCell>
                <TableCell className='styled-table-cell'>Tags</TableCell>
                <TableCell className='styled-table-cell'>Privacy</TableCell>
                <TableCell className='styled-table-cell'>Last Opened</TableCell>
                <TableCell className='styled-table-cell'>Date Created</TableCell>
                <TableCell className='styled-table-cell'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={ row.id }>
                  <TableCell>
                    <div className='benchmark-cell' style={ { display: 'flex', alignItems: 'center' } }>
                      <img
                        src={ plus }
                        alt="Benchmark Icon"
                        className="benchmark-icon"
                        style={ { marginRight: 8 } }
                      />
                      <Link to={ '/reports/report-details' } style={ { textDecoration: 'none', color: 'inherit' } }>
                        {row.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>
                    {row.tags.map((tag, idx) => (
                      <Chip
                        key={ idx }
                        label={ tag }
                        style={ {
                          marginRight: 4,
                          backgroundColor: tagColors[idx % tagColors.length],
                          border: '1px solid white',
                          borderColor: tagBorderColors[idx % tagBorderColors.length],
                          color: '#0F4E7E',
                          fontWeight: 600,
                          borderRadius: '8px',
                          height: '28px',
                        } }
                      />
                    ))}
                  </TableCell>
                  <TableCell>{row.privacy}</TableCell>
                  <TableCell>{row.lastOpened}</TableCell>
                  <TableCell>{row.dateCreated}</TableCell>
                  <TableCell  style={ { textAlign: 'center' } }>
                    <IconButton onClick={ handleMenuClick }>
                      <MoreHorizIcon />
                    </IconButton>
                    <Menu
                      anchorEl={ anchorEl }
                      open={ open }
                      onClose={ handleMenuClose }
                      anchorOrigin={ {
                        vertical: 'top',
                        horizontal: 'right',
                      } }
                      transformOrigin={ {
                        vertical: 'top',
                        horizontal: 'right',
                      } }
                    >
                      <MenuItem onClick={ handleMenuClose }>Option 1</MenuItem>
                      <MenuItem onClick={ handleMenuClose }>Option 2</MenuItem>
                      <MenuItem onClick={ handleMenuClose }>Option 3</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className='archived-reports-row'>
        <button className='archived-reports-btn'><img src={ archived } alt="" /> Archived & Unpublished Reports</button>        
      </div>
    </div>
  )
}