// Define the types for the props
interface CommonConfirmationModalProps {
  modelId: string
  title?: string
  body?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel?: () => void
  loader?: boolean
  modelRef?: any
  hideCancel?: boolean
}

const CommonConfirmationModal = ({
  modelId,
  title,
  body,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  loader = false,
  modelRef,
  hideCancel = true
}: CommonConfirmationModalProps) => {
  return (
    <div
      className='modal fade pin-drop-dailog'
      id={ modelId }
      aria-hidden='true'
      aria-labelledby={ `${modelId}Label` }
      tabIndex={ -1 }
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            {title && (
              <h1 className='modal-title fs-4' id={ `${modelId}Label` }>
                {title}
              </h1>
            )}
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              disabled={ loader }
              aria-label='Close'
              ref={ modelRef }
              onClick={ () => onCancel?.() }
            ></button>
          </div>
          {body && <div className='modal-body fs-6'>{body}</div>}
          <div className='modal-footer'>
            {hideCancel && (
              <button
                className='btn cancel-btn'
                data-bs-dismiss='modal'
                disabled={ loader }
                onClick={ () => onCancel?.() }
              >
                {cancelText || 'Cancel'}
              </button>
            )}
            <button className='btn unfund-btn' disabled={ loader } onClick={ onConfirm } >
              {loader ? 'Loading...' : confirmText || 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommonConfirmationModal
