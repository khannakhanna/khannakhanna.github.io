// Single source for facts used across the site.
// Everything here comes from the LinkedIn profile export unless marked CONFIRM.

export const profile = {
  name: 'Gautam Khanna',
  initials: 'GK',
  role: 'Director of Product Management',
  employer: 'Visa',
  location: 'London',
  tagline: 'Real-time payments and money movement',
  description:
    'Gautam Khanna is a Director of Product Management at Visa, leading money movement and real-time payments products within Visa Direct. Engineer turned product leader, based in London.',

  headline: 'I build the products that move money in real time.',
  lede: 'I lead money movement and real-time payments products within Visa Direct: API-driven platforms that banks, fintechs and enterprise clients use to move funds securely, compliantly and at scale.',

  links: {
    linkedin: 'https://www.linkedin.com/in/gautam-khanna/',
  },

  // Set to an address you are happy to publish, or leave null to show LinkedIn only.
  email: null as string | null,
  // Optional booking link (Calendly, Cal.com, ...) for mentoring and advisory calls.
  bookingUrl: null as string | null,
  // Path under /public, e.g. '/headshot.jpg'. Null shows the monogram instead.
  headshot: '/headshot.jpeg' as string | null,

  facts: [
    { value: '11+ years', label: 'at Visa, from software engineer to product director' },
    { value: 'Engineer first', label: 'more than a decade as a software engineer before moving into product in 2022' },
    { value: 'Singapore and London', label: 'nine years in Singapore, in London since 2021' },
  ],

  focus: [
    {
      title: 'Real-time money movement',
      body: 'Product strategy and roadmaps for real-time and near-real-time payments, from the first use case to scale across regions.',
    },
    {
      title: 'Payments APIs and platforms',
      body: 'API and platform capabilities that many clients and use cases can build on, without a custom build for each one.',
    },
    {
      title: 'Client onboarding and integration',
      body: 'Making complex payment products easier to adopt: clearer onboarding, a better integration experience, faster time to live.',
    },
    {
      title: 'Applied AI in regulated payments',
      body: 'AI capabilities for clients and for product teams, balanced against risk, compliance and trust.',
    },
  ],

  speakingTopics: [
    'Real-time payments and the future of money movement',
    'Designing payments APIs and platforms that clients can adopt',
    'Applying AI responsibly in a regulated product',
    'Moving from engineering into product leadership',
  ],

  mentoring: {
    organisation: 'Digital Boost',
    organisationUrl: 'https://www.digitalboost.org.uk/',
    since: 2020,
  },

  education: {
    school: 'Punjab Technical University',
    degree: "Bachelor's degree, Information Technology",
    years: '2006 to 2010',
  },

  languages: ['English', 'Hindi', 'Punjabi'],

  certifications: [
    { name: 'Certified Product Manager', issuer: 'Product School', year: 2023 },
    { name: 'Blockchain Essentials', issuer: 'eCornell', year: 2021 },
    { name: 'Python for Data Analytics', issuer: 'Emeritus', year: 2021 },
    { name: 'Product Management', issuer: 'eCornell', year: 2020 },
    { name: 'Professional Scrum Product Owner I', issuer: 'Scrum.org', year: 2019 },
    { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: 2018 },
  ],
};
