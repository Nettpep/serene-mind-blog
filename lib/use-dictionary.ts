'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import type { Locale } from '@/i18n-config'

export function useDictionary() {
    const params = useParams()
    const lang = (params?.lang as Locale) || 'th'
    const [dict, setDict] = useState<any>(null)

    useEffect(() => {
        import(`./dictionaries/${lang}.json`)
            .then(module => setDict(module.default))
            .catch(() => import('./dictionaries/th.json').then(module => setDict(module.default)))
    }, [lang])

    return { dict, lang }
}
