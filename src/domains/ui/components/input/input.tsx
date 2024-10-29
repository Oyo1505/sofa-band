import React from 'react'

 interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

interface Props  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string,
  id?: string,
  name: string
  placeholder?: string
  label?: string
  error?: {
    message: string
  }
}


const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, type, label,error, ...props }, ref) => {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={label}>{label} :</label>
      <input className={className} {...props}type={type}  />
      {error && <p className='text-red-600 text-xs'>{error.message}</p>}
    </div>
  )
})
Input.displayName = "Input"
export default Input