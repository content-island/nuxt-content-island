import type { Media } from '@content-island/api-client';

export interface Post {
  id: string;
  language: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  summary: string;
  image: Media;
  content: string;
}

export interface About {
  id: string;
  language: string;
  picture: Media;
  fullname: string;
  shortBio: string;
  extendedBio: string;
}
