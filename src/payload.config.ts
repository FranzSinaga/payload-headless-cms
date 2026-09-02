// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import {
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'

import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collection
import { Users } from './collections/Users'
import { Media } from './collections/Media'

// Franz Collections
import { Blogs as FranzSinagaBlogs } from './collections/franzsinaga/Blogs'
import { FranzMedia } from './collections/franzsinaga/Media'
import { WorkExperience as FranzWorkExperience } from './collections/franzsinaga/WorkExperience'

// Margaretta Colections
import { MargarettaMedia } from './collections/margaretta/Media'
import { WorkExperience as EthaWorkExperience } from './collections/margaretta/WorkExperience'
import { Course as EthaCourse } from './collections/margaretta/Course'
import { Projects as EthaProjects } from './collections/margaretta/Projects'
import { Exploration as EthaExploration } from './collections/margaretta/Exploration'

import { CodeBlock } from './blocks/CodeBlock'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    avatar: 'gravatar',
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    // Global Collection
    Users,
    Media,
    // Margaretta Collections
    MargarettaMedia,
    EthaWorkExperience,
    EthaProjects,
    EthaCourse,
    EthaExploration,
    // Franz Collections
    FranzMedia,
    FranzSinagaBlogs,
    FranzWorkExperience,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  cors: '*',
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  },
})
