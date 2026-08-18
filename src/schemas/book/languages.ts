import * as z from 'zod'

const languages = ['DE', 'EN', 'RU'] as const
const language = z.enum(languages)
type Language = z.infer<typeof language>

export { language, languages, type Language }
