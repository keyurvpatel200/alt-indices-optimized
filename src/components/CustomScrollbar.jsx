import { Scrollbars } from 'react-custom-scrollbars-2'

const CustomScrollbar = ({ children, height = '400px' }) => {
  return (
    <Scrollbars
      style={ { height } } // Allow height customization
      autoHide
      autoHideTimeout={ 1000 }
      autoHideDuration={ 200 }
      renderThumbVertical={ (props) => (
        <div
          { ...props }
          style={ {
            backgroundColor: '#a0a0a0',
            borderRadius: '4px',
            width: '5px',
          } }
        />
      ) }
    >
      {children}
    </Scrollbars>
  )
}

export default CustomScrollbar