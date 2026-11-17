// Prefix internal paths with the configured base so links work both on a
// custom domain and on a GitHub project page.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const href = (path: string) => `${base}${path.startsWith('/') ? path : `/${path}`}`;
