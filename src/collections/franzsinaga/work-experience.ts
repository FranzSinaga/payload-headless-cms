import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { richTextDefaultProps } from '@/lib/richtext-default'

export const WorkExperience: CollectionConfig = {
  slug: 'franz-work-experience',
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
      required: false,
    },
    {
      name: 'untilNow',
      label: 'Currently Working Here',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      editor: lexicalEditor({
        features: () => [...richTextDefaultProps],
      }),
    },
  ],
  admin: {
    useAsTitle: 'organization',
    pagination: {
      defaultLimit: 10,
      limits: [10, 20, 50],
    },
    defaultColumns: ['position', 'organization', 'active', 'startDate', 'endDate', 'untilNow'],
    group: 'Franz Collections',
  },
}
