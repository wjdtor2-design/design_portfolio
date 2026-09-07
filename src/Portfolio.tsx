import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

const LOGO = 'Gwak Ji Eun'
const NAME = '곽지은 / Gwak Ji Eun'
const ROLE = 'UI/UX 디자이너'
const HEADLINE = 'DESIGN SHAPED AROUND YOUR NEEDS'
const TAGLINE = ['— 화면만 그리지 않습니다.', '쓰는 사람이 헤매지 않는', '흐름을 설계합니다']
const PROFILE_IMAGE = '/profile.jpg'
const PROJECT_VIDEO = '/plan-with.mp4'
const PROJECT_LINK = 'https://github.com/'
const BACKDROP = '/hills.jpg'
const SHOT_MAIN = '/plan-with-main.jpg'
const SHOT_AI = '/plan-with-ai.jpg'

const INTRO =
  '치과 10년 근무 후 IT 기술에 도전하고자 입문한 부트캠프에서, 설계한 결과물이 시각적으로 즉시 구현되는 UI/UX 디자인에 큰 매력을 느꼈습니다. 독학으로 기본기를 다진 후 실무 아카데미 프로젝트에서 UI/UX를 전담하며 복잡한 입력 동선을 개편하고 컴포넌트 시스템을 구축했습니다. 현장에서 익힌 세심함과 주도적인 배움의 태도로, 유저와 팀 모두가 만족하는 화면을 설계하겠습니다.'

const stats = [
  {
    value: '10년',
    title: '치과 현장 경험',
    body: '사람을 가까이 보며 익힌 세심함으로 화면의 디테일을 다룹니다.',
    rotate: -3,
  },
  {
    value: 'Bootcamp',
    title: 'IT 입문',
    body: '설계가 바로 화면이 되는 UI/UX에 매력을 느끼고 전향했습니다.',
    rotate: 5,
  },
  {
    value: '전담',
    title: 'UI/UX Design',
    body: '실무 아카데미에서 입력 동선 개편과 컴포넌트 시스템을 맡았습니다.',
    rotate: -8,
  },
  {
    value: 'Figma',
    title: 'Design Tool',
    body: 'Auto Layout, Component, Prototyping으로 핸드오프까지 이어갑니다.',
    rotate: -2,
  },
]

const stacks = [
  {
    title: 'Figma',
    detail: '화면 설계부터 핸드오프까지 전 과정을 Figma 한 파일에서 진행합니다.',
    bg: 'bg-[#f9d4da]',
    pos: 'left-[6%] top-[14%]',
    rotate: -2,
  },
  {
    title: 'Auto Layout',
    detail: '1920px 캔버스, 1280px 메인 컨테이너 기준 반응형 규칙을 세웁니다.',
    bg: 'bg-[#d5ef43]',
    pos: 'right-[8%] top-[12%]',
    rotate: 2,
  },
  {
    title: 'Component & Variants',
    detail: '아바타와 카드를 XS~XL 5단계로 표준화해 재사용 가능한 세트로 묶습니다.',
    bg: 'bg-[#c6dcf6]',
    pos: 'left-[3%] top-[44%]',
    rotate: 1,
  },
  {
    title: 'Prototyping',
    detail: 'Step UI 흐름을 프로토타입으로 검증한 뒤 화면을 확정합니다.',
    bg: 'bg-[#fae59a]',
    pos: 'right-[4%] top-[48%]',
    rotate: -1,
  },
  {
    title: 'Git & GitHub',
    detail: '브랜치와 커밋 이력으로 팀 작업물의 변경 과정을 따라갑니다.',
    bg: 'bg-[#c8eed4]',
    pos: 'left-[24%] top-[74%]',
    rotate: -2,
  },
  {
    title: 'Notion',
    detail: '디자인 결정과 핸드오프 가이드를 문서로 남겨 팀에 공유합니다.',
    bg: 'bg-[#e2d9f7]',
    pos: 'right-[22%] top-[78%]',
    rotate: 2,
  },
]

const works = [
  {
    title: '메인 페이지 레이아웃 및 시인성 개편',
    body: '주요 일정 카드의 크기를 확장하고 핵심 영역(캘린더·추천 루트) 배치를 조정하여 탐색 용이성을 높였습니다.',
  },
  {
    title: 'Step UI 전환으로 입력 피로도 개선',
    body: '한 화면에 모여 있던 AI 일정 입력 폼을 단계별 대화형 UI로 개편해 작성 부담을 낮췄습니다.',
  },
  {
    title: '8px 그리드 기반 디자인 시스템',
    body: '파편화되어 있던 프로필 아바타와 카드 요소를 XS~XL 5가지 표준 규격으로 정돈해 시각적 통일성을 확보했습니다.',
  },
  {
    title: '상세·마이페이지 레이아웃 정돈',
    body: '답답한 박스 테두리를 정리하고 폰트 스케일을 체계화하여 정보 전달력을 개선했습니다.',
  },
  {
    title: '반응형 캔버스 및 Figma 핸드오프',
    body: '1920px(메인 컨테이너 1280px) 기준 Auto Layout을 적용하고 개발 협업 가이드와 Figma 디자인 핸드오프 문서를 공유했습니다.',
  },
]

const caseCards = [
  {
    anchor: 'case-overview',
    title: 'PLAN & WITH',
    tool: 'FIGMA',
    year: '2026',
    tint: 'bg-[#f4e7a1]/60',
  },
  {
    anchor: 'case-ai',
    title: 'AI 일정 STEP UI',
    tool: 'FIGMA',
    year: '2026',
    tint: 'bg-[#d3e8c6]/60',
  },
  {
    anchor: 'case-works',
    title: '디자인 시스템',
    tool: 'FIGMA',
    year: '2026',
    tint: 'bg-white/45',
  },
]

const dockItems = [
  { href: '#about', label: '소개', icon: 'notes' as const },
  { href: '#stack', label: '스택', icon: 'photos' as const },
  { href: '#project', label: '프로젝트', icon: 'finder' as const },
  { href: '#footer', label: '연락', icon: 'mail' as const },
]

export default function Portfolio() {
  const [hovering, setHovering] = useState(false)
  const [showCursor, setShowCursor] = useState(false)
  const [caseAnchor, setCaseAnchor] = useState<string | null>(null)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 35, mass: 0.4 })
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 35, mass: 0.4 })
  const glowX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.8 })
  const glowY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.8 })

  const parallaxX = useSpring(0, { stiffness: 50, damping: 20 })
  const parallaxY = useSpring(0, { stiffness: 50, damping: 20 })
  const doodleX = useTransform(parallaxX, (v) => v * 1.6)
  const doodleY = useTransform(parallaxY, (v) => v * 1.6)
  const gridX = useTransform(parallaxX, (v) => v * 0.7)
  const gridY = useTransform(parallaxY, (v) => v * 0.7)

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      setShowCursor(true)
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      const nx = (e.clientX / window.innerWidth - 0.5) * -36
      const ny = (e.clientY / window.innerHeight - 0.5) * -36
      parallaxX.set(nx)
      parallaxY.set(ny)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [mouseX, mouseY, parallaxX, parallaxY])

  useEffect(() => {
    if (!showCursor) return
    document.documentElement.classList.add('custom-cursor')
    return () => document.documentElement.classList.remove('custom-cursor')
  }, [showCursor])

  const hoverHandlers = useMemo(
    () => ({
      onMouseEnter: () => setHovering(true),
      onMouseLeave: () => setHovering(false),
    }),
    [],
  )

  return (
    <>
    <div className="relative min-h-svh overflow-x-hidden bg-[#eef3f8] text-[#00252e] antialiased">
      <motion.div
        className="pointer-events-none fixed inset-[-8%] z-0"
        style={{ x: gridX, y: gridY }}
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,37,46,0.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,37,46,0.055) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
        <div
          className="absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.16) 1px, transparent 0)',
            backgroundSize: '18px 18px',
          }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        style={{ x: doodleX, y: doodleY }}
        aria-hidden
      >
        <Doodles />
      </motion.div>

      <div className="relative z-[2]">
        <Hero hoverHandlers={hoverHandlers} onOpenCase={setCaseAnchor} />
        <About hoverHandlers={hoverHandlers} onOpenCase={setCaseAnchor} />
        <Stack hoverHandlers={hoverHandlers} />
        <Projects hoverHandlers={hoverHandlers} onOpenCase={setCaseAnchor} />
        <Footer hoverHandlers={hoverHandlers} />
      </div>

      <Dock hoverHandlers={hoverHandlers} />

      <AnimatePresence>
        {caseAnchor && (
          <CaseStudy
            anchor={caseAnchor}
            hoverHandlers={hoverHandlers}
            onClose={() => setCaseAnchor(null)}
          />
        )}
      </AnimatePresence>
    </div>
      {showCursor && (
        <div className="pointer-events-none fixed inset-0 z-[200] hidden sm:block">
          <motion.div
            className="absolute h-14 w-14 rounded-full bg-[#c7fb03]/50 blur-xl"
            style={{ left: glowX, top: glowY, x: '-50%', y: '-50%' }}
            animate={{ scale: hovering ? 1.7 : 1, opacity: hovering ? 1 : 0.7 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          />
          <motion.div
            className="absolute h-8 w-8 rounded-full border-2 border-[#00252e]/30 bg-white/20"
            style={{ left: glowX, top: glowY, x: '-50%', y: '-50%' }}
            animate={{ scale: hovering ? 1.45 : 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          />
          <motion.div
            className="absolute h-2.5 w-2.5 rounded-full bg-[#00252e] shadow-[0_0_0_2px_#c7fb03]"
            style={{ left: cursorX, top: cursorY, x: '-50%', y: '-50%' }}
            animate={{ scale: hovering ? 2.2 : 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          />
        </div>
      )}
    </>
  )
}

type Hover = {
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function Hero({
  hoverHandlers,
  onOpenCase,
}: {
  hoverHandlers: Hover
  onOpenCase: (anchor: string) => void
}) {
  return (
    <section
      id="hero"
      className="relative mx-3 mt-3 overflow-hidden rounded-[28px] sm:mx-5"
    >
      <img
        src={BACKDROP}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/20" />
      <div className="relative flex min-h-[78vh] flex-col px-5 pb-10 pt-5 sm:px-8 sm:pt-6 lg:min-h-[88vh]">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-fit items-center gap-3 rounded-2xl border border-white/50 bg-white/25 px-3 py-2.5 shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.7)] backdrop-blur-[40px]"
          {...hoverHandlers}
        >
          <ProfileAvatar />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34c75a] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#34c75a]" />
              </span>
              <span className="text-[12px] tracking-[-0.01em] text-[#00252e]/75">
                Available for work
              </span>
            </div>
            <p className="mt-0.5 text-[15px] font-semibold uppercase tracking-[0.01em] text-[#00252e]">
              {LOGO} — {ROLE}
            </p>
          </div>
        </motion.div>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="relative">
            <Chip
              label="UI/UX Design"
              chip="bg-[#f4f8e8]"
              accent="#93ba06"
              className="absolute -top-10 right-0 hidden sm:flex lg:-right-16"
              rotate={8}
              scale={0.78}
            />
            <h1 className="max-w-[13ch] text-[38px] font-extrabold uppercase leading-[0.92] tracking-[-0.02em] text-[#151515] drop-shadow-[0_2px_14px_rgba(255,255,255,0.5)] sm:text-[62px] lg:text-[80px]">
              {HEADLINE}
            </h1>
            <Chip
              label="Figma"
              chip="bg-[#f4eaf5]"
              accent="#ec68fd"
              className="absolute bottom-[24%] left-[-6%] hidden sm:flex"
              rotate={-8}
              scale={0.78}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-[17px] font-medium leading-[1.35] tracking-[-0.01em] text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)] sm:text-right sm:text-[19px]">
            {TAGLINE.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <CaseStack hoverHandlers={hoverHandlers} onOpenCase={onOpenCase} />
        </div>
      </div>
    </section>
  )
}

function ProfileAvatar() {
  const [broken, setBroken] = useState(false)

  if (broken) {
    return (
      <div className="grid h-11 w-11 place-items-center rounded-full bg-[#c7fb03] text-[16px] font-bold text-[#00252e]">
        곽
      </div>
    )
  }

  return (
    <img
      src={PROFILE_IMAGE}
      alt={NAME}
      onError={() => setBroken(true)}
      className="h-11 w-11 rounded-full object-cover"
    />
  )
}

function CaseStack({
  hoverHandlers,
  onOpenCase,
}: {
  hoverHandlers: Hover
  onOpenCase: (anchor: string) => void
}) {
  const [open, setOpen] = useState(false)
  const gap = 62

  return (
    <div
      className="relative h-[176px] w-full sm:w-[320px]"
      onMouseEnter={() => {
        setOpen(true)
        hoverHandlers.onMouseEnter()
      }}
      onMouseLeave={() => {
        setOpen(false)
        hoverHandlers.onMouseLeave()
      }}
    >
      {caseCards.map((card, i) => (
          <motion.button
            key={card.anchor}
            type="button"
            data-hoverable
            onClick={() => onOpenCase(card.anchor)}
            className={`absolute bottom-0 left-0 w-full origin-bottom rounded-xl border border-white/50 px-3.5 py-3 text-left shadow-[0_6px_18px_rgba(0,0,0,0.18)] backdrop-blur-[24px] ${card.tint}`}
            style={{ zIndex: caseCards.length - i }}
            animate={{
              y: open ? -i * gap : -i * 10,
              scale: open ? 1 : 1 - i * 0.04,
            }}
            whileHover={{ scale: 1.035 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <div className="flex items-center gap-3">
              <img
                src={i === 1 ? SHOT_AI : SHOT_MAIN}
                alt=""
                className="h-10 w-14 shrink-0 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold tracking-[0.06em] text-[#00252e]/55">
                    {card.tool}
                  </span>
                  <span className="text-[11px] text-[#00252e]/55">{card.year}</span>
                </div>
                <p className="truncate text-[15px] font-bold uppercase tracking-[-0.01em] text-[#00252e]">
                  {card.title}
                </p>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium tracking-[0.04em] text-[#00252e]/60">
                    VIEW CASE STUDY
                  </span>
                  <span className="text-[13px] text-[#00252e]/60">→</span>
                </div>
              </div>
            </div>
          </motion.button>
      ))}
    </div>
  )
}

function CaseStudy({
  anchor,
  hoverHandlers,
  onClose,
}: {
  anchor: string
  hoverHandlers: Hover
  onClose: () => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    const target = scrollRef.current?.querySelector(`#${anchor}`)
    if (!target) return
    const timer = window.setTimeout(
      () => target.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      420,
    )
    return () => window.clearTimeout(timer)
  }, [anchor])

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-[#00252e]/45 backdrop-blur-sm"
        onClick={onClose}
        {...hoverHandlers}
      />
      <motion.article
        className="relative flex max-h-full w-full max-w-[880px] flex-col overflow-hidden rounded-[18px] bg-[#2b2b2b] p-1.5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 210, damping: 26 }}
      >
        <div className="flex items-center gap-3 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="닫기"
              data-hoverable
              onClick={onClose}
              className="h-3 w-3 rounded-full bg-[#fd5d5c]"
              {...hoverHandlers}
            />
            <span className="h-3 w-3 rounded-full bg-[#fac900]" />
            <span className="h-3 w-3 rounded-full bg-[#34c75a]" />
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-[#3d3d3d] px-3 py-1.5">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" aria-hidden>
              <circle cx="7" cy="7" r="4.6" fill="none" stroke="#9b9b9b" strokeWidth="1.6" />
              <path d="M10.6 10.6 L14 14" stroke="#9b9b9b" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span className="text-[13px] text-white/70">Portfolio / Case Study</span>
          </div>
          <span className="text-[15px] text-white/50">⟳</span>
        </div>

        <div
          ref={scrollRef}
          className="overflow-y-auto rounded-[13px] bg-white px-5 py-6 sm:px-8 sm:py-8"
        >
          <section id="case-overview" className="scroll-mt-4">
            <img
              src={SHOT_MAIN}
              alt="Plan & With 메인 페이지"
              className="w-full rounded-2xl object-cover"
            />
            <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
              <h2 className="text-[30px] font-extrabold tracking-[-0.02em] sm:text-[38px]">
                Plan &amp; With
              </h2>
              <a
                href={PROJECT_LINK}
                target="_blank"
                rel="noreferrer"
                data-hoverable
                className="inline-flex items-center gap-1.5 text-[16px] font-medium text-[#2563eb]"
                {...hoverHandlers}
              >
                Preview Link
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                  <path
                    d="M6 3h7v7M13 3L4.5 11.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
            <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.6] text-[#00252e]/80">
              AI가 추천한 여행 일정을 만들고 공유하는 웹 서비스입니다. 팀 프로젝트에서 UI/UX를
              전담해 메인 레이아웃을 개편하고, 복잡했던 일정 입력을 단계형 흐름으로 다시 설계했습니다.
            </p>

            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              {[
                ['Client :', '실무 아카데미 팀 프로젝트'],
                ['Years :', '2026'],
                ['Project Type :', 'UI/UX Design · 반응형 웹'],
                ['Tool Used :', 'Figma, Notion, Git & GitHub'],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[15px] text-[#00252e]/50">{label}</dt>
                  <dd className="mt-1 text-[17px] font-semibold tracking-[-0.01em]">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="case-ai" className="mt-10 scroll-mt-4">
            <div className="rounded-2xl bg-[#1c1c1c] p-3 sm:p-5">
              <img
                src={SHOT_AI}
                alt="AI 여행 일정 신청서 Step UI"
                className="w-full rounded-xl object-cover"
              />
            </div>
            <p className="mt-4 text-[16px] leading-[1.6] text-[#00252e]/80">
              한 화면에 모여 있던 AI 일정 입력 폼을 목적지 → 인원 → 기간 순의 대화형 Step UI로
              나눠, 한 번에 하나만 답하면 되도록 입력 부담을 줄였습니다.
            </p>
          </section>

          <section id="case-works" className="mt-12 scroll-mt-4">
            <h3 className="text-[22px] font-extrabold tracking-[-0.02em] sm:text-[26px]">
              주요 수행 내용 및 성과
            </h3>
            <ol className="mt-5 divide-y divide-black/8 border-t border-black/8">
              {works.map((work, i) => (
                <li key={work.title} className="flex gap-4 py-5">
                  <span className="mt-0.5 text-[15px] font-semibold text-[#00252e]/35">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-[17px] font-bold tracking-[-0.01em]">{work.title}</p>
                    <p className="mt-1.5 text-[15px] leading-[1.6] text-[#00252e]/70">
                      {work.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <button
              type="button"
              data-hoverable
              onClick={onClose}
              className="mt-8 inline-flex rounded-lg bg-[#00252e] px-5 py-2.5 text-[15px] font-medium text-white"
              {...hoverHandlers}
            >
              닫기
            </button>
          </section>
        </div>
      </motion.article>
    </motion.div>
  )
}

function About({
  hoverHandlers,
  onOpenCase,
}: {
  hoverHandlers: Hover
  onOpenCase: (anchor: string) => void
}) {
  return (
    <section id="about" className="relative px-5 pb-8 pt-16 sm:px-10 lg:px-16">
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative">
          <Chip
            label="About"
            chip="bg-[#e5f2fa]"
            accent="#039cfb"
            className="absolute -top-8 right-0 sm:right-10"
            rotate={-18}
            scale={0.7}
          />
          <h2 className="text-[36px] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] sm:text-[56px] lg:text-[72px]">
            자기소개
          </h2>
          <p className="mt-6 max-w-xl text-[15px] font-medium leading-[1.7] tracking-[-0.02em] text-[#00252e]/85 sm:text-[16px]">
            {INTRO}
          </p>
          <motion.button
            type="button"
            data-hoverable
            onClick={() => onOpenCase('case-overview')}
            className="relative mt-8 inline-flex rounded-xl bg-white px-5 py-3 text-[15px] font-medium tracking-[-0.02em] shadow-[0_6px_10px_rgba(0,0,0,0.15)]"
            style={{ rotate: -6 }}
            whileHover={{ rotate: 0, y: -4 }}
            {...hoverHandlers}
          >
            Plan &amp; With 케이스 스터디 열기
            <span className="absolute -right-1 -top-2 text-lg">
              <Pin />
            </span>
          </motion.button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {stats.map((item) => (
            <TiltCard key={item.title} rotate={item.rotate} hoverHandlers={hoverHandlers}>
              <div className="relative h-full rounded-xl border border-black/10 bg-white p-4 shadow-[24px_12px_0_rgba(0,0,0,0.1)] sm:p-5">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <Pin />
                </div>
                <FoldCorner />
                <p className="pt-2 text-[32px] font-bold text-[#00252e]">{item.value}</p>
                <p className="mt-2 text-[14px] font-semibold">{item.title}</p>
                <p className="mt-1 text-[12px] font-medium leading-[140%] text-black/60">
                  {item.body}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects({
  hoverHandlers,
  onOpenCase,
}: {
  hoverHandlers: Hover
  onOpenCase: (anchor: string) => void
}) {
  return (
    <section id="project" className="relative px-4 py-20">
      <div className="relative mx-auto max-w-6xl">
        <div className="relative mb-16 text-center">
          <Chip
            label="Projects"
            chip="bg-[#e5f2fa]"
            accent="#039cfb"
            className="absolute left-[calc(50%-172px)] top-[-16px]"
            rotate={-19}
            scale={0.65}
          />
          <h2 className="text-[34px] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-[#1f1f1f] sm:text-[48px]">
            PROJECTS THAT
            <br />
            TELL STORIES
          </h2>
        </div>

        <div className="mx-auto max-w-3xl">
          <ProjectWindow hoverHandlers={hoverHandlers} onOpenCase={onOpenCase} />
        </div>

        <p className="mt-10 text-center text-[15px] text-[#00252e]/55">
          카드를 누르면 케이스 스터디가 열립니다
        </p>
      </div>
    </section>
  )
}

function ProjectWindow({
  hoverHandlers,
  onOpenCase,
}: {
  hoverHandlers: Hover
  onOpenCase: (anchor: string) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasVideo, setHasVideo] = useState(true)
  const [playing, setPlaying] = useState(false)

  const play = () => {
    hoverHandlers.onMouseEnter()
    setPlaying(true)
    videoRef.current?.play().catch(() => setHasVideo(false))
  }

  const stop = () => {
    hoverHandlers.onMouseLeave()
    setPlaying(false)
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0
  }

  return (
    <motion.article
      data-hoverable
      role="button"
      tabIndex={0}
      onClick={() => onOpenCase('case-overview')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpenCase('case-overview')
      }}
      className="relative rounded-[18px] border-[1.5px] border-white bg-white/50 p-2 shadow-[0_3px_20px_rgba(0,0,0,0.16)] backdrop-blur-[8px]"
      initial={{ rotate: -3.2 }}
      whileHover={{
        rotate: 0,
        y: -18,
        scale: 1.03,
        transition: { type: 'spring', stiffness: 260, damping: 18 },
      }}
      style={{ transformPerspective: 800 }}
      onMouseEnter={play}
      onMouseLeave={stop}
    >
      <div className="absolute -right-3 -top-5 z-10 rotate-[18deg]">
        <Paperclip />
      </div>
      <div className="overflow-hidden rounded-[14px] bg-white/70">
        <div className="flex items-center gap-1.5 border-b border-white bg-[#d1d1d1]/25 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#fd5d5c]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#fac900]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#34c75a]" />
        </div>
        <div className="p-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#0d1f2d] shadow-[0_3px_13px_rgba(0,0,0,0.24)]">
            {hasVideo && (
              <video
                ref={videoRef}
                src={PROJECT_VIDEO}
                muted
                loop
                playsInline
                preload="metadata"
                onError={() => setHasVideo(false)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            {!hasVideo && <ShotSlideshow playing={playing} />}
            <motion.span
              className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-black/55 px-2.5 py-1 text-[12px] font-medium text-white"
              animate={{ opacity: playing ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              마우스를 올리면 재생됩니다
            </motion.span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-2 px-2 pb-1 pt-3">
            <div>
              <h3 className="text-[22px] font-extrabold tracking-[-0.02em]">Plan &amp; With</h3>
              <p className="text-[14px] text-[#00252e]/70">AI 여행 일정 공유 플랫폼</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['UI/UX 전담', 'Figma', '2026'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-black/5 px-2.5 py-1 text-[12px] tracking-[-0.01em] text-[#272727]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function ShotSlideshow({ playing }: { playing: boolean }) {
  const shots = [SHOT_MAIN, SHOT_AI]
  const [step, setStep] = useState(0)
  const active = playing ? step % shots.length : 0

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => setStep((prev) => prev + 1), 2200)
    return () => {
      window.clearInterval(timer)
      setStep(0)
    }
  }, [playing])

  return (
    <>
      {shots.map((shot, i) => (
        <motion.img
          key={shot}
          src={shot}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          animate={{
            opacity: active === i ? 1 : 0,
            scale: playing && active === i ? 1.06 : 1,
          }}
          transition={{ opacity: { duration: 0.6 }, scale: { duration: 2.4 } }}
        />
      ))}
    </>
  )
}

function Stack({ hoverHandlers }: { hoverHandlers: Hover }) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section
      id="stack"
      className="relative mx-3 overflow-hidden rounded-[28px] bg-[#f7f3e9] px-4 py-16 sm:mx-5 sm:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,37,46,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,37,46,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '84px 84px',
        }}
      />

      <div className="relative mx-auto min-h-[560px] max-w-5xl lg:min-h-[520px]">
        <div className="relative pt-4 text-center lg:pt-[38%]">
          <Chip
            label="Stack"
            chip="bg-[#e5f2fa]"
            accent="#039cfb"
            className="absolute left-[calc(50%-142px)] top-0 lg:top-[36%]"
            rotate={-19}
            scale={0.65}
          />
          <h2 className="text-[32px] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] sm:text-[44px]">
            TOOLS I
            <br className="lg:hidden" /> DESIGN WITH
          </h2>
        </div>

        <div className="mt-10 grid gap-3 lg:mt-0 lg:block">
          {stacks.map((item) => {
            const expanded = open === item.title
            return (
              <motion.button
                key={item.title}
                type="button"
                data-hoverable
                onClick={() => setOpen(expanded ? null : item.title)}
                className={`w-full rounded-xl px-4 py-3 text-left shadow-[0_4px_0_rgba(0,0,0,0.08)] lg:absolute lg:w-[268px] ${item.bg} ${item.pos}`}
                initial={{ rotate: item.rotate }}
                animate={{ rotate: expanded ? 0 : item.rotate }}
                whileHover={{ rotate: 0, y: -5, scale: 1.02, zIndex: 30 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                {...hoverHandlers}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[16px] font-semibold tracking-[-0.01em] text-[#1f1f1f]">
                    {item.title}
                  </span>
                  <motion.span
                    className="text-[18px] leading-none text-[#1f1f1f]/70"
                    animate={{ rotate: expanded ? 45 : 0 }}
                  >
                    +
                  </motion.span>
                </div>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.p
                      className="overflow-hidden text-[14px] leading-[1.5] text-[#1f1f1f]/70"
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 8 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      {item.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Footer({ hoverHandlers }: { hoverHandlers: Hover }) {
  return (
    <footer id="footer" className="relative mx-3 mb-28 overflow-hidden rounded-[28px] sm:mx-5">
      <img
        src={BACKDROP}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative px-6 py-14 text-[#00252e] sm:px-12">
        <div className="relative overflow-hidden rounded-2xl border-2 border-white/60 bg-white/40 p-6 backdrop-blur-md sm:p-10">
          <div className="flex flex-wrap gap-3">
            <Chip label="UI/UX Design" chip="bg-[#f4eaf5]" accent="#ec68fd" rotate={-6} scale={0.72} />
            <Chip label="Figma" chip="bg-[#f4f8e8]" accent="#93ba06" rotate={9} scale={0.72} />
          </div>
          <h2 className="mt-8 max-w-[16ch] text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[44px]">
            유저와 팀 모두가 만족하는 화면을 설계하겠습니다
          </h2>
          <motion.a
            href="mailto:hello@example.com"
            className="mt-8 inline-flex rounded-lg bg-white px-6 py-2.5 text-[15px] font-medium tracking-[-0.03em] text-[#1a1a1a] shadow-[0_6px_10px_rgba(0,0,0,0.15)]"
            whileHover={{ y: -3, scale: 1.03 }}
            {...hoverHandlers}
          >
            연락하기
          </motion.a>
        </div>
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-[18px] font-semibold tracking-[-0.03em]">{LOGO}</p>
          <div className="flex flex-wrap gap-5 text-[14px] tracking-[-0.02em]">
            <a href="#about" {...hoverHandlers}>
              소개
            </a>
            <a href="#stack" {...hoverHandlers}>
              스택
            </a>
            <a href="#project" {...hoverHandlers}>
              프로젝트
            </a>
            <a href="#footer" {...hoverHandlers}>
              연락
            </a>
          </div>
        </div>
        <p className="mt-8 text-[13px] text-[#00252e]/60">
          {NAME} · {ROLE}
        </p>
      </div>
    </footer>
  )
}

function Dock({ hoverHandlers }: { hoverHandlers: Hover }) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <nav className="pointer-events-none fixed bottom-4 left-1/2 z-[70] -translate-x-1/2">
      <div
        className="pointer-events-auto flex items-end gap-1.5 rounded-[16px] border border-white/70 bg-white/25 px-2 py-1.5 shadow-[0_2px_6px_rgba(0,0,0,0.25),inset_0_2px_6px_rgba(255,255,255,0.32)] backdrop-blur-[30px]"
        onMouseLeave={() => setActive(null)}
      >
        {dockItems.map((item, i) => {
          const dist = active === null ? 99 : Math.abs(active - i)
          const scale = active === null ? 1 : dist === 0 ? 1.4 : dist === 1 ? 1.15 : 1
          return (
            <a
              key={item.label}
              href={item.href}
              data-hoverable
              className="group relative origin-bottom"
              onMouseEnter={() => {
                setActive(i)
                hoverHandlers.onMouseEnter()
              }}
              onMouseLeave={hoverHandlers.onMouseLeave}
            >
              <motion.span
                className="block h-11 w-11 origin-bottom overflow-hidden rounded-[12px] shadow-[0_2px_6px_rgba(0,0,0,0.28)]"
                animate={{ scale, y: scale > 1.2 ? -8 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                <DockIcon kind={item.icon} />
              </motion.span>
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-2 py-1 text-[13px] font-medium tracking-[-0.03em] opacity-0 shadow-[0_1px_2px_rgba(0,0,0,0.25)] transition group-hover:opacity-100">
                {item.label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}

function TiltCard({
  rotate,
  children,
  hoverHandlers,
}: {
  rotate: number
  children: ReactNode
  hoverHandlers: Hover
}) {
  return (
    <motion.div
      data-hoverable
      className="origin-center"
      initial={{ rotate, y: 0 }}
      whileHover={{
        rotate: 0,
        y: -18,
        scale: 1.04,
        zIndex: 20,
        transition: { type: 'spring', stiffness: 260, damping: 18 },
      }}
      style={{ transformPerspective: 800 }}
      {...hoverHandlers}
    >
      {children}
    </motion.div>
  )
}

function Chip({
  label,
  chip,
  accent,
  className = '',
  rotate = 0,
  scale = 1,
}: {
  label: string
  chip: string
  accent: string
  className?: string
  rotate?: number
  scale?: number
}) {
  return (
    <motion.div
      className={`pointer-events-none relative inline-flex items-center ${className}`}
      style={{ rotate, scale }}
    >
      <div className={`relative rounded-[7px] px-3 py-1.5 shadow-[0_0_10px_rgba(0,0,0,0.04)] ${chip}`}>
        <p className="pr-2 text-center text-[15px] font-semibold text-[#212121]">{label}</p>
        <svg
          className="absolute -bottom-1 -right-1 h-4 w-4"
          viewBox="0 0 18.109 18.301"
          aria-hidden
        >
          <path d="M 2.03 2.5 L 18.109 13.94 L 3.804 14.25 C 1.323 14.304 -0.515 11.96 0.13 9.564 Z" fill="rgb(0,0,0)" opacity="0.3" />
          <path d="M 2 2.501 L 18.079 13.941 L 7.104 18.06 C 4.68 18.97 2.092 17.188 2.075 14.6 L 2 2.5 Z" fill={accent} />
          <path d="M 18.08 13.76 L 2 2.32 L 15.76 0 Z" fill="rgb(33, 33, 33)" />
        </svg>
      </div>
      <span
        className="ml-[-6px] grid h-8 w-8 place-items-center rounded-full border-[1.7px] border-white shadow-[-2px_3px_2px_rgba(0,0,0,0.24)]"
        style={{ background: accent }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
      </span>
    </motion.div>
  )
}

function Pin() {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-hidden>
      <circle cx="8.13" cy="12.19" r="7.6" transform="rotate(-2.6 8.13 12.19)" fill="#DC2626" />
      <path d="M5.58 6.27 L14.21 11.03 L10.63 13.83 C8.43 13.46 7.44 12.91 6 11.4 L5.58 6.27 Z" fill="#B91C1C" />
      <circle cx="11.3" cy="6.23" r="5.96" transform="rotate(-2.6 11.3 6.23)" fill="#EF4444" />
    </svg>
  )
}

function FoldCorner() {
  return (
    <svg
      className="pointer-events-none absolute right-0 top-0 h-10 w-10"
      viewBox="0 0 42 45"
      aria-hidden
    >
      <path d="M 0 0.037 L 44 37.975 L 16.203 44.111 C 13.028 44.812 9.867 42.892 9.163 39.834 Z" fill="rgb(0,0,0)" opacity="0.2" />
      <path d="M 0 -0.028 L 41.061 38.034 C 23.465 38.953 20.986 39.177 8.125 39.849 C 4.89 40.018 2.125 37.634 1.949 34.524 Z" fill="rgb(199,251,3)" />
      <path d="M 41.061 38.739 L 0.002 0.038 L 29.017 -1.705 C 36.028 -2.127 41.901 3.537 41.733 10.559 Z" fill="rgb(0,37,46)" />
    </svg>
  )
}

function Paperclip() {
  return (
    <svg width="24" height="38" viewBox="0 0 30 48" fill="none" aria-hidden>
      <path
        d="M 0 16.005 L 14.5 43.775 C 16.602 47.799 21.568 49.358 25.593 47.257 C 29.618 45.155 31.177 40.189 29.075 36.164 L 11.495 2.496 C 10.308 0.222 7.502 -0.659 5.227 0.528 C 2.991 1.696 2.096 4.436 3.211 6.699 L 5.27 10.878"
        stroke="#3e4cff"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function DockIcon({ kind }: { kind: 'notes' | 'photos' | 'finder' | 'mail' }) {
  if (kind === 'notes') {
    return (
      <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
        <rect width="48" height="48" rx="11" fill="#fff" />
        <rect width="48" height="12" rx="11" fill="#fcd34d" />
        <rect y="8" width="48" height="5" fill="#fcd34d" />
        {[18, 25, 32, 39].map((y) => (
          <rect key={y} x="8" y={y} width="32" height="2" rx="1" fill="#e5e0d5" />
        ))}
      </svg>
    )
  }
  if (kind === 'photos') {
    return (
      <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
        <rect width="48" height="48" rx="11" fill="#fff" />
        {[
          ['#f87171', 0],
          ['#fbbf24', 45],
          ['#4ade80', 90],
          ['#22d3ee', 135],
          ['#60a5fa', 180],
          ['#a78bfa', 225],
          ['#f472b6', 270],
          ['#fb923c', 315],
        ].map(([fill, deg]) => (
          <ellipse
            key={deg as number}
            cx="24"
            cy="17"
            rx="6.5"
            ry="11"
            fill={fill as string}
            opacity="0.75"
            transform={`rotate(${deg} 24 24)`}
          />
        ))}
      </svg>
    )
  }
  if (kind === 'finder') {
    return (
      <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="finderBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8ed0ff" />
            <stop offset="1" stopColor="#1d7ae0" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="11" fill="url(#finderBg)" />
        <path d="M24 4 v40" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.5" />
        <circle cx="16" cy="20" r="2.4" fill="#0b2e52" />
        <circle cx="32" cy="20" r="2.4" fill="#0b2e52" />
        <path
          d="M15 31 q9 6 18 0"
          stroke="#0b2e52"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="mailBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5cc0ff" />
          <stop offset="1" stopColor="#1668d8" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" fill="url(#mailBg)" />
      <rect x="8" y="15" width="32" height="20" rx="4" fill="#fff" />
      <path
        d="M9 18 l15 11 l15 -11"
        stroke="#1668d8"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function Doodles() {
  return (
    <>
      <svg className="absolute left-[8%] top-[18%] h-24 w-32 opacity-90" viewBox="0 0 126 97" fill="none">
        <path
          fillRule="evenodd"
          d="M13.4 24.6C22.7 5 54.3-1 65.4 14.7c1.9 2.6 2 2.8 4 2.7C80.7 17 93.3 28.3 95.4 40.6c.4 2.2.5 2.3 3.3 3.5C123.8 54.2 114.8 88.1 86 92.4c-8.6 1.3-9-7 1.7-8.9 23.2-4.7 29.6-23.7 10.5-31.1l-1.3-.5-1.5 4.7c-3.8 12.2-17.3 18.1-21.9 9.4-5.3-10.1 4.1-23.6 16.5-23.6 2.1 0 2.1 0 .3-3.4C85.4 31.6 69.5 21.7 70 27.1c1.6 18.5-18.9 33-23.8 16.8-2.3-7.6 2.3-16.9 11.2-22.6 3.7-2.4 3.6-2.6-1.4-5.1C42.4 9.5 20.3 17.9 14.8 31.9c-2.4 6.2-4.4-.8-1.4-7.3z"
          fill="#FFDE05"
        />
      </svg>
      <svg className="absolute right-[6%] top-[28%] h-28 w-36" viewBox="0 0 167 148" fill="none">
        <path
          fillRule="evenodd"
          d="M108.2 8.2C97.6 13.3 38 36.8 14.4 51.6 5.4 57.2 7.4 56.9 13.8 65.5c6.7 9 8.3 10.7 13.6 14.3 17.7 12.2 31.7 9.8 33.2 10-2.2 1.4-5.5 3.8-12.6 7.9-6.3 3.7-6.2 3.4-2.4 9.4 13.9 22.2 46.5 33.9 70.4 22.8 2.4-1.1-.8-5.9-9.5-3.1-13.4 4.4-30.8 1-43.5-8.5-3.2-2.4-14.8-15.4-14.3-16.1 4-5.3 91-44.9 91.3-44.6 3.9 2.6 7.7 19.5 6.7 29.5-1.1 11-12.6 27.5-24.3 34.4-4.3 2.5-1.3 5.7 4.5 4.7 8.3-1.4 24.2-20 27.6-32.1 2.6-9.5.5-24.7-4.5-32.1-8.3-12.3-8.4-12.3-20.6-6.3-8.5 4.2-9.1 4.4-7.5 2 7.8-11.5 7.6-35-2.3-46.2-4.5-8.8-9.2-6.5-15.3-3.5z"
          fill="#C4E727"
        />
      </svg>
      <p className="font-script absolute left-[4%] top-[52%] rotate-12 text-[29px] lowercase tracking-[-0.06em] text-[#ffd440]">
        asaf sdag
      </p>
      <p className="font-script absolute right-[10%] top-[62%] -rotate-6 text-[29px] lowercase tracking-[-0.06em] text-[#156cdd]">
        asaf sdag
      </p>
      <svg className="absolute right-[18%] top-[12%] h-10 w-16" viewBox="0 0 70 37">
        <circle cx="16.8" cy="18.3" r="16.8" fill="#fff" />
        <circle cx="53.2" cy="18.3" r="16.8" fill="#fff" />
        <circle cx="10.7" cy="19.9" r="6.44" fill="#000" />
        <circle cx="47" cy="19.8" r="6.44" fill="#000" />
      </svg>
      <svg className="absolute bottom-[22%] left-[12%] h-16 w-16 text-[#7CC2F6]" viewBox="0 0 175 175" fill="currentColor">
        <path d="M78.9 62.2c-2.2-1.9-3.8-5.2-4.4-7.7-.8-3.7 4.2-8.7 8.2.1 3.1 6.7 6.4 7.6 9.1 2.3 2.7-5.3 7.7-5.2 6.1.1-2 6.6-13.7 9.8-19 5.2z" />
      </svg>
    </>
  )
}
