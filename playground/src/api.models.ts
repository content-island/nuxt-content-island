import type { Media } from '@content-island/api-client';

export interface Post {
  id: string;
  language: 'en';
  title: string;
  slug: string;
  date: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  author: string;
  summary: string;
  image: Media;
  content: string;
}

export interface About {
  id: string;
  language: 'en';
  picture: Media;
  fullname: string;
  shortBio: string;
  extendedBio: string;
}
