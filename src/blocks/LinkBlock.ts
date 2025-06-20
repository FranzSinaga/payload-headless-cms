import { Block } from 'payload'

export const LinkBlock: Block = {
  slug: 'link-block',
  imageAltText: 'Link Block',
  interfaceName: 'LinkBlock',
  fields: [
    {
      type: 'text',
      label: 'Text',
      name: 'text',
      required: true,
    },
    {
      type: 'textarea',
      label: 'URL',
      name: 'url',
      required: true,
    },
  ],
}
