import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import { PageLoader } from '../../../Loader.jsx'

const NAV = [
  {
    id: 'technical', label: 'Technical',
    icon: <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'><polyline points='16 18 22 12 16 6'/><polyline points='8 6 2 12 8 18'/></svg>
  },
  {
    id: 'behavioral', label: 'Behavioral',
    icon: <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'><path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/></svg>
  },
  {
    id: 'roadmap', label: 'Road Map',
    icon: <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'><polygon points='3 11 22 2 13 21 11 13 3 11'/></svg>
  },
]

/* ── Question Card ───────────────────────────────────────────── */
const QCard = ({ item, index }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={`qcard ${open ? 'qcard--open' : ''}`}>
      <button className='qcard__head' onClick={() => setOpen(o => !o)}>
        <span className='qcard__num'>Q{index + 1}</span>
        <span className='qcard__q'>{item.question}</span>
        <span className={`qcard__arrow ${open ? 'qcard__arrow--up' : ''}`}>
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
            <polyline points='6 9 12 15 18 9'/>
          </svg>
        </span>
      </button>

      {open && (
        <div className='qcard__body'>
          <div className='qcard__block qcard__block--why'>
            <span className='qcard__label'>Why they ask</span>
            <p>{item.intention}</p>
          </div>
          <div className='qcard__block qcard__block--ans'>
            <span className='qcard__label'>Model answer</span>
            <p>{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Road Map Day ────────────────────────────────────────────── */
const Day = ({ day, idx }) => (
  <div className='day' style={{ animationDelay: `${idx * 0.05}s` }}>
    <div className='day__spine'>
      <div className='day__badge'>D{day.day}</div>
      <div className='day__line' />
    </div>
    <div className='day__body'>
      <h3 className='day__focus'>{day.focus}</h3>
      <ul className='day__tasks'>
        {day.tasks.map((t, i) => (
          <li key={i}><span className='day__dot' />{t}</li>
        ))}
      </ul>
    </div>
  </div>
)

/* ── Main ────────────────────────────────────────────────────── */
const Interview = () => {
  const [active, setActive] = useState('technical')
  const { report, getReportById, loading, getResumePdf } = useInterview()
  const { interviewId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (interviewId) getReportById(interviewId)
  }, [interviewId])

  if (loading || !report) return <PageLoader message='Loading your interview plan…' />

  const scoreCls =
    report.matchScore >= 80 ? 'hi' :
    report.matchScore >= 60 ? 'mid' : 'lo'

  const dash = 2 * Math.PI * 38 // r=38
  const filled = (report.matchScore / 100) * dash

  return (
    <div className='iv'>

      {/* ── Top bar ── */}
      <header className='iv__bar'>
        <button className='iv__back' onClick={() => navigate('/')}>
          <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'><polyline points='15 18 9 12 15 6'/></svg>
          Home
        </button>

        <h1 className='iv__bar-title'>{report.title || 'Interview Plan'}</h1>

        <button className='iv__dl' onClick={() => getResumePdf(interviewId)}>
          <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/><polyline points='7 10 12 15 17 10'/><line x1='12' y1='15' x2='12' y2='3'/>
          </svg>
          Download Resume
        </button>
      </header>

      {/* ── Body ── */}
      <div className='iv__body'>

        {/* ── Sidebar nav ── */}
        <aside className='iv__nav'>
          <p className='iv__nav-label'>Sections</p>
          {NAV.map(n => (
            <button
              key={n.id}
              className={`iv__nav-item ${active === n.id ? 'iv__nav-item--on' : ''}`}
              onClick={() => setActive(n.id)}
            >
              <span className='iv__nav-icon'>{n.icon}</span>
              {n.label}
            </button>
          ))}

          {/* ── Score ring in nav ── */}
          <div className='iv__ring-wrap'>
            <svg className='iv__ring' viewBox='0 0 88 88'>
              <circle cx='44' cy='44' r='38' className='iv__ring-track' />
              <circle
                cx='44' cy='44' r='38'
                className={`iv__ring-fill iv__ring-fill--${scoreCls}`}
                strokeDasharray={`${filled} ${dash}`}
                strokeDashoffset='0'
              />
            </svg>
            <div className='iv__ring-inner'>
              <span className={`iv__ring-val iv__ring-val--${scoreCls}`}>{report.matchScore}</span>
              <span className='iv__ring-pct'>%</span>
            </div>
            <p className='iv__ring-lbl'>Match Score</p>
          </div>

          {/* ── Skill gaps ── */}
          <div className='iv__gaps'>
            <p className='iv__gaps-lbl'>Skill Gaps</p>
            <div className='iv__gaps-list'>
              {report.skillGaps.map((g, i) => (
                <span key={i} className={`gap-tag gap-tag--${g.severity}`}>{g.skill}</span>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Content ── */}
        <main className='iv__content'>

          {active === 'technical' && (
            <section className='iv__section' key='technical'>
              <div className='iv__content-hd'>
                <h2>Technical Questions</h2>
                <span className='count-pill'>{report.technicalQuestions.length} questions</span>
              </div>
              <div className='qlist'>
                {report.technicalQuestions.map((q, i) => <QCard key={i} item={q} index={i} />)}
              </div>
            </section>
          )}

          {active === 'behavioral' && (
            <section className='iv__section' key='behavioral'>
              <div className='iv__content-hd'>
                <h2>Behavioral Questions</h2>
                <span className='count-pill'>{report.behavioralQuestions.length} questions</span>
              </div>
              <div className='qlist'>
                {report.behavioralQuestions.map((q, i) => <QCard key={i} item={q} index={i} />)}
              </div>
            </section>
          )}

          {active === 'roadmap' && (
            <section className='iv__section' key='roadmap'>
              <div className='iv__content-hd'>
                <h2>Preparation Road Map</h2>
                <span className='count-pill'>{report.preparationPlan.length}-day plan</span>
              </div>
              <div className='daylist'>
                {report.preparationPlan.map((d, i) => <Day key={d.day} day={d} idx={i} />)}
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  )
}

export default Interview