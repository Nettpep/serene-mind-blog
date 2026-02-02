/**
 * Site-wide feature flags and config.
 * Change via environment variables or edit here for quick toggle.
 */

/** เมื่อ true = แสดงโฆษณา/สินค้าแนะนำ, false = ซ่อน (เปิดเมื่อพร้อม) */
export const SHOW_PRODUCT_ADS =
  process.env.NEXT_PUBLIC_SHOW_PRODUCT_ADS === 'true'
