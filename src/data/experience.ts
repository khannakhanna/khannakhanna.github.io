// Career history from the LinkedIn profile export.
// `summary` is optional: the LinkedIn roles have no descriptions yet, so add
// one or two sentences per role here when you have them.

export interface Role {
  title: string;
  period: string;
  location?: string;
  summary?: string;
}

export interface Employer {
  company: string;
  roles: Role[];
}

export const experience: Employer[] = [
  {
    company: 'Visa',
    roles: [
      { title: 'Director, Product Management', period: '2024 to present', location: 'London' },
      { title: 'Senior Product Manager', period: '2022 to 2024', location: 'London' },
      { title: 'Lead Software Engineer', period: '2021 to 2022', location: 'London' },
      { title: 'Staff Software Engineer', period: '2017 to 2021', location: 'Singapore' },
      { title: 'Senior Software Engineer', period: '2016 to 2017', location: 'Singapore' },
      { title: 'Software Engineer', period: '2015 to 2016', location: 'Singapore' },
    ],
  },
  {
    company: 'NCS Group',
    roles: [{ title: 'Software Consultant', period: '2013 to 2015', location: 'Singapore' }],
  },
  {
    company: 'Cognizant Technology Solutions',
    roles: [{ title: 'Senior Technical Associate', period: '2012 to 2013', location: 'Singapore' }],
  },
  {
    company: 'Dell',
    roles: [
      {
        title: 'Application Developer',
        period: '2010 to 2012',
        summary: 'Worked on the Vocalink payment infrastructure project.',
      },
    ],
  },
];
