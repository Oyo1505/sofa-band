import React from 'react'
import { FieldError } from 'react-hook-form'

 interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

interface Props  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string,
  id?: string,
  name: string
  placeholder?: string
  label?: string
  error?:FieldError| undefined
}


const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, type='text', label, error, ...props }, ref) => {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={label}>{label}</label>
      <input className={className} {...props} type={type} ref={ref} />
      {error && <p className='text-red-600 text-xs'>{error.message}</p>}
    </div>
  )
})
Input.displayName = "Input"
export default Input