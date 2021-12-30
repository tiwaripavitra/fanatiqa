import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Input(props) {
	const { label, name, ...rest } = props
	return (

		<div className="form-group">
			<label className="form-control" htmlFor={name}>{label}</label>
			<Field
				id={name} name={name} {...rest}
			/>
		</div>
	)
}

export default Input
