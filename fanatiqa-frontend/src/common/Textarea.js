import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Textarea (props) {
  const { label, name, ...rest } = props
  return (
	<div className="form-group">
      <label className='form-control' htmlFor={name}>{label}</label>
      <Field as='textarea' id={name} name={name} {...rest} className='form-control' />
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Textarea
