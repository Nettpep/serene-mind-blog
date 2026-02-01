/**
 * Format date from ISO string (2023-10-12) to Thai format (12 ต.ค. 2023)
 */
export function formatThaiDate(isoDate: string): string {
  const date = new Date(isoDate)
  
  if (isNaN(date.getTime())) {
    return isoDate // Return original if invalid
  }
  
  const day = date.getDate()
  const monthNames = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
  ]
  const month = monthNames[date.getMonth()]
  const year = date.getFullYear()
  
  return `${day} ${month} ${year}`
}
