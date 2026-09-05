import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "franz_work_experience" ALTER COLUMN "description" SET DATA TYPE jsonb USING "description"::jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "franz_work_experience" ALTER COLUMN "description" SET DATA TYPE varchar USING "description"::text;`)
}
