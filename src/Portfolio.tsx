import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'

const NAME = '내 이름 / 영문이름'
const ROLE = 'UI/UX 디자이너'

const stats = [
  {
    value: '8+',
    title: 'Years of Experience',
    body: '웹사이트, 앱, 디지털 제품을 사용성에 맞춰 설계합니다.',
    rotate: -3,
  },
  {
    value: '40+',
    title: 'Projects Designed',
    body: '랜딩부터 모바일 앱까지, 브랜드와 제품 경험을 한 흐름으로 만듭니다.',
    rotate: 5,
  },
  {
    value: '12+',
    title: 'Industries Explored',
    body: 'SaaS, 핀테크, AI, 에이전시, 서비스 비즈니스를 아우릅니다.',
    rotate: -8,
  },
  {
    value: '100%',
    title: 'Responsive Delivery',
    body: '데스크톱과 모바일에서 동일한 완성도로 구현합니다.',
    rotate: -2,
  },
]

const projects = [
  {
    title: 'Northline',
    tags: ['Branding & Website', 'Figma', '2026'],
    rotate: 7.65,
    image:
      'linear-gradient(140deg, #1a1a1a 0%, #3d2b1f 40%, #c9a227 100%)',
  },
  {
    title: 'Kite Studio',
    tags: ['Website Design', 'Figma', '2026'],
    rotate: -3.12,
    image:
      'linear-gradient(160deg, #0b1f2a 0%, #1d4e89 55%, #7cc2f6 100%)',
  },
  {
    title: 'Sunoma',
    tags: ['Branding', 'Figma', '2026'],
    rotate: -7,
    image:
      'linear-gradient(145deg, #2a1208 0%, #c45c26 50%, #f4d4a8 100%)',
  },
  {
    title: 'Wild Pup',
    tags: ['Branding & Website', 'Framer', '2026'],
    rotate: 7.65,
    image:
      'linear-gradient(150deg, #10210c 0%, #3a7d2c 45%, #c7fb03 100%)',
  },
  {
    title: 'Miro Space',
    tags: ['Brand Identity', 'Photoshop', '2026'],
    rotate: -7,
    image:
      'linear-gradient(155deg, #1a1024 0%, #5b3cc4 50%, #f4eaf5 100%)',
  },
]

const services = [
  { title: 'Website Design', bg: 'bg-[#fbe7e3]', icon: 'bg-[#e8a2a6]' },
  { title: 'UI/UX Design', bg: 'bg-[#d9e7f5]', icon: 'bg-[#4a96ed]' },
  { title: 'Brand Identity', bg: 'bg-[#f3eebc]', icon: 'bg-[#e8d210]' },
  { title: 'Product Systems', bg: 'bg-[#dcf5e0]', icon: 'bg-[#52de85]' },
  { title: 'AI Exploration', bg: 'bg-[#ebe6f3]', icon: 'bg-[#8168fd]' },
]

const reviews = [
  {
    name: 'Ayesha K.',
    role: 'Creative Director',
    quote: '“과하지 않으면서도 선명한 디자인.”',
    body: '현대적이면서도 실무에 바로 넘길 수 있을 만큼 정리가 되어 있었습니다.',
    rotate: -5,
    initial: 'A',
    tint: 'bg-[#fde8c8]',
  },
  {
    name: 'Daniel R.',
    role: 'Product Lead',
    quote: '“흐름이 훨씬 쓰기 쉬워졌습니다.”',
    body: '사용자 여정을 다듬어 제품이 더 집중되고 전문적으로 느껴졌습니다.',
    rotate: 3,
    initial: 'D',
    tint: 'bg-[#d9e7f5]',
  },
  {
    name: 'Sarah M.',
    role: 'Founder',
    quote: '“웹사이트가 드디어 우리 브랜드처럼 느껴집니다.”',
    body: '아이디어를 이해하기 쉬운, 정제된 웹 경험으로 바꿔 주었습니다.',
    rotate: 7,
    initial: 'S',
    tint: 'bg-[#e8f5d4]',
  },
]

const faqs = [
  {
    q: 'What can you design?',
    a: '웹사이트, 앱 UI, 브랜드 시스템, 랜딩 페이지까지 디지털 제품의 시각과 흐름을 함께 설계합니다.',
    color: 'bg-[#fedcdd]',
  },
  {
    q: 'Do you work with developers?',
    a: 'Figma 핸드오프와 컴포넌트 가이드를 기준으로 개발팀과 바로 협업할 수 있게 준비합니다.',
    color: 'bg-[#e0fd72]',
  },
  {
    q: 'What do you need from me?',
    a: '목표, 레퍼런스, 기존 브랜드 자산이면 충분합니다. 없는 부분은 함께 정리합니다.',
    color: 'bg-[#f3ea9a]',
  },
  {
    q: 'How fast can we start?',
    a: '일정과 범위를 짧게 확인한 뒤 보통 며칠 안에 킥오프할 수 있습니다.',
    color: 'bg-[#bbdafe]',
  },
  {
    q: 'Do you only design visuals?',
    a: '시각뿐 아니라 정보 구조, 인터랙션, 사용 흐름까지 제품이 실제로 작동하는 방식을 다룹니다.',
    color: 'bg-[#c7f8d9]',
  },
]

const dockItems = [
  { href: '#about', label: 'About', color: 'from-sky-400 to-blue-600' },
  { href: '#project', label: 'Projects', color: 'from-lime-300 to-green-600' },
  { href: '#services', label: 'Services', color: 'from-amber-300 to-orange-500' },
  { href: '#footer', label: 'Contact', color: 'from-rose-400 to-pink-600' },
]

export default function Portfolio() {
  const [hovering, setHovering] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [isFinePointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  )

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
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
    if (!isFinePointer) return
    document.body.classList.add('custom-cursor')
    return () => document.body.classList.remove('custom-cursor')
  }, [isFinePointer])

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      const nx = (e.clientX / window.innerWidth - 0.5) * -36
      const ny = (e.clientY / window.innerHeight - 0.5) * -36
      parallaxX.set(nx)
      parallaxY.set(ny)
    },
    [mouseX, mouseY, parallaxX, parallaxY],
  )

  const hoverHandlers = useMemo(
    () => ({
      onMouseEnter: () => setHovering(true),
      onMouseLeave: () => setHovering(false),
    }),
    [],
  )

  return (
    <div
      className="relative min-h-svh overflow-x-hidden bg-[#f3efe6] text-[#00252e] antialiased"
      onMouseMove={onMove}
    >
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
        <Projects hoverHandlers={hoverHandlers} />
        <Services hoverHandlers={hoverHandlers} />
        <Reviews hoverHandlers={hoverHandlers} />
        <Faqs
          openFaq={openFaq}
          setOpenFaq={setOpenFaq}
          hoverHandlers={hoverHandlers}
        />
        <Footer hoverHandlers={hoverHandlers} />
      </div>

      <Dock hoverHandlers={hoverHandlers} />

      {isFinePointer && (
        <>
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[80] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c7fb03]/35 blur-2xl mix-blend-multiply"
            style={{ x: glowX, y: glowY }}
            animate={{ scale: hovering ? 1.55 : 1, opacity: hovering ? 0.9 : 0.55 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          />
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[90] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00252e] mix-blend-difference"
            style={{ x: cursorX, y: cursorY }}
            animate={{
              scale: hovering ? 2.4 : 1,
              backgroundColor: hovering ? '#c7fb03' : '#00252e',
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          />
          <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[90] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00252e]/40"
            style={{ x: glowX, y: glowY }}
            animate={{ scale: hovering ? 1.35 : 1, opacity: hovering ? 0.35 : 0.7 }}
          />
        </>
      )}
    </div>
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
      <div className="relative flex min-h-[78vh] flex-col px-5 pb-16 pt-6 sm:px-10 sm:pt-8 lg:min-h-[86vh]">
        <header className="flex items-center justify-between">
          <a
            href="#hero"
            className="text-[24px] font-semibold uppercase tracking-[-0.04em] text-white"
            {...hoverHandlers}
          >
            Creatie®
          </a>
        </header>

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
                  Available for work
                </span>
              </div>
              <p className="mt-1 text-[13px] font-medium uppercase tracking-[-0.04em] text-white">
                {NAME} — {ROLE}
              </p>
            </div>
          </motion.div>

          <div className="relative px-4 text-center">
            <Chip
              label="Illustration"
              chip="bg-[#f4eaf5]"
              accent="#ec68fd"
              className="absolute -left-2 top-[-18px] hidden sm:flex md:-left-16"
              rotate={10}
              scale={0.72}
            />
            <h1 className="max-w-[16ch] text-center text-[28px] font-extrabold leading-[0.95] tracking-[-0.04em] text-white sm:text-[44px] lg:text-[56px]">
              Design that makes people look twice
            </h1>
            <Chip
              label="UI/UX Design"
              chip="bg-[#f4f8e8]"
              accent="#93ba06"
              className="absolute -right-2 bottom-[-22px] hidden sm:flex md:-right-20"
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
          <h2 className="text-[40px] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] sm:text-[64px] lg:text-[80px]">
            i make DESIGNs
            <br />
            PEOPLE REMEMBER
          </h2>
          <p className="mt-6 max-w-md text-[16px] font-medium leading-relaxed tracking-[-0.03em] text-[#00252e]/80">
            웹사이트, 앱, 브랜드 시스템을 깔끔하게 다듬어
            <br />
            아이디어가 더 선명하고 신뢰감 있게 보이게 합니다.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="h-px w-8 bg-[#00252e]" />
            <p className="text-[16px] font-medium tracking-[-0.03em]">
              and work with purpose.
            </p>
          </div>
          <motion.a
            href="#footer"
            className="relative mt-8 inline-flex overflow-hidden rounded-xl bg-white px-5 py-3 text-[14px] font-medium tracking-[-0.04em] shadow-[0_6px_10px_rgba(0,0,0,0.15)]"
            style={{ rotate: -6 }}
            whileHover={{ rotate: 0, y: -4 }}
            {...hoverHandlers}
          >
            Start a project
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
      <div className="relative">
        <div className="relative mb-12 text-center">
          <Chip
            label="Projects"
            chip="bg-[#e5f2fa]"
            accent="#039cfb"
            className="absolute left-4 top-[-18px] sm:left-16"
            rotate={-19}
            scale={0.65}
          />
          <h2 className="text-[36px] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] sm:text-[56px]">
            Projects That Tell Stories
          </h2>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <TiltCard
              key={project.title}
              rotate={project.rotate}
              hoverHandlers={hoverHandlers}
            >
              <article className="relative overflow-hidden rounded-[16px] border border-white bg-white/40 p-3 shadow-[0_3px_19px_rgba(0,0,0,0.16)] backdrop-blur-[8px]">
                <div className="mb-3 flex items-center gap-1.5 rounded-2xl border-b border-white bg-[#d1d1d1]/18 px-3 py-2 backdrop-blur-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#fd5d5c]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#fac900]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#34c75a]" />
                </div>
                <div
                  className="relative h-40 overflow-hidden rounded-lg bg-black shadow-[0_3px_13px_rgba(0,0,0,0.24)] sm:h-44"
                  style={{ backgroundImage: project.image }}
                >
                  <div className="absolute inset-6 rounded-md border border-white/20 bg-white/10 backdrop-blur-[2px]" />
                  <div className="absolute bottom-4 left-4 right-4 h-8 rounded bg-white/80" />
                </div>
                <div className="flex items-start justify-between gap-2 px-1 pb-2 pt-3">
                  <div>
                    <h3 className="text-[18px] font-semibold tracking-[-0.03em]">
                      {project.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-black/5 px-2 py-1 text-[10px] font-medium tracking-[-0.04em] text-[#272727]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Paperclip />
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services({ hoverHandlers }: { hoverHandlers: Hover }) {
  return (
    <section id="services" className="px-5 py-16 sm:px-10 lg:px-16">
      <div className="relative mb-10">
        <Chip
          label="Services"
          chip="bg-[#e5f2fa]"
          accent="#039cfb"
          className="absolute -top-4 right-0 sm:right-10"
          rotate={-23}
          scale={0.7}
        />
        <h2 className="text-[40px] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] sm:text-[64px]">
          where i
          <br />
          can help you
        </h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            data-hoverable
            className={`flex items-center justify-between rounded-lg px-4 py-4 shadow-[4px_4px_0_rgba(0,0,0,0.14)] ${service.bg}`}
            initial={{ rotate: i % 2 === 0 ? -1.5 : 1.5 }}
            whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            {...hoverHandlers}
          >
            <p className="text-[18px] font-semibold tracking-[-0.03em]">{service.title}</p>
            <span
              className={`grid h-10 w-10 place-items-center rounded-full border-[1.7px] border-white shadow-[-4px_3px_0_rgba(0,0,0,0.15)] ${service.icon}`}
            >
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Reviews({ hoverHandlers }: { hoverHandlers: Hover }) {
  return (
    <section id="reviews" className="px-5 py-8 sm:px-10 lg:px-16">
      <div className="relative mb-12">
        <Chip
          label="Reviews"
          chip="bg-[#e5f2fa]"
          accent="#039cfb"
          className="absolute -top-2 right-2"
          rotate={-17}
          scale={0.7}
        />
        <h2 className="text-[40px] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] sm:text-[64px]">
          CLIENTS LIKED
          <br />
          THE PIXELS
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {reviews.map((review) => (
          <TiltCard key={review.name} rotate={review.rotate} hoverHandlers={hoverHandlers}>
            <article className="relative rounded-[14px] bg-white p-5 shadow-[12px_6px_0_rgba(0,0,0,0.12)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Pin />
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold ${review.tint}`}
                >
                  {review.initial}
                </div>
                <div>
                  <p className="text-[13px] font-medium capitalize tracking-[-0.04em]">
                    {review.name}
                  </p>
                  <p className="text-[11px] font-medium capitalize tracking-[-0.04em] text-[#272727]/55">
                    {review.role}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[16px] font-semibold tracking-[-0.03em]">{review.quote}</p>
              <div className="mt-3 flex gap-0.5 text-[#fcbb40]">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-[#272727]/80">{review.body}</p>
              <div className="absolute -bottom-1 -right-1">
                <FoldCorner />
              </div>
            </article>
          </TiltCard>
        ))}
      </div>
    </section>
  )
}

function Faqs({
  openFaq,
  setOpenFaq,
  hoverHandlers,
}: {
  openFaq: number | null
  setOpenFaq: (i: number | null) => void
  hoverHandlers: Hover
}) {
  return (
    <section id="faqs" className="px-5 py-16 sm:px-10 lg:px-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative">
          <Chip
            label="FAQs"
            chip="bg-[#e5f2fa]"
            accent="#039cfb"
            className="absolute -top-4 right-0"
            rotate={-18}
            scale={0.7}
          />
          <h2 className="text-[40px] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] sm:text-[56px]">
            Answer Before
            <br />
            We Starts
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const open = openFaq === i
            return (
              <motion.button
                key={faq.q}
                type="button"
                data-hoverable
                onClick={() => setOpenFaq(open ? null : i)}
                className={`w-full rounded-xl p-4 text-left shadow-[7px_6px_0_rgba(0,0,0,0.12)] ${faq.color}`}
                initial={{ rotate: i % 2 ? 1 : -1 }}
                whileHover={{ rotate: 0, y: -4 }}
                {...hoverHandlers}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[16px] font-medium tracking-[-0.02em]">{faq.q}</p>
                  <span className="grid h-6 w-6 shrink-0 place-items-center text-xl leading-none">
                    {open ? '–' : '+'}
                  </span>
                </div>
                <AnimatePresence>
                  {open && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pt-2 text-[14px] leading-relaxed text-black/70"
                    >
                      {faq.a}
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
      <div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_0%,#2a2a2a,#070707)]" />
      <div className="relative px-6 py-14 text-white sm:px-12">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-10">
          <div className="flex flex-wrap gap-3">
            <Chip label="UI/UX Design" chip="bg-[#f4eaf5]" accent="#ec68fd" rotate={-6} scale={0.72} />
            <Chip label="Illustration" chip="bg-[#f4f8e8]" accent="#93ba06" rotate={9} scale={0.72} />
            <Chip label="3D Design" chip="bg-[#f1eefc]" accent="#8168fd" rotate={-5} scale={0.72} />
          </div>
          <h2 className="mt-8 max-w-[12ch] text-[36px] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] sm:text-[52px]">
            Let’s build something memorable
          </h2>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-[14px] font-semibold tracking-[-0.3px]">
              <span className="h-px w-8 bg-white" />
              Have an idea?
            </p>
            <p className="text-[14px] font-semibold tracking-[-0.3px] sm:text-right">
              Let’s turn it into a sharp digital experience.
            </p>
          </div>
          <motion.a
            href="mailto:hello@example.com"
            className="mt-8 inline-flex rounded-lg bg-white px-6 py-2.5 text-[14px] font-medium tracking-[-0.04em] text-[#1a1a1a] shadow-[0_6px_10px_rgba(0,0,0,0.15)]"
            whileHover={{ y: -3, scale: 1.03 }}
            {...hoverHandlers}
          >
            Let's chat
          </motion.a>
        </div>
        <div className="mt-10 flex flex-col gap-6 text-white/90 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-[20px] font-medium uppercase tracking-[-0.04em]">Creatie®</p>
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-[13px] uppercase tracking-[-0.03em] sm:flex sm:gap-6">
            <a href="#about" {...hoverHandlers}>
              ABOUT
            </a>
            <a href="#services" {...hoverHandlers}>
              SERVICES
            </a>
            <a href="#project" {...hoverHandlers}>
              PROJECTS
            </a>
            <a href="#reviews" {...hoverHandlers}>
              REVIEWS
            </a>
            <a href="#faqs" {...hoverHandlers}>
              FAQS
            </a>
            <a href="#footer" {...hoverHandlers}>
              CONTACT
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

function Paperclip() {
  return (
    <svg width="22" height="36" viewBox="0 0 30 48" fill="none" aria-hidden className="-rotate-[20deg]">
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
