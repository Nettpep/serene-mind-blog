import { TocItem } from '@/types'

/**
 * Extract table of contents from HTML content by finding headings with IDs
 */
export function extractTocFromHtml(html: string): TocItem[] {
  const tocItems: TocItem[] = []
  
  // Match headings with IDs: <h2 id="some-id">, <h3 id="another-id">, etc.
  const headingRegex = /<h([2-6])\s+id="([^"]+)"[^>]*>([^<]+)<\/h[2-6]>/gi
  let match
  
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10)
    const id = match[2]
    const text = match[3].trim()
    
    tocItems.push({
      id,
      text,
      level,
    })
  }
  
  return tocItems
}
