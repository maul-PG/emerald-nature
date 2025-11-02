import * as React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement>

function Card({ className, children, ...props }: CardProps) {
	return (
		<div className={className} {...props}>
			{children}
		</div>
	)
}

function CardContent({ className, children, ...props }: CardProps) {
	return (
		<div className={className} {...props}>
			{children}
		</div>
	)
}

export { Card, CardContent }

