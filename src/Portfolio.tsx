import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const NAME = '내 이름 / 영문이름'
const ROLE = 'UI/UX 디자이너'

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
    group: 'Design Tool',
    title: 'Figma',
    detail: 'Auto Layout, Component, Prototyping',
    bg: 'bg-[#d9e7f5]',
    icon: 'bg-[#4a96ed]',
  },
  {
    group: 'Collaboration',
    title: 'Git',
    detail: '버전 관리와 변경 이력',
    bg: 'bg-[#f3eebc]',
    icon: 'bg-[#e8d210]',
  },
  {
    group: 'Collaboration',
    title: 'GitHub',
    detail: '저장소 협업과 핸드오프',
    bg: 'bg-[#dcf5e0]',
    icon: 'bg-[#52de85]',
  },
  {
    group: 'Collaboration',
    title: 'Notion',
    detail: '문서화와 팀 공유',
    bg: 'bg-[#ebe6f3]',
    icon: 'bg-[#8168fd]',
  },
]

const works = [
  {
    title: '메인 페이지 레이아웃 및 시인성 개편',
    body: '주요 일정 카드의 크기를 확장하고 핵심 영역(캘린더·추천 루트) 배치를 조정하여 탐색 용이성을 높였습니다.',
    rotate: 6,
  },
  {
    title: 'Step UI 전환으로 입력 피로도 개선',
    body: '한 화면에 모여 있던 AI 일정 입력 폼을 단계별 대화형 UI로 개편해 작성 부담을 낮췄습니다.',
    rotate: -4,
  },
  {
    title: '8px 그리드 기반 디자인 시스템',
    body: '파편화되어 있던 프로필 아바타와 카드 요소를 XS~XL 5가지 표준 규격으로 정돈해 시각적 통일성을 확보했습니다.',
    rotate: 5,
  },
  {
    title: '상세·마이페이지 레이아웃 정돈',
    body: '답답한 박스 테두리를 정리하고 폰트 스케일을 체계화하여 정보 전달력을 개선했습니다.',
    rotate: -7,
  },
  {
    title: '반응형 캔버스 및 Figma 핸드오프',
    body: '1920px(메인 컨테이너 1280px) 기준 Auto Layout을 적용하고 개발 협업 가이드와 Figma 디자인 핸드오프 문서를 공유했습니다.',
    rotate: 3,
  },
]

const dockItems = [
  { href: '#about', label: '소개', color: 'from-sky-400 to-blue-600' },
  { href: '#stack', label: '스택', color: 'from-amber-300 to-orange-500' },
  { href: '#project', label: '프로젝트', color: 'from-lime-300 to-green-600' },
  { href: '#footer', label: '연락', color: 'from-rose-400 to-pink-600' },
]

export default function Portfolio() {
  const [hovering, setHovering] = useState(false)
  const [showCursor, setShowCursor] = useState(false)

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
    <div className="relative min-h-svh overflow-x-hidden bg-[#f3efe6] text-[#00252e] antialiased">
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
        <Hero hoverHandlers={hoverHandlers} />
        <About hoverHandlers={hoverHandlers} />
        <Stack hoverHandlers={hoverHandlers} />
        <Projects hoverHandlers={hoverHandlers} />
        <Footer hoverHandlers={hoverHandlers} />
      </div>

      <Dock hoverHandlers={hoverHandlers} />
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

function Hero({ hoverHandlers }: { hoverHandlers: Hover }) {
  return (
    <section
      id="hero"
      className="relative mx-3 mt-3 overflow-hidden rounded-[28px] bg-[#111] text-white sm:mx-5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#3a3a3a_0%,#0b0b0b_55%,#050505_100%)]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />
      <div className="relative flex min-h-[78vh] flex-col px-5 pb-16 pt-10 sm:px-10 sm:pt-12 lg:min-h-[86vh]">
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 rounded-2xl border-2 border-white/18 bg-white/12 px-3 py-2 shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.45)] backdrop-blur-[50px]"
            {...hoverHandlers}
          >
            <div className="h-9 w-9 overflow-hidden rounded-full bg-[#c7fb03] text-center text-sm font-bold leading-9 text-[#00252e]">
              내
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34c75a] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34c75a]" />
                </span>
                <span className="text-[12px] font-medium tracking-[-0.04em] text-white">
                  Open to opportunities
                </span>
              </div>
              <p className="mt-1 text-[13px] font-medium uppercase tracking-[-0.04em] text-white">
                {NAME} — {ROLE}
              </p>
            </div>
          </motion.div>

          <div className="relative px-4 text-center">
            <Chip
              label="Figma"
              chip="bg-[#f4eaf5]"
              accent="#ec68fd"
              className="absolute -left-2 top-[-18px] hidden sm:flex md:-left-16"
              rotate={10}
              scale={0.72}
            />
            <h1 className="max-w-[18ch] text-center text-[28px] font-extrabold leading-[0.95] tracking-[-0.04em] text-white sm:text-[44px] lg:text-[56px]">
              유저와 팀이 만족하는 화면을 설계합니다
            </h1>
            <Chip
              label="UI/UX Design"
              chip="bg-[#f4f8e8]"
              accent="#93ba06"
              className="absolute -right-2 bottom-[-22px] hidden sm:flex md:-right-24"
              rotate={10}
              scale={0.72}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function About({ hoverHandlers }: { hoverHandlers: Hover }) {
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
          <motion.a
            href="#project"
            className="relative mt-8 inline-flex overflow-hidden rounded-xl bg-white px-5 py-3 text-[14px] font-medium tracking-[-0.04em] shadow-[0_6px_10px_rgba(0,0,0,0.15)]"
            style={{ rotate: -6 }}
            whileHover={{ rotate: 0, y: -4 }}
            {...hoverHandlers}
          >
            Plan & With 보기
            <span className="absolute -right-1 -top-2 text-lg">
              <Pin />
            </span>
          </motion.a>
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

function Projects({ hoverHandlers }: { hoverHandlers: Hover }) {
  return (
    <section id="project" className="relative mx-3 overflow-hidden rounded-[28px] py-16 sm:mx-5">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#efe8d8_0%,#e7f0d4_100%)]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,37,46,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,37,46,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="relative mb-10 text-center">
          <Chip
            label="Project"
            chip="bg-[#e5f2fa]"
            accent="#039cfb"
            className="absolute left-0 top-[-18px] sm:left-8"
            rotate={-19}
            scale={0.65}
          />
          <h2 className="text-[36px] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] sm:text-[52px]">
            프로젝트
          </h2>
        </div>

        <TiltCard rotate={-2} hoverHandlers={hoverHandlers}>
          <article className="overflow-hidden rounded-[16px] border border-white bg-white/50 p-4 shadow-[0_3px_19px_rgba(0,0,0,0.16)] backdrop-blur-[8px] sm:p-6">
            <div className="mb-4 flex items-center gap-1.5 rounded-2xl border-b border-white bg-[#d1d1d1]/18 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#fd5d5c]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#fac900]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#34c75a]" />
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <PlanWithPreview />
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[-0.04em] text-black/50">
                  팀 프로젝트 · 2026.07 – 2026.08
                </p>
                <h3 className="mt-2 text-[28px] font-extrabold tracking-[-0.04em] sm:text-[34px]">
                  Plan & With
                </h3>
                <p className="mt-1 text-[15px] font-semibold text-[#00252e]/80">
                  AI 여행 일정 공유 플랫폼
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-[#00252e]/75">
                  여행 일정을 추천받고 공유하는 웹 서비스의 전체 UI/UX를 전담하여
                  레이아웃을 개편하고 디자인 시스템을 구축했습니다.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['UI/UX 전담', '팀 프로젝트', 'Figma', '2026.07 – 26.08'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-medium tracking-[-0.04em] text-[#272727]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </TiltCard>

        <p className="mb-6 mt-12 text-[14px] font-semibold tracking-[-0.03em] text-[#00252e]/70">
          주요 수행 내용 및 성과
        </p>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {works.map((work) => (
            <TiltCard key={work.title} rotate={work.rotate} hoverHandlers={hoverHandlers}>
              <article className="relative h-full rounded-xl border border-black/10 bg-white p-5 shadow-[16px_10px_0_rgba(0,0,0,0.1)]">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  <Pin />
                </div>
                <FoldCorner />
                <h4 className="pr-8 pt-2 text-[16px] font-bold leading-snug tracking-[-0.03em]">
                  {work.title}
                </h4>
                <p className="mt-2 text-[13px] font-medium leading-[150%] text-black/60">
                  {work.body}
                </p>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlanWithPreview() {
  return (
    <div className="relative min-h-[240px] overflow-hidden rounded-xl bg-[linear-gradient(160deg,#0d1f2d_0%,#1d6a6a_45%,#c9e86a_100%)] p-4 shadow-[0_3px_13px_rgba(0,0,0,0.24)] sm:min-h-[280px]">
      <div className="rounded-lg bg-white/95 p-3 text-[#00252e] shadow-lg">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold tracking-[-0.04em]">Plan & With</p>
          <p className="text-[10px] text-black/45">AI 일정 · 공유</p>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="col-span-2 rounded-md bg-[#e8f4ea] p-2">
            <p className="text-[9px] font-medium text-black/45">추천 루트</p>
            <p className="mt-1 text-[12px] font-bold">Day 1 · 성산 → 월정리</p>
            <div className="mt-2 h-1.5 rounded-full bg-[#93ba06]/40">
              <div className="h-full w-2/3 rounded-full bg-[#93ba06]" />
            </div>
          </div>
          <div className="rounded-md bg-[#e5f2fa] p-2">
            <p className="text-[9px] font-medium text-black/45">캘린더</p>
            <p className="mt-1 text-[16px] font-extrabold">08</p>
            <p className="text-[9px]">2026</p>
          </div>
        </div>
        <div className="mt-3 flex gap-1.5">
          {['일정', '동행', '공유'].map((step, i) => (
            <div
              key={step}
              className={`flex-1 rounded-full px-2 py-1 text-center text-[9px] font-semibold ${
                i === 0 ? 'bg-[#00252e] text-white' : 'bg-black/5 text-black/50'
              }`}
            >
              {i + 1}. {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Stack({ hoverHandlers }: { hoverHandlers: Hover }) {
  return (
    <section id="stack" className="px-5 py-16 sm:px-10 lg:px-16">
      <div className="relative mb-10">
        <Chip
          label="Stack"
          chip="bg-[#e5f2fa]"
          accent="#039cfb"
          className="absolute -top-4 right-0 sm:right-10"
          rotate={-23}
          scale={0.7}
        />
        <h2 className="text-[40px] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] sm:text-[64px]">
          기술 스택
        </h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {stacks.map((item, i) => (
          <motion.div
            key={item.title}
            data-hoverable
            className={`flex items-center justify-between rounded-lg px-4 py-4 shadow-[4px_4px_0_rgba(0,0,0,0.14)] ${item.bg}`}
            initial={{ rotate: i % 2 === 0 ? -1.5 : 1.5 }}
            whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            {...hoverHandlers}
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[-0.04em] text-black/45">
                {item.group}
              </p>
              <p className="text-[18px] font-semibold tracking-[-0.03em]">{item.title}</p>
              <p className="mt-0.5 text-[12px] font-medium text-black/60">{item.detail}</p>
            </div>
            <span
              className={`grid h-10 w-10 place-items-center rounded-full border-[1.7px] border-white shadow-[-4px_3px_0_rgba(0,0,0,0.15)] ${item.icon}`}
            >
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Footer({ hoverHandlers }: { hoverHandlers: Hover }) {
  return (
    <footer id="footer" className="relative mx-3 mb-28 overflow-hidden rounded-[28px] sm:mx-5">
      <div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_0%,#2a2a2a,#070707)]" />
      <div className="relative px-6 py-14 text-white sm:px-12">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-10">
          <div className="flex flex-wrap gap-3">
            <Chip label="UI/UX Design" chip="bg-[#f4eaf5]" accent="#ec68fd" rotate={-6} scale={0.72} />
            <Chip label="Figma" chip="bg-[#f4f8e8]" accent="#93ba06" rotate={9} scale={0.72} />
          </div>
          <h2 className="mt-8 max-w-[16ch] text-[32px] font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-[44px]">
            유저와 팀 모두가 만족하는 화면을 설계하겠습니다
          </h2>
          <motion.a
            href="mailto:hello@example.com"
            className="mt-8 inline-flex rounded-lg bg-white px-6 py-2.5 text-[14px] font-medium tracking-[-0.04em] text-[#1a1a1a] shadow-[0_6px_10px_rgba(0,0,0,0.15)]"
            whileHover={{ y: -3, scale: 1.03 }}
            {...hoverHandlers}
          >
            연락하기
          </motion.a>
        </div>
        <div className="mt-10 flex flex-col gap-6 text-white/90 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-[16px] font-medium tracking-[-0.04em]">{NAME}</p>
          <div className="flex flex-wrap gap-5 text-[13px] uppercase tracking-[-0.03em]">
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
        <p className="mt-8 text-[12px] text-white/50">
          {NAME} · {ROLE}
        </p>
      </div>
    </footer>
  )
}

function Dock({ hoverHandlers }: { hoverHandlers: Hover }) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <nav className="pointer-events-none fixed bottom-5 left-1/2 z-[70] -translate-x-1/2">
      <div
        className="pointer-events-auto flex items-end gap-2 rounded-2xl border border-[#e6e6eb] bg-[rgba(240,240,240,0.24)] px-2.5 py-2 shadow-[0_2px_6px_rgba(0,0,0,0.25),inset_0_2px_6px_rgba(255,255,255,0.32)] backdrop-blur-[30px]"
        onMouseLeave={() => setActive(null)}
      >
        {dockItems.map((item, i) => {
          const dist = active === null ? 99 : Math.abs(active - i)
          const scale = active === null ? 1 : dist === 0 ? 1.45 : dist === 1 ? 1.18 : 1
          return (
            <a
              key={item.label}
              href={item.href}
              data-hoverable
              className="group relative"
              onMouseEnter={() => {
                setActive(i)
                hoverHandlers.onMouseEnter()
              }}
              onMouseLeave={hoverHandlers.onMouseLeave}
            >
              <motion.span
                className={`block h-12 w-12 overflow-hidden rounded-[18px] bg-gradient-to-br ${item.color} shadow-md`}
                animate={{ scale, y: scale > 1.2 ? -10 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              />
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-2 py-1 text-[12px] font-medium tracking-[-0.04em] opacity-0 shadow-[0_1px_2px_rgba(0,0,0,0.25)] transition group-hover:opacity-100">
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
