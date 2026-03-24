
'use client'

import { Toaster } from 'react-hot-toast'

const AppToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2000,
        className: 'toast-base',
        success: {
          className: 'toast-base toast-success',
          iconTheme: { primary: '#28c287', secondary: '#fff' },
        },
        error: {
          className: 'toast-base toast-error',
          iconTheme: { primary: '#e74c3c', secondary: '#fff' },
        },
        loading: {
          className: 'toast-base toast-loading',
          iconTheme: { primary: '#4979c7', secondary: '#fff' },
        },
      }}
    />
  )
}

export default AppToaster
