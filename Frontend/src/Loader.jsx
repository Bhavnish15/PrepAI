import './Loader.scss'

/* Full-page loader */
export const PageLoader = ({ message = 'Loading…' }) => (
  <div className='page-loader'>
    <AppleSpinner size={36} />
    <p className='page-loader__msg'>{message}</p>
  </div>
)

/* Inline button spinner */
export const BtnSpinner = () => (
  <span className='btn-spinner' aria-hidden='true' />
)

/* Raw Apple-style activity indicator */
export const AppleSpinner = ({ size = 28, color = 'var(--text-2)' }) => (
  <span
    className='apple-spinner'
    style={{ '--sz': `${size}px`, '--clr': color }}
    aria-label='Loading'
    role='status'
  >
    {Array.from({ length: 12 }, (_, i) => (
      <span
        key={i}
        className='apple-spinner__blade'
        style={{
          transform: `rotate(${i * 30}deg) translateY(-120%)`,
          animationDelay: `${-(1 - i / 12)}s`,
        }}
      />
    ))}
  </span>
)

export default PageLoader