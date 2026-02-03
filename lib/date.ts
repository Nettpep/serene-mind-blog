import type { Locale } from '@/i18n-config'
import { i18n } from '@/i18n-config'

/**
 * Format date from ISO string (2023-10-12) to locale-aware format
 * - Thai: 12 ต.ค. 2023
 * - English: Oct 12, 2023
 */
export function formatDate(isoDate: string, locale: Locale = i18n.defaultLocale): string {
  const date = new Date(isoDate)
  
  if (isNaN(date.getTime())) {
    return isoDate // Return original if invalid
  }
  
  const day = date.getDate()
  const year = date.getFullYear()
  
  if (locale === 'en') {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    const month = monthNames[date.getMonth()]
    return `${month} ${day}, ${year}`
  }
  
  // Thai format (default)
  const monthNames = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
  ]
  const month = monthNames[date.getMonth()]
  return `${day} ${month} ${year}`
}

/**
 * @deprecated Use formatDate instead
 */
export function formatThaiDate(isoDate: string): string {
  return formatDate(isoDate, 'th')
}
