import { Block, CollectionSlug } from 'payload'

export const createUploadBlock = (relationTo: CollectionSlug): Block => ({
  slug: 'upload-block',
  imageAltText: 'Upload Block',
  interfaceName: 'UploadBlock',
  fields: [
    {
      name: 'upload',
      type: 'upload',
      label: 'Upload',
      relationTo,
    },
  ],
})
