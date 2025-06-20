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
import { Blogs as FranzSinagaBlogs } from './collections/franzsinaga/Blogs'

// Margaretta Colection
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
    // Margaretta
    MargarettaMedia,
    EthaWorkExperience,
    EthaProjects,
    EthaCourse,
    EthaExploration,
    // franzsinaga.com
    FranzSinagaBlogs,
  ],
  editor: lexicalEditor({
    features: () => [
      // ...defaultFeatures,
      FixedToolbarFeature(),
      BlocksFeature({
        blocks: [CodeBlock],
        inlineBlocks: [],
      }),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      ParagraphFeature(),
      HeadingFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
      LinkFeature(),
      BlockquoteFeature(),
      UploadFeature(),
      HorizontalRuleFeature(),
      InlineCodeFeature(),
    ],
  }),
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
