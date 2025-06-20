import type { CollectionConfig } from 'payload'

export const MargarettaMedia: CollectionConfig = {
  slug: 'etta-media',
  labels: {
    singular: 'Margaretta Media',
    plural: 'Margaretta Media',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  admin: {
    group: 'Margaretta Collections',
  },
  upload: {
    mimeTypes: ['image/*'],
    staticDir: './media/etta-media',
  },
}
