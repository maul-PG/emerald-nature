import * as React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
	return <input ref={ref} className={className} {...props} />
})

Input.displayName = 'Input'

export { Input }

