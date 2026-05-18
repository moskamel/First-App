import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export function parseMarkdown(filename: string): { data: Record<string, unknown>; content: string } {
  const filePath = path.join(contentDir, filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { data, content }
}

export function getHeroContent() {
  return parseMarkdown('hero.md').data
}

export function getFeaturesContent() {
  return parseMarkdown('features.md').data
}

export function getCategoriesContent() {
  return parseMarkdown('categories.md').data
}

export function getTestimonialsContent() {
  return parseMarkdown('testimonials.md').data
}

export function getFaqContent() {
  return parseMarkdown('faq.md').data
}

export function getStatsContent() {
  return parseMarkdown('stats.md').data
}

export function getFooterContent() {
  return parseMarkdown('footer.md').data
}
