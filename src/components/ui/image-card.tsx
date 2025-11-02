import Image from 'next/image'
import { Card, CardContent } from './card'

interface ImageCardProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export function ImageCard({ src, alt, width, height, className = '' }: ImageCardProps) {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover w-full h-full"
          loading="lazy"
          quality={90}
        />
      </CardContent>
    </Card>
  )
}