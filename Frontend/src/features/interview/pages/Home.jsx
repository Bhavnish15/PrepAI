import React, { useState, useRef } from 'react'
import '../style/home.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { PageLoader, BtnSpinner } from '../../../Loader.jsx'

const Home = () => {
  const { loading, generateReport, reports } = useInterview()
  const [jobDescription, setJobDescription]   = useState('')
  const [selfDescription, setSelfDescription] = useState('')
  const [fileName, setFileName]               = useState(null)
  const [generating, setGenerating]           = useState(false)
  const [jdLen, setJdLen]                     = useState(0)
  const resumeInputRef = useRef()
  const navigate = useNavigate()

  const handleGenerateReport = async () => {
    if (generating) return
    setGenerating(true)
    try {
      const resumeFile = resumeInputRef.current.files[0]
      const data = await generateReport({ jobDescription, selfDescription, resumeFile })
      navigate(`/interview/${data._id}`)
    } finally {
      setGenerating(false)
    }
  }

  const handleFile = (e) => {
    const f = e.target.files[0]
    setFileName(f ? f.name : null)
  }

  const handleJd = (e) => {
    setJobDescription(e.target.value)
    setJdLen(e.target.value.length)
  }

  if (loading) return <PageLoader message='Loading your reports…' />

  return (
    <div className='home'>

      {/* ── Noise / grain overlay ── */}
      <div className='home__noise' aria-hidden='true' />

      {/* ── Ambient blobs ── */}
      <div className='home__blob home__blob--1' aria-hidden='true' />
      <div className='home__blob home__blob--2' aria-hidden='true' />

      {/* ── Nav bar ── */}
      <nav className='home__nav'>
        <span className='logo'>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='var(--accent)' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z'/>
          </svg>
          PrepAI
        </span>
      </nav>

      {/* ── Hero ── */}
      <header className='home__hero'>
        <div className='hero__chip'>AI Interview Preparation</div>
        <h1 className='hero__title'>
          Your edge before<br />
          <em>every interview.</em>
        </h1>
        <p className='hero__sub'>
          Paste a JD, upload your resume — get a tailored strategy, questions &amp; prep plan in 30 s.
        </p>
      </header>

      {/* ── Card ── */}
      <section className='card'>

        {/* Left — JD */}
        <div className='card__panel card__panel--left'>
          <div className='panel__label'>
            <span className='panel__icon panel__icon--blue'>
              <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'>
                <rect x='2' y='7' width='20' height='14' rx='2'/>
                <path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'/>
              </svg>
            </span>
            Job Description
            <span className='tag tag--required'>Required</span>
          </div>

          <textarea
            className='panel__textarea'
            placeholder={'Paste the full job description here…\n\ne.g. "Senior Frontend Engineer — React, TypeScript, system design…"'}
            onChange={handleJd}
            maxLength={5000}
          />

          <div className='panel__footer'>
            <span className={`char-count ${jdLen > 4600 ? 'char-count--warn' : ''}`}>
              {jdLen} / 5000
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className='card__divider' />

        {/* Right — Profile */}
        <div className='card__panel card__panel--right'>
          <div className='panel__label'>
            <span className='panel__icon panel__icon--amber'>
              <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'>
                <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/>
                <circle cx='12' cy='7' r='4'/>
              </svg>
            </span>
            Your Profile
          </div>

          {/* Upload */}
          <label className={`dropzone ${fileName ? 'dropzone--filled' : ''}`} htmlFor='resume-file'>
            {fileName ? (
              <>
                <span className='dropzone__icon dropzone__icon--ok'>
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8z'/>
                    <polyline points='14 2 14 8 20 8'/>
                    <polyline points='9 15 11 17 15 13'/>
                  </svg>
                </span>
                <span className='dropzone__name'>{fileName}</span>
                <span className='dropzone__hint'>Click to replace</span>
              </>
            ) : (
              <>
                <span className='dropzone__icon'>
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                    <polyline points='16 16 12 12 8 16'/>
                    <line x1='12' y1='12' x2='12' y2='21'/>
                    <path d='M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3'/>
                  </svg>
                </span>
                <span className='dropzone__title'>Upload Resume</span>
                <span className='dropzone__hint'>PDF or DOCX · Max 5 MB
                  <span className='tag tag--best' style={{marginLeft:'0.5rem'}}>Best results</span>
                </span>
              </>
            )}
            <input
              ref={resumeInputRef}
              hidden type='file' id='resume-file'
              name='resume' accept='.pdf,.docx'
              onChange={handleFile}
            />
          </label>

          {/* OR */}
          <div className='or-row'><span>or</span></div>

          {/* Self description */}
          <div className='self-desc'>
            <label className='self-desc__label' htmlFor='self'>Quick self-description</label>
            <textarea
              id='self'
              className='panel__textarea panel__textarea--sm'
              placeholder="Years of experience, main skills, notable projects… anything that's not on a resume yet."
              onChange={(e) => setSelfDescription(e.target.value)}
            />
          </div>

          <div className='notice'>
            <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <circle cx='12' cy='12' r='10'/><line x1='12' y1='8' x2='12' y2='12'/><line x1='12' y1='16' x2='12.01' y2='16'/>
            </svg>
            Resume <strong>or</strong> self-description required
          </div>
        </div>
      </section>

      {/* ── Generate CTA ── */}
      <div className='cta-row'>
        <span className='cta-hint'>
          <span className='pulse-dot' />
          Powered by Gemini · ~30 s
        </span>

        <button
          className={`cta-btn ${generating ? 'cta-btn--loading' : ''}`}
          onClick={handleGenerateReport}
          disabled={generating}
        >
          {generating ? (
            <>
              <BtnSpinner />
              Generating…
            </>
          ) : (
            <>
              <svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z'/>
              </svg>
              Generate My Strategy
            </>
          )}
        </button>
      </div>

      {/* ── Recent reports ── */}
      {reports.length > 0 && (
        <section className='recent'>
          <h2 className='recent__heading'>Recent plans</h2>
          <ul className='recent__list'>
            {reports.map((r, i) => (
              <li
                key={r._id}
                className='recent__item'
                style={{ animationDelay: `${i * 0.06}s` }}
                onClick={() => navigate(`/interview/${r._id}`)}
              >
                <div>
                  <p className='recent__title'>{r.title || 'Untitled Position'}</p>
                  <p className='recent__date'>{new Date(r.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</p>
                </div>
                <span className={`score-pill ${r.matchScore >= 80 ? 'score-pill--hi' : r.matchScore >= 60 ? 'score-pill--mid' : 'score-pill--lo'}`}>
                  {r.matchScore}%
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className='home__footer'>
        <a href='#'>Privacy</a>
        <span>·</span>
        <a href='#'>Terms</a>
        <span>·</span>
        <a href='#'>Help</a>
      </footer>
    </div>
  )
}

export default Home