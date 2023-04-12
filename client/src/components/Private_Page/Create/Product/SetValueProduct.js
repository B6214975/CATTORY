import React from 'react'
import UpdatePeriod from './UpdatePeriod'
import UpdatePrice from './UpdatePrice'

const SetValueProduct = () => {
  return (
    <div className='row'>
        <div className="col-md-6">
            <h5>ราคา</h5>
            <UpdatePrice/>
        </div>
        <div className="col-md-6">
            <h5>งวด</h5>
            <UpdatePeriod/>
        </div>
    </div>
  )
}

export default SetValueProduct