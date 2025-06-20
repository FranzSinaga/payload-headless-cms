import type { CollectionConfig } from 'payload'
import { LinkBlock } from '@/blocks/LinkBlock'

export const Course: CollectionConfig = {
  slug: 'etta-course',
  labels: {
    plural: 'Courses',
    singular: 'Course',
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
      name: 'courseName',
      type: 'text',
      label: 'Course Name',
      required: true,
    },
    {
      name: 'courseType',
      type: 'text',
      label: 'Jenis Course',
      required: true,
    },
    {
      name: 'periode',
      type: 'text',
      label: 'Periode',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'links',
      type: 'blocks',
      blocks: [LinkBlock],
      label: 'Links',
    },
  ],
  admin: {
    useAsTitle: 'courseName',
    pagination: {
      defaultLimit: 10,
      limits: [10, 20, 50],
    },
    defaultColumns: ['courseName', 'courseType', 'active', 'periode'],
    group: 'Margaretta Collections',
  },
}
