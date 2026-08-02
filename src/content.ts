import { z } from 'zod'

const SITE_URL = 'https://TODO-set-after-phase-5-deploy.vercel.app'

const layerSchema = z.enum(['client', 'server', 'platform'])

const chipSchema = z.object({
  label: z.string().min(1),
  layer: layerSchema,
})

const siteSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bioLine: z.string().min(1),
  location: z.string().min(1),
  availability: z.string().min(1),
  email: z.email(),
  github: z.url(),
  linkedin: z.url(),
  siteUrl: z.url(),
})

const heroSchema = z.object({
  headline: z.string().min(1),
  lede: z.string().min(1),
  motifNodes: z.tuple([z.string().min(1), z.string().min(1), z.string().min(1)]),
})

const navItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().startsWith('#'),
})

const workSchema = z
  .object({
    name: z.string().min(1),
    url: z.url().optional(),
    status: z.enum(['live', 'delivered']),
    summary: z.string().min(1),
    stack: z.array(chipSchema).min(1),
  })
  .refine((work) => work.url !== undefined || work.status === 'delivered', {
    message: 'work without a url must be marked delivered, not live',
    path: ['url'],
  })

const stackGroupSchema = z.object({
  layer: layerSchema,
  label: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
})

const experienceProjectSchema = z.object({
  name: z.string().min(1),
  start: z.string().min(1),
  end: z.string().min(1),
  summary: z.string().min(1),
})

const experienceSchema = z.object({
  kind: z.enum(['work', 'education']),
  start: z.string().min(1),
  end: z.string().min(1),
  org: z.string().min(1),
  role: z.string().min(1),
  arrangement: z.string().optional(),
  detail: z.string().optional(),
  projects: z.array(experienceProjectSchema).optional(),
})

const seoSchema = z.object({
  title: z.string().min(1).max(65),
  description: z.string().min(1).max(160),
  canonical: z.url(),
  ogImage: z.url(),
  ogImageAlt: z.string().min(1),
  twitterCard: z.literal('summary_large_image'),
})

const contentSchema = z.object({
  site: siteSchema,
  hero: heroSchema,
  nav: z.array(navItemSchema).min(1),
  work: z.array(workSchema).min(1),
  stack: z.array(stackGroupSchema).min(1),
  experience: z.array(experienceSchema).min(1),
  seo: seoSchema,
})

export type Content = z.infer<typeof contentSchema>
export type Layer = z.infer<typeof layerSchema>
export type Chip = z.infer<typeof chipSchema>
export type Work = Content['work'][number]
export type Experience = Content['experience'][number]

export const content = contentSchema.parse({
  site: {
    name: 'Edmel John Linaugo',
    role: 'Full Stack Software Engineer',
    bioLine: 'A bit chaotic when coding.',
    location: 'Iloilo City, Philippines',
    availability: 'Remote-first, open to overseas',
    email: 'elinaugo137@gmail.com',
    github: 'https://github.com/EdmelKun',
    linkedin: 'https://www.linkedin.com/in/edmel-john-linaugo',
    siteUrl: SITE_URL,
  },

  hero: {
    headline: 'Edmel John Linaugo',
    lede: 'Full stack in TypeScript across the PERN stack, React Native for mobile. Ships AI-powered features into production — LLMs wired into workflows real people use, not demos.',
    motifNodes: ['client', 'api', 'data'],
  },

  nav: [
    { label: 'work', href: '#work' },
    { label: 'stack', href: '#stack' },
    { label: 'experience', href: '#experience' },
    { label: 'contact', href: '#contact' },
  ],

  work: [
    {
      name: 'Ryze Health',
      url: 'https://www.ryzehealth.com/',
      status: 'live',
      summary:
        'One portal for independent physicians: insurance, specialty-medication marketplace, provider network, telehealth. Clinical decision support backed by LLMs on Amazon Bedrock. Built with a US-based team, working async across timezones.',
      stack: [
        { label: 'TypeScript', layer: 'platform' },
        { label: 'React', layer: 'client' },
        { label: 'Node.js', layer: 'server' },
        { label: 'Express', layer: 'server' },
        { label: 'PostgreSQL', layer: 'server' },
        { label: 'Amazon Bedrock', layer: 'server' },
        { label: 'AWS', layer: 'platform' },
        { label: 'Docker', layer: 'platform' },
      ],
    },
    {
      name: 'BHD CVMap',
      url: 'https://bostonheartdiagnostics.com/cvmap/',
      status: 'live',
      summary:
        'Cross-platform app for Boston Heart Diagnostics: physicians upload diagnostic results, patients monitor their health metrics over time on mobile and get personalized insights. Maintenance on a live clinical system — changes ship without downtime.',
      stack: [
        { label: 'TypeScript', layer: 'platform' },
        { label: 'React', layer: 'client' },
        { label: 'React Native', layer: 'client' },
        { label: 'Nest.js', layer: 'server' },
        { label: 'PostgreSQL', layer: 'server' },
        { label: 'AWS', layer: 'platform' },
      ],
    },
    {
      name: 'Seahorse Inventory System',
      status: 'delivered',
      summary:
        'Inventory management built end to end for a retail client. Offline-capable client, typed API, tested data layer. I was both the developer and the tester on it.',
      stack: [
        { label: 'TypeScript', layer: 'platform' },
        { label: 'React', layer: 'client' },
        { label: 'RxDB', layer: 'client' },
        { label: 'Express', layer: 'server' },
        { label: 'Prisma', layer: 'server' },
        { label: 'PostgreSQL', layer: 'server' },
        { label: 'Vite', layer: 'platform' },
        { label: 'Jest', layer: 'platform' },
      ],
    },
  ],

  stack: [
    {
      layer: 'client',
      label: 'client',
      items: ['React', 'React Native', 'Tailwind CSS', 'RxDB'],
    },
    {
      layer: 'server',
      label: 'server',
      items: [
        'Node.js',
        'Express',
        'Nest.js',
        'PostgreSQL',
        'Prisma',
        'Amazon Bedrock',
      ],
    },
    {
      layer: 'platform',
      label: 'platform',
      items: [
        'TypeScript',
        'Vite',
        'Docker',
        'AWS ECR',
        'AWS EC2',
        'AWS Fargate',
        'CI/CD',
        'Jest',
        'Mocha',
        'Cypress',
      ],
    },
  ],

  experience: [
    {
      kind: 'work',
      start: 'Oct 2024',
      end: 'Present',
      org: 'Spectrum One',
      role: 'Associate Software Engineer',
      arrangement: 'full-time, remote',
      projects: [
        {
          name: 'Ryze Health',
          start: 'Nov 2024',
          end: 'Present',
          summary:
            'Unified portal where physicians manage their practices, insurance, marketplace, provider network and telehealth.',
        },
        {
          name: 'BHD CVMap',
          start: 'Oct 2024',
          end: 'Nov 2024',
          summary:
            'Cross-platform app for monitoring health metrics over time, offering personalized insights and recommendations.',
        },
      ],
    },
    {
      kind: 'work',
      start: 'Aug 2024',
      end: 'Dec 2025',
      org: 'Central Philippine University',
      role: 'Instructor',
      arrangement: 'part-time, hybrid',
      detail: 'Fundamentals of Programming, Network Protocols',
    },
    {
      kind: 'work',
      start: 'Feb 2024',
      end: 'May 2024',
      org: 'Kingsland Innovation Centre',
      role: 'QA Intern',
      arrangement: 'remote',
      detail: 'ERTC Express — React, Feathers.js, TypeScript, MongoDB',
    },
    {
      kind: 'work',
      start: 'Dec 2022',
      end: 'Jun 2023',
      org: 'Seahorse Marketing',
      role: 'Full Stack Developer / Software Tester',
    },
    {
      kind: 'education',
      start: '2019',
      end: '2024',
      org: 'Central Philippine University',
      role: 'BS Software Engineering',
    },
  ],

  seo: {
    title: 'Edmel John Linaugo — Full Stack Software Engineer',
    description:
      'Full stack engineer in TypeScript across the PERN stack, React Native for mobile, shipping AI-powered features into production.',
    canonical: SITE_URL,
    ogImage: `${SITE_URL}/og.png`,
    ogImageAlt:
      'Edmel John Linaugo, Full Stack Software Engineer — a request travelling from client to API to data.',
    twitterCard: 'summary_large_image',
  },
})
