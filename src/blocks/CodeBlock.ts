import { languages } from '@/lib/const'
import { Block } from 'payload'

export const CodeBlock: Block = {
  slug: 'code-block',
  imageAltText: 'Code block',
  interfaceName: 'CodeBlock',
  fields: [
    {
      type: 'select',
      label: 'Language',
      name: 'language',
      options: Object.entries(languages).map(([key, value]) => ({
        label: value,
        value: key,
      })),
      defaultValue: 'javascript',
    },
    {
      admin: {
        components: {
          Field: { path: 'src/components/CodeComponent.tsx#Code' },
        },
      },
      label: 'Code',
      name: 'code',
      type: 'code',
    },
  ],
}
