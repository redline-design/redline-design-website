import CTABand from '../CTABand'

export default function CTABandExample() {
  return (
    <div className="p-8">
      <CTABand
        title="Book a Free Consultation Today!"
        subtitle="Let's discuss how we can grow your business with data-driven marketing."
        buttonText="Get Started"
        buttonLink="/book-a-demo"
      />
    </div>
  )
}
