import type { CollectionConfig } from 'payload'
import { LinkBlock } from '@/blocks/LinkBlock'

export const Exploration: CollectionConfig = {
  slug: 'etta-exploration',
  labels: {
    plural: 'Eksplorasi',
    singular: 'Eksplorasi',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'active',
      label: 'Active',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Thumbnail Image',
      relationTo: 'etta-media',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Exploration Name',
      required: true,
    },
    {
      name: 'appLink',
      type: 'text',
      label: 'App Link',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
    },
    {
      name: 'links',
      type: 'blocks',
      blocks: [LinkBlock],
      label: 'Links',
    },
  ],
  admin: {
    useAsTitle: 'name',
    pagination: {
      defaultLimit: 10,
      limits: [10, 20, 50],
    },
    defaultColumns: ['name', 'image', 'active', 'description'],
    group: 'Margaretta Collections',
  },
}
