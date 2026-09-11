// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collection
import { Users } from './collections/users'
import { Media } from './collections/media'

// Franz Collections
import { Blogs as FranzSinagaBlogs } from './collections/franzsinaga/blogs'
import { FranzMedia } from './collections/franzsinaga/media'
import { WorkExperience as FranzWorkExperience } from './collections/franzsinaga/work-experience'

// Margaretta Colections
import { MargarettaMedia } from './collections/margaretta/media'
import { WorkExperience as EthaWorkExperience } from './collections/margaretta/work-experience'
import { Course as EthaCourse } from './collections/margaretta/course'
import { Projects as EthaProjects } from './collections/margaretta/projects'
import { Exploration as EthaExploration } from './collections/margaretta/exploration'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    avatar: 'default',
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeLogin: [{ path: 'src/components/BeforeLogin/index.tsx#BeforeLogin' }],
      afterLogin: [{ path: 'src/components/PasswordToggle/index.tsx#PasswordToggle' }],
      beforeNavLinks: [{ path: 'src/components/NavHome/index.tsx#NavHome' }],
      logout: {
        Button: { path: 'src/components/LogoutButton/index.tsx#LogoutButton' },
      },
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
    // Schema changes go through src/migrations only. Without this, dev runs a
    // drizzle push on boot — and DATABASE_URI points at a remote database, so
    // that push would alter it, bypassing the migration files entirely.
    push: false,
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  // storage-adapter-placeholder
  cors: '*',
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  },
})
