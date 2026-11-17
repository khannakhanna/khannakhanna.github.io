import { getCollection } from 'astro:content';

// Drafts are visible while developing and excluded from production builds.
const visible = (entry: { data: { draft: boolean } }) => import.meta.env.DEV || !entry.data.draft;

// Each collection is read once per build and shared by every page that asks.
const once = <T>(load: () => Promise<T>) => {
  let result: Promise<T> | undefined;
  return () => (import.meta.env.DEV ? load() : (result ??= load()));
};

export const getCaseStudies = once(async () => {
  const entries = await getCollection('caseStudies', visible);
  return entries.sort((a, b) => a.data.order - b.data.order);
});

export const getSpeaking = once(async () => {
  const entries = await getCollection('speaking', visible);
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
});

export const getWriting = once(async () => {
  const entries = await getCollection('writing', visible);
  return entries.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
});

export const formatMonth = (date: Date) =>
  date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long' });

export const formatDay = (date: Date) =>
  date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
