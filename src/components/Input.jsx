import InputBase from '@mui/material/InputBase'
import { alpha, styled } from '@mui/material/styles'

export default styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#F9FAFB',
    border: '1px solid',
    borderColor: '#E0E3E7',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      boxShadow: `${ alpha('#1D2939', 0.25) } 0 0 0 0.2rem`,
      borderColor: '#D0D5DD',
      backgroundColor: '#FFFFFF',
    },
  },
}))