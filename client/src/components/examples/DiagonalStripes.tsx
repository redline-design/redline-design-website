import DiagonalStripes from '../DiagonalStripes'

export default function DiagonalStripesExample() {
  return (
    <div className="relative h-screen w-full bg-background">
      <DiagonalStripes />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-foreground">Diagonal Stripes Background</h1>
      </div>
    </div>
  )
}
