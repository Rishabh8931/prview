"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleCheck,
  Code2,
  GitBranch,
  GitPullRequest,
  LockKeyhole,
  Play,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";

import { ModeToggle } from "@/components/ui/theme-toggle";
import { UserMenuWithSession } from "@/features/auth/components/user-menu";

const ease = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};

const features = [
  {
    icon: ScanSearch,
    eyebrow: "Signal over noise",
    title: "Only the findings that matter",
    text: "Chai traces the change through your codebase and filters out the low-value comments that slow teams down.",
    className: "md:col-span-2",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Built for trust",
    title: "Reviews with a reason",
    text: "Every finding explains the risk, points to the source, and gives your team a practical next step.",
    className: "",
  },
  {
    icon: Zap,
    eyebrow: "Fits your flow",
    title: "Zero new rituals",
    text: "Open a pull request in GitHub. Chai reviews it automatically and posts right where your team already works.",
    className: "",
  },
  {
    icon: LockKeyhole,
    eyebrow: "Private by default",
    title: "Your code stays yours",
    text: "Scoped repository access, secure credentials, and no copy-pasting sensitive code into another tool.",
    className: "md:col-span-2",
  },
];

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
      <span className="h-px w-6 bg-current" />
      {children}
    </div>
  );
}

function ProductPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 0.2, duration: 0.9, ease }}
      className="relative mx-auto mt-16 w-full max-w-6xl [perspective:1200px]"
    >
      <div className="absolute -inset-8 rounded-[2.5rem] bg-emerald-500/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#101413] text-white shadow-2xl shadow-emerald-950/30">
        <div className="flex h-12 items-center justify-between border-b border-white/10 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-red-400/80" />
            <span className="size-2 rounded-full bg-amber-400/80" />
            <span className="size-2 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex items-center gap-2 text-[10px] text-white/40">
            <GithubLogoIcon className="size-3.5" />
            acme / checkout
          </div>
          <span className="hidden font-mono text-[10px] text-white/30 sm:block">
            chai/reviewer
          </span>
        </div>

        <div className="grid min-h-[330px] md:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-white/10 p-5 sm:p-7 md:border-b-0 md:border-r">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Pull request #184</div>
                <div className="mt-1 text-[11px] text-white/40">
                  Improve checkout session handling
                </div>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] text-emerald-300">
                Open
              </span>
            </div>
            <div className="space-y-2 font-mono text-[11px] leading-6 text-white/45">
              <div className="flex gap-5">
                <span className="w-5 text-right text-white/20">42</span>
                <span className="text-sky-300/80">{"const session = await"}</span>
              </div>
              <div className="flex rounded bg-red-400/[0.07] px-2 text-red-200/80">
                <span className="mr-3 text-red-300/50">-</span>
                <span>db.checkout.findUnique(id)</span>
              </div>
              <div className="flex rounded bg-emerald-400/[0.08] px-2 text-emerald-200/80">
                <span className="mr-3 text-emerald-300/50">+</span>
                <span>db.checkout.findUnique({"{ id, userId }"})</span>
              </div>
              <div className="flex gap-5">
                <span className="w-5 text-right text-white/20">44</span>
                <span className="text-white/55">return format(session)</span>
              </div>
              <div className="mt-6 flex gap-2 border-t border-white/10 pt-5 text-[10px] text-white/35">
                <GitBranch className="size-3.5" />
                12 files changed
                <span className="text-emerald-400">+84</span>
                <span className="text-red-400">-19</span>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.025] p-5 sm:p-7">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
                <Sparkles className="size-3.5" />
              </span>
              <div>
                <div className="text-xs font-medium">Chai review</div>
                <div className="text-[10px] text-white/35">Completed in 18s</div>
              </div>
              <CircleCheck className="ml-auto size-4 text-emerald-400" />
            </div>
            <div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.06] p-4">
              <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                <span className="size-1.5 rounded-full bg-amber-300" />
                Security · medium
              </div>
              <p className="text-[11px] leading-5 text-white/60">
                This lookup is not scoped to the current user. A signed-in
                user could access another customer&apos;s checkout session.
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-[10px] text-amber-200/70">
                <ArrowUpRight className="size-3" />
                View suggested fix
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-white/35">
              <Check className="size-3 text-emerald-400" />
              4 checks passed
              <span className="mx-1 text-white/15">•</span>
              context-aware
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WorkflowStep({
  number,
  icon: Icon,
  title,
  text,
}: {
  number: string;
  icon: typeof GitPullRequest;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      variants={reveal}
      className="group relative rounded-2xl border border-border bg-card p-6 transition-colors hover:border-emerald-500/40"
    >
      <div className="mb-10 flex items-center justify-between">
        <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Icon className="size-5" />
        </span>
        <span className="font-mono text-xs text-muted-foreground/60">{number}</span>
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
      <div className="mt-7 h-px w-0 bg-emerald-500 transition-all duration-500 group-hover:w-12" />
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.svg"
              alt="Chai"
              width={30}
              height={30}
              className="rounded-lg"
            />
            <span className="text-sm font-semibold tracking-tight">Chai</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#product" className="transition hover:text-foreground">Product</a>
            <a href="#workflow" className="transition hover:text-foreground">How it works</a>
            <a href="#security" className="transition hover:text-foreground">Security</a>
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <UserMenuWithSession variant="compact" />
            <Link
              href="/sign-in"
              className="flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-3 text-xs font-medium text-background transition hover:-translate-y-0.5 sm:px-4"
            >
              Get started
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative px-5 pb-24 pt-40 md:px-8 md:pb-32 md:pt-48">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] overflow-hidden">
          <div className="absolute left-1/2 top-[-240px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/[0.10] blur-[150px] dark:bg-emerald-500/[0.12]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.07)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black_15%,transparent_85%)]" />
        </div>

        <div className="mx-auto max-w-7xl text-center">
          <motion.div initial="hidden" animate="visible" variants={reveal}>
            <div className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
              AI code review, without the noise
              <ChevronRight className="size-3.5" />
            </div>
            <h1 className="mx-auto max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl md:text-8xl">
              Ship with confidence.
              <br />
              <span className="text-muted-foreground">Review at the speed of AI.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-muted-foreground md:text-lg">
              Chai understands your pull requests in context, catches the
              issues that matter, and gives your team more time to build.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/sign-in"
                className="group flex h-12 items-center gap-2 rounded-xl bg-foreground px-6 text-sm font-medium text-background shadow-lg shadow-foreground/10 transition hover:-translate-y-0.5"
              >
                Start reviewing for free
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="#product"
                className="flex h-12 items-center gap-2 rounded-xl border border-border bg-background/70 px-6 text-sm font-medium backdrop-blur transition hover:bg-muted"
              >
                <Play className="size-3.5 fill-current" />
                See how it works
              </a>
            </div>
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Check className="size-3.5 text-emerald-500" />
              No credit card required
              <span className="text-border">•</span>
              Connect GitHub in 60 seconds
            </div>
          </motion.div>

          <ProductPreview />
        </div>
      </section>

      <section className="border-y border-border/70 bg-muted/30 px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 md:flex-row">
          <p className="text-center text-xs font-medium text-muted-foreground md:text-left">
            Built for teams who care about what ships
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold tracking-tight text-muted-foreground/60">
            <span>acme</span>
            <span className="font-mono">northstar_</span>
            <span>◎ orbit</span>
            <span className="italic">vertex</span>
            <span>▲ altitude</span>
          </div>
        </div>
      </section>

      <section id="product" className="px-5 py-28 md:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <SectionKicker>One less bottleneck</SectionKicker>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.045em] md:text-6xl">
              Your best engineers
              <br />
              <span className="text-muted-foreground">shouldn&apos;t be a queue.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
              Chai gives every pull request a thoughtful first pass, so your
              team can spend review time on architecture, product, and the
              decisions that need human judgment.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={reveal}
                  transition={{ delay: index * 0.06 }}
                  className={`rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-emerald-500/35 ${feature.className}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground/60">0{index + 1}</span>
                  </div>
                  <div className="mt-12 max-w-lg">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                      {feature.eyebrow}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight">{feature.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">{feature.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="workflow" className="border-y border-border/70 bg-muted/25 px-5 py-28 md:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <SectionKicker>Simple by design</SectionKicker>
              <h2 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] md:text-6xl">
                From pull request
                <br />
                <span className="text-muted-foreground">to peace of mind.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              No dashboards to babysit. No new process to teach. Just better
              feedback, exactly where your team already works.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="mt-14 grid gap-4 md:grid-cols-3"
          >
            <WorkflowStep number="01" icon={GitPullRequest} title="Open a pull request" text="Connect GitHub once, then keep using the workflow your team already knows." />
            <WorkflowStep number="02" icon={Sparkles} title="Let Chai investigate" text="Chai reads the diff and the surrounding system to find meaningful risks." />
            <WorkflowStep number="03" icon={CircleCheck} title="Merge with confidence" text="Get clear, actionable feedback in seconds and ship without second-guessing." />
          </motion.div>
        </div>
      </section>

      <section id="security" className="px-5 py-28 md:px-8 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <SectionKicker>Made for real codebases</SectionKicker>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.045em] md:text-6xl">
              Context is the
              <br />
              <span className="text-muted-foreground">competitive edge.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
              A changed line is never just a changed line. Chai follows the
              relationships around it so findings arrive with the context your
              team needs to act.
            </p>
            <Link href="/sign-in" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              Explore Chai
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xl shadow-black/[0.03] md:p-8">
            <div className="absolute right-0 top-0 size-56 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="relative grid gap-3 sm:grid-cols-2">
              {[
                ["Pull request", "What changed?", GitPullRequest],
                ["Repository", "How does it work?", Code2],
                ["Dependencies", "What does it touch?", GitBranch],
                ["Review", "What needs attention?", ShieldCheck],
              ].map(([title, sub, Icon], index) => (
                <div key={title as string} className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="flex items-center justify-between">
                    <Icon className="size-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-mono text-[10px] text-muted-foreground/50">0{index + 1}</span>
                  </div>
                  <div className="mt-7 text-sm font-semibold">{title as string}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{sub as string}</div>
                </div>
              ))}
            </div>
            <div className="relative mt-3 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4">
              <Sparkles className="size-4 text-emerald-600 dark:text-emerald-400" />
              <div>
                <div className="text-xs font-semibold">A review that sees the whole picture</div>
                <div className="mt-1 text-[11px] text-muted-foreground">Relevant context, fewer false positives.</div>
              </div>
              <ArrowUpRight className="ml-auto size-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-8 md:pb-36">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#101413] px-6 py-16 text-center text-white sm:px-12">
          <div className="absolute left-1/2 top-0 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-[90px]" />
          <div className="relative">
            <GithubLogoIcon className="mx-auto mb-6 size-7 text-emerald-300" />
            <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Make every review count.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-white/55">
              Give your team a smarter first pass and more time for the work
              only they can do.
            </p>
            <Link href="/sign-in" className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#101413] transition hover:-translate-y-0.5">
              Connect GitHub
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/70 px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Chai" width={22} height={22} className="rounded-md" />
            <span className="font-semibold text-foreground">Chai</span>
            <span>· AI code review for thoughtful teams.</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/sign-in" className="transition hover:text-foreground">Sign in</Link>
            <a href="https://github.com" className="transition hover:text-foreground">GitHub</a>
            <span>© 2026 Chai</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
