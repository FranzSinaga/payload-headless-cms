import type { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Blogs: CollectionConfig = {
  slug: 'blogs-franzsinaga',
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
    group: 'Franz Sinaga Collections',
  },
}
