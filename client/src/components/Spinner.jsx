import React from 'react'

// Loading component
export default function Spinner() {
  return (
    <div className='container'>
      <div className='lds-ripple'><div></div><div></div></div>
    </div>
  )
}
