import type { CollectionConfig } from 'payload'
import { TextFieldBlock } from '@/blocks/TextFieldBlock'

export const WorkExperience: CollectionConfig = {
  slug: 'etta-work-experience',
  labels: {
    plural: 'Work Experiences',
    singular: 'Work Experience',
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
    },
    {
      name: 'position',
      label: 'Position',
      type: 'text',
      required: true,
    },
    {
      name: 'organization',
      label: 'Organization',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      defaultValue: '',
      // required: true,
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',
      required: true,
    },
    {
      type: 'blocks',
      blocks: [TextFieldBlock],
      name: 'responsibilities',
      label: false,
      labels: {
        singular: 'Responsibility',
        plural: 'Responsibilities',
      },
      minRows: 1,
    },
  ],
  admin: {
    useAsTitle: 'organization',
    pagination: {
      defaultLimit: 10,
      limits: [10, 20, 50],
    },
    defaultColumns: [
      'position',
      'image',
      'organization',
      'active',
      'startDate',
      'endDate',
      'filename',
    ],
    group: 'Margaretta Collections',
  },
}
