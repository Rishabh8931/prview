"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  GitPullRequest,
  GitMerge,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import {GithubLogoIcon} from "@phosphor-icons/react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { ModeToggle } from "@/components/ui/theme-toggle";
import { UserMenuWithSession } from "@/features/auth/components/user-menu";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const floatingCode = [
  {
    code: "+ const user = await getUser();",
    className: "left-[4%] top-[28%]",
    delay: 0,
  },
  {
    code: "- await db.users.findUnique(...)",
    className: "right-[3%] top-[22%]",
    delay: 1.2,
  },
  {
    code: "⚡ potential N+1 query",
    className: "right-[8%] bottom-[24%]",
    delay: 0.7,
  },
  {
    code: "✓ auth middleware",
    className: "left-[8%] bottom-[20%]",
    delay: 1.8,
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
      <span className="h-px w-8 bg-primary" />
      {children}
    </div>
  );
}

function FloatingCode() {
  return (
    <>
      {floatingCode.map((item) => (
        <motion.div
          key={item.code}
          className={`pointer-events-none absolute hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] text-white/45 backdrop-blur-md lg:block ${item.className}`}
          animate={{
            y: [0, -10, 0],
            opacity: [0.45, 0.8, 0.45],
          }}
          transition={{
            duration: 5,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.code}
        </motion.div>
      ))}
    </>
  );
}

function HeroSystem() {
  return (
    <div className="relative mx-auto mt-20 h-[440px] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#080909] shadow-2xl shadow-black/40">
      {/* Ambient light */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.7, 0.35],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <FloatingCode />

      {/* Orbit */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute -left-2 top-1/2 h-4 w-4 rounded-full border border-emerald-400/50 bg-emerald-400/20 shadow-[0_0_25px_rgba(52,211,153,0.5)]" />
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
        animate={{ rotate: -360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute -right-1 top-1/2 h-3 w-3 rounded-full bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.8)]" />
      </motion.div>

      {/* Center AI node */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-20 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-white/15 bg-white/[0.07] shadow-[0_0_80px_rgba(16,185,129,0.12)] backdrop-blur-xl"
        animate={{
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-3 rounded-2xl border border-emerald-400/10" />

        <div className="relative flex flex-col items-center gap-2">
          <Sparkles className="size-7 text-emerald-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
            CHAI AI
          </span>
        </div>
      </motion.div>

      {/* PR node */}
      <motion.div
        className="absolute left-[13%] top-1/2 z-10 -translate-y-1/2"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease }}
      >
        <SystemNode
          icon={<GitPullRequest className="size-4" />}
          label="Pull Request"
          sub="42 files changed"
        />
      </motion.div>

      {/* Review node */}
      <motion.div
        className="absolute right-[13%] top-1/2 z-10 -translate-y-1/2"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease }}
      >
        <SystemNode
          icon={<ShieldCheck className="size-4" />}
          label="Review ready"
          sub="3 findings"
        />
      </motion.div>

      {/* Connections */}
      <motion.div
        className="absolute left-[29%] top-1/2 h-px w-[20%] origin-left bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
      />

      <motion.div
        className="absolute right-[29%] top-1/2 h-px w-[20%] origin-right bg-gradient-to-l from-transparent via-sky-400/60 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
      />

      {/* Bottom status */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
        <div className="flex items-center gap-2 font-mono text-[10px] text-white/35">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          analyzing repository context
        </div>

        <div className="font-mono text-[10px] text-white/25">chai/reviewer</div>
      </div>
    </div>
  );
}

function SystemNode({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <div className="w-36 rounded-2xl border border-white/10 bg-white/[0.045] p-3 backdrop-blur-xl">
      <div className="mb-3 flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-white/70">
        {icon}
      </div>

      <div className="text-xs font-medium text-white/80">{label}</div>

      <div className="mt-1 font-mono text-[9px] text-white/35">{sub}</div>
    </div>
  );
}

function ReviewPanel() {
  const lines = [
    {
      number: "18",
      code: "const users = await db.user.findMany({",
      type: "normal",
    },
    {
      number: "19",
      code: "  include: { posts: true },",
      type: "warning",
    },
    {
      number: "20",
      code: "});",
      type: "normal",
    },
    {
      number: "21",
      code: "",
      type: "normal",
    },
    {
      number: "22",
      code: "return users.map(formatUser);",
      type: "normal",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-2xl">
      <div className="flex h-12 items-center justify-between border-b border-border/60 px-5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-red-400/70" />
          <span className="size-2 rounded-full bg-yellow-400/70" />
          <span className="size-2 rounded-full bg-green-400/70" />
        </div>

        <div className="font-mono text-[10px] text-muted-foreground">
          users.ts
        </div>

        <div className="w-10" />
      </div>

      <div className="grid min-h-[330px] md:grid-cols-[1fr_260px]">
        <div className="bg-zinc-950 p-6 font-mono text-[11px] leading-7 text-zinc-400">
          {lines.map((line, index) => (
            <motion.div
              key={line.number}
              className={`flex ${
                line.type === "warning" ? "bg-amber-400/[0.08]" : ""
              }`}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
                duration: 0.45,
              }}
            >
              <span className="mr-6 w-5 select-none text-right text-zinc-700">
                {line.number}
              </span>

              <span
                className={
                  line.type === "warning"
                    ? "text-amber-200/80"
                    : "text-zinc-400"
                }
              >
                {line.code}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="border-t border-border/60 bg-background p-5 md:border-l md:border-t-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="mb-5 flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <span className="text-xs font-semibold">AI review</span>
          </div>

          <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-4">
            <div className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-amber-500">
              <Zap className="size-3" />
              performance
            </div>

            <p className="text-xs leading-5 text-muted-foreground">
              This relation may load posts for every user. Consider selecting
              only the fields needed by this response.
            </p>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground">
            <Check className="size-3 text-primary" />
            context-aware finding
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ContextGraph() {
  const nodes = [
    {
      icon: GitPullRequest,
      title: "Pull request",
      sub: "What changed?",
      position: "left-0 top-[10%]",
    },
    {
      icon: Code2,
      title: "Repository",
      sub: "How does it work?",
      position: "left-[5%] bottom-[8%]",
    },
    {
      icon: Terminal,
      title: "Code",
      sub: "What does it affect?",
      position: "right-[4%] top-[8%]",
    },
    {
      icon: ShieldCheck,
      title: "Review",
      sub: "What needs attention?",
      position: "right-0 bottom-[10%]",
    },
  ];

  return (
    <div className="relative mx-auto h-[430px] max-w-3xl">
      <div className="absolute left-1/2 top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 bg-primary/[0.04] p-3">
        <div className="flex h-full w-full items-center justify-center rounded-full border border-primary/20 bg-background shadow-[0_0_100px_rgba(16,185,129,0.1)]">
          <div className="text-center">
            <Sparkles className="mx-auto mb-2 size-5 text-primary" />
            <div className="font-mono text-[10px] uppercase tracking-[0.2em]">
              context
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground">engine</div>
          </div>
        </div>
      </div>

      {/* Connecting lines */}
      <div className="absolute left-[18%] top-[30%] h-px w-[27%] rotate-[20deg] bg-gradient-to-r from-border to-primary/30" />
      <div className="absolute bottom-[30%] left-[20%] h-px w-[26%] -rotate-[20deg] bg-gradient-to-r from-border to-primary/30" />
      <div className="absolute right-[18%] top-[30%] h-px w-[27%] -rotate-[20deg] bg-gradient-to-l from-border to-primary/30" />
      <div className="absolute bottom-[30%] right-[20%] h-px w-[26%] rotate-[20deg] bg-gradient-to-l from-border to-primary/30" />

      {nodes.map((node, index) => {
        const Icon = node.icon;

        return (
          <motion.div
            key={node.title}
            className={`absolute ${node.position} w-40 rounded-2xl border border-border bg-background/80 p-4 backdrop-blur-xl`}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.12,
              ease,
            }}
            whileHover={{ y: -4 }}
          >
            <Icon className="mb-4 size-4 text-primary" />
            <div className="text-xs font-medium">{node.title}</div>
            <div className="mt-1 text-[10px] text-muted-foreground">
              {node.sub}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Home() {
  const reviewRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: reviewRef,
    offset: ["start end", "end start"],
  });

  const reviewY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const reviewRotate = useTransform(scrollYProgress, [0, 1], [2, -2]);

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      {/* NAV */}
      <nav className="fixed left-1/2 top-0 z-50 flex h-16 w-full max-w-7xl -translate-x-1/2 items-center justify-between px-5 md:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-background/70 backdrop-blur-xl" />

        <Link href="/" className="relative z-10 flex items-center gap-2">
          {/* TODO: change this to your actual logo image path */}
          <Image
            src="/logo.png"
            alt="Chai AI Code Reviewer"
            width={32}
            height={32}
            className="rounded-lg"
          />

          <span className="font-semibold tracking-tight">Chai</span>
        </Link>

        <div className="relative z-10 hidden items-center gap-8 text-xs text-muted-foreground md:flex">
          <a href="#how" className="transition-colors hover:text-foreground">
            How it works
          </a>
          <a href="#review" className="transition-colors hover:text-foreground">
            Reviews
          </a>
          <a
            href="#context"
            className="transition-colors hover:text-foreground"
          >
            Context
          </a>
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <ModeToggle />
          <UserMenuWithSession variant="compact" />

          <Link
            href="/sign-in"
            className="hidden rounded-full border border-border bg-background px-4 py-2 text-xs font-medium transition hover:bg-muted sm:block"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center px-5 pb-20 pt-32 md:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.035] blur-[140px]" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(120,120,120,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(120,120,120,0.055)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        </div>

        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur"
            >
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              AI code review for serious developers
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl md:text-8xl"
            >
              Code review that
              <br />
              <span className="text-muted-foreground">
                actually understands
              </span>
              <br />
              your code.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-8 max-w-2xl text-pretty text-sm leading-6 text-muted-foreground md:text-base"
            >
              Chai reads the change, follows the surrounding code, understands
              the context, and surfaces the issues worth looking at — before
              they become someone else&apos;s problem.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link
                href="/sign-in"
                className="group flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-xs font-medium text-background transition hover:-translate-y-0.5"
              >
                Review your first PR
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <a
                href="#how"
                className="flex h-11 items-center gap-2 rounded-full border border-border bg-background/70 px-6 text-xs font-medium backdrop-blur transition hover:bg-muted"
              >
                See how it works
                <ChevronDown className="size-3.5" />
              </a>
            </motion.div>
          </motion.div>

          <HeroSystem />
        </div>
      </section>

      {/* TRANSITION */}
      <section
        id="how"
        className="border-y border-border/60 px-5 py-28 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <SectionLabel>The idea</SectionLabel>

          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <motion.h2
              className="max-w-4xl text-4xl font-medium leading-[1.05] tracking-[-0.04em] md:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              Most reviews look at the diff.
              <br />
              <span className="text-muted-foreground">
                Chai looks at the system.
              </span>
            </motion.h2>

            <motion.p
              className="max-w-md text-sm leading-6 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
            >
              A changed line rarely exists in isolation. Good review requires
              understanding what that line touches, what assumptions surround
              it, and what could break downstream.
            </motion.p>
          </div>
        </div>
      </section>

      {/* REVIEW */}
      <section
        id="review"
        ref={reviewRef}
        className="relative px-5 py-32 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-[0.7fr_1.3fr] md:items-center">
            <div>
              <SectionLabel>Inside the review</SectionLabel>

              <motion.h2
                className="text-4xl font-medium leading-[1.05] tracking-[-0.04em] md:text-5xl"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease }}
              >
                Findings with
                <br />
                <span className="text-muted-foreground">
                  a reason behind them.
                </span>
              </motion.h2>

              <motion.p
                className="mt-6 max-w-md text-sm leading-6 text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
              >
                No walls of generic AI comments. Chai is designed to turn a
                finding into something actionable: what is wrong, why it
                matters, and where the problem comes from.
              </motion.p>

              <div className="mt-8 space-y-3">
                {[
                  "Explain the actual risk",
                  "Point to the relevant code",
                  "Suggest a practical direction",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3 text-xs"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                  >
                    <span className="flex size-5 items-center justify-center rounded-full border border-primary/20 bg-primary/[0.06]">
                      <Check className="size-3 text-primary" />
                    </span>
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              style={{
                y: reviewY,
                rotate: reviewRotate,
              }}
            >
              <ReviewPanel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section
        id="context"
        className="overflow-hidden border-y border-border/60 px-5 py-32 md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Context engine</SectionLabel>

            <motion.h2
              className="text-4xl font-medium tracking-[-0.04em] md:text-6xl"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              The diff is only
              <br />
              <span className="text-muted-foreground">the beginning.</span>
            </motion.h2>

            <motion.p
              className="mx-auto mt-6 max-w-xl text-sm leading-6 text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              The interesting part of code review is understanding
              relationships. Chai&apos;s review experience is built around that
              idea.
            </motion.p>
          </div>

          <ContextGraph />
        </div>
      </section>

      {/* DEVELOPER FLOW */}
      <section className="px-5 py-32 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Built around your workflow</SectionLabel>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
            {[
              {
                icon: GitPullRequest,
                number: "01",
                title: "Open a PR",
                text: "Keep your normal GitHub workflow. Chai enters when there is something new to review.",
              },
              {
                icon: Sparkles,
                number: "02",
                title: "Let Chai think",
                text: "The reviewer traces the change through the surrounding code and looks for meaningful issues.",
              },
              {
                icon: GitMerge,
                number: "03",
                title: "Ship with context",
                text: "Review findings where they belong — alongside the code your team is already discussing.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.number}
                  className="group relative bg-background p-8 md:p-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease,
                  }}
                  whileHover={{ backgroundColor: "rgba(120,120,120,0.04)" }}
                >
                  <div className="mb-16 flex items-center justify-between">
                    <Icon className="size-5 text-muted-foreground transition-colors group-hover:text-primary" />

                    <span className="font-mono text-[10px] text-muted-foreground">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium">{item.title}</h3>

                  <p className="mt-3 text-xs leading-6 text-muted-foreground">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative px-5 py-36 md:px-8">
        <div className="absolute inset-0 -z-10 bg-primary/[0.025]" />

        <motion.div
          className="mx-auto max-w-5xl text-center"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="mx-auto mb-8 flex size-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/[0.05]">
            <Sparkles className="size-5 text-primary" />
          </div>

          <h2 className="text-4xl font-medium leading-[1.05] tracking-[-0.05em] md:text-7xl">
            Your reviewers should spend
            <br />
            <span className="text-muted-foreground">
              less time finding problems
            </span>
            <br />
            and more time solving them.
          </h2>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-8 md:px-8">
        <motion.div
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border bg-zinc-950 px-6 py-20 text-white md:px-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <motion.div
            className="absolute -right-32 -top-32 size-96 rounded-full bg-emerald-500/10 blur-[100px]"
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative max-w-2xl">
            <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
              chai / code reviewer
            </div>

            <h2 className="text-4xl font-medium tracking-[-0.04em] md:text-6xl">
              Let&apos;s review
              <br />
              something real.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-6 text-white/45">
              Connect your GitHub workflow and see what an AI reviewer can find
              in your next pull request.
            </p>

            <Link
              href="/sign-in"
              className="group mt-9 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-xs font-medium text-black transition hover:-translate-y-0.5"
            >
              Get started with Chai
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-8 text-[10px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div className="flex items-center gap-2">
          {/* TODO: use the same actual logo path here */}
          <Image
            src="/logo.png"
            alt=""
            width={20}
            height={20}
            className="rounded"
          />

          <span>Chai AI Code Reviewer</span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <GithubLogoIcon className="size-3" />
            GitHub
          </a>

          <span>Built for developers.</span>
        </div>
      </footer>
    </main>
  );
}
