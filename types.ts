export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown string for demo
  date: string;
  readTime: string;
  imageUrl: string;
  category: string;
  tags: string[];
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}
