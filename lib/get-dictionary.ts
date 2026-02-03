import 'server-only'
import type { Locale } from '@/i18n-config'
import { i18n } from '@/i18n-config'

const dictionaries = {
  th: () => import('./dictionaries/th.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries[i18n.defaultLocale]()
