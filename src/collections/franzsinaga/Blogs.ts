import { CodeBlock } from '@/blocks/CodeBlock'
import { createUploadBlock } from '@/blocks/UploadBlock'
import { richTextDefaultProps } from '@/lib/richtext-default'
import { BlocksFeature, lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Blogs: CollectionConfig = {
  slug: 'franz-blogs',
  labels: {
    plural: 'Blogs',
    singular: 'Blog',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: () => [
          ...richTextDefaultProps,
          BlocksFeature({
            blocks: [CodeBlock, createUploadBlock('franz-media')],
            inlineBlocks: [],
          }),
        ],
      }),
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.title) {
          data.slug = slugify(data.title, { lower: true })
        }
        return data
      },
    ],
  },
  admin: {
    useAsTitle: 'title',
    hideAPIURL: true,
    pagination: {
      defaultLimit: 10,
      limits: [10, 20, 50],
    },
    defaultColumns: ['title', 'excerpt', 'isPublished'],
    group: 'Franz Collections',
  },
}
