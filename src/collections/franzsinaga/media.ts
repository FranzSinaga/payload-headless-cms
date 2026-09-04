import type { CollectionConfig } from 'payload'

export const FranzMedia: CollectionConfig = {
  slug: 'franz-media',
  labels: {
    singular: 'Franz Media',
    plural: 'Franz Media',
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
    group: 'Franz Collections',
  },
  upload: {
    mimeTypes: ['image/*'],
    staticDir: './media/franz-media',
  },
}
