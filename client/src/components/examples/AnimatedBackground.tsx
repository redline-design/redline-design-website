import AnimatedBackground from '../AnimatedBackground'

export default function AnimatedBackgroundExample() {
  return (
    <div className="relative h-screen w-full bg-background">
      <AnimatedBackground />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-foreground">Digital Background</h1>
      </div>
    </div>
  )
}
