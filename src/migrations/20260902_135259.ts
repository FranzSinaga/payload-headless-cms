import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_etta_projects_tags" AS ENUM('Taiga', 'Postman', 'MySQL', 'Google Sheet', 'TEMAN', 'Jira', 'Confluence', 'Swagger', 'DBeaver', 'Spreadsheet', 'Microsoft Office');
  CREATE TYPE "public"."enum_etta_projects_project_type" AS ENUM('Website', 'Mobile');
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "etta_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "etta_work_experience_blocks_text_field_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text_field" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "etta_work_experience" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"active" boolean DEFAULT false,
  	"image_id" integer,
  	"position" varchar NOT NULL,
  	"organization" varchar NOT NULL,
  	"location" varchar DEFAULT '',
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "etta_projects_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_etta_projects_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "etta_projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"active" boolean DEFAULT false,
  	"image_id" integer,
  	"project_name" varchar NOT NULL,
  	"project_type" "enum_etta_projects_project_type" NOT NULL,
  	"role" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"detail" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "etta_course_blocks_link_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "etta_course" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"active" boolean DEFAULT false,
  	"image_id" integer NOT NULL,
  	"course_name" varchar NOT NULL,
  	"course_type" varchar NOT NULL,
  	"periode" varchar,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "etta_exploration_blocks_link_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "etta_exploration" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"active" boolean DEFAULT false,
  	"image_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"app_link" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "franz_media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "franz_blogs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"is_published" boolean DEFAULT false,
  	"title" varchar NOT NULL,
  	"excerpt" varchar,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "franz_work_experience" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"active" boolean DEFAULT false,
  	"position" varchar NOT NULL,
  	"organization" varchar NOT NULL,
  	"location" varchar DEFAULT '',
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"until_now" boolean DEFAULT false,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"etta_media_id" integer,
  	"etta_work_experience_id" integer,
  	"etta_projects_id" integer,
  	"etta_course_id" integer,
  	"etta_exploration_id" integer,
  	"franz_media_id" integer,
  	"franz_blogs_id" integer,
  	"franz_work_experience_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "etta_work_experience_blocks_text_field_block" ADD CONSTRAINT "etta_work_experience_blocks_text_field_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."etta_work_experience"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "etta_work_experience" ADD CONSTRAINT "etta_work_experience_image_id_etta_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."etta_media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "etta_projects_tags" ADD CONSTRAINT "etta_projects_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."etta_projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "etta_projects" ADD CONSTRAINT "etta_projects_image_id_etta_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."etta_media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "etta_course_blocks_link_block" ADD CONSTRAINT "etta_course_blocks_link_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."etta_course"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "etta_course" ADD CONSTRAINT "etta_course_image_id_etta_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."etta_media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "etta_exploration_blocks_link_block" ADD CONSTRAINT "etta_exploration_blocks_link_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."etta_exploration"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "etta_exploration" ADD CONSTRAINT "etta_exploration_image_id_etta_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."etta_media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_etta_media_fk" FOREIGN KEY ("etta_media_id") REFERENCES "public"."etta_media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_etta_work_experience_fk" FOREIGN KEY ("etta_work_experience_id") REFERENCES "public"."etta_work_experience"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_etta_projects_fk" FOREIGN KEY ("etta_projects_id") REFERENCES "public"."etta_projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_etta_course_fk" FOREIGN KEY ("etta_course_id") REFERENCES "public"."etta_course"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_etta_exploration_fk" FOREIGN KEY ("etta_exploration_id") REFERENCES "public"."etta_exploration"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_franz_media_fk" FOREIGN KEY ("franz_media_id") REFERENCES "public"."franz_media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_franz_blogs_fk" FOREIGN KEY ("franz_blogs_id") REFERENCES "public"."franz_blogs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_franz_work_experience_fk" FOREIGN KEY ("franz_work_experience_id") REFERENCES "public"."franz_work_experience"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "etta_media_updated_at_idx" ON "etta_media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "etta_media_created_at_idx" ON "etta_media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "etta_media_filename_idx" ON "etta_media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "etta_work_experience_blocks_text_field_block_order_idx" ON "etta_work_experience_blocks_text_field_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "etta_work_experience_blocks_text_field_block_parent_id_idx" ON "etta_work_experience_blocks_text_field_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "etta_work_experience_blocks_text_field_block_path_idx" ON "etta_work_experience_blocks_text_field_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "etta_work_experience_image_idx" ON "etta_work_experience" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "etta_work_experience_updated_at_idx" ON "etta_work_experience" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "etta_work_experience_created_at_idx" ON "etta_work_experience" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "etta_projects_tags_order_idx" ON "etta_projects_tags" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "etta_projects_tags_parent_idx" ON "etta_projects_tags" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "etta_projects_image_idx" ON "etta_projects" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "etta_projects_updated_at_idx" ON "etta_projects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "etta_projects_created_at_idx" ON "etta_projects" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "etta_course_blocks_link_block_order_idx" ON "etta_course_blocks_link_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "etta_course_blocks_link_block_parent_id_idx" ON "etta_course_blocks_link_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "etta_course_blocks_link_block_path_idx" ON "etta_course_blocks_link_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "etta_course_image_idx" ON "etta_course" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "etta_course_updated_at_idx" ON "etta_course" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "etta_course_created_at_idx" ON "etta_course" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "etta_exploration_blocks_link_block_order_idx" ON "etta_exploration_blocks_link_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "etta_exploration_blocks_link_block_parent_id_idx" ON "etta_exploration_blocks_link_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "etta_exploration_blocks_link_block_path_idx" ON "etta_exploration_blocks_link_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "etta_exploration_image_idx" ON "etta_exploration" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "etta_exploration_updated_at_idx" ON "etta_exploration" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "etta_exploration_created_at_idx" ON "etta_exploration" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "franz_media_updated_at_idx" ON "franz_media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "franz_media_created_at_idx" ON "franz_media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "franz_media_filename_idx" ON "franz_media" USING btree ("filename");
  CREATE UNIQUE INDEX IF NOT EXISTS "franz_blogs_slug_idx" ON "franz_blogs" USING btree ("slug");
  CREATE UNIQUE INDEX IF NOT EXISTS "franz_blogs_title_idx" ON "franz_blogs" USING btree ("title");
  CREATE INDEX IF NOT EXISTS "franz_blogs_updated_at_idx" ON "franz_blogs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "franz_blogs_created_at_idx" ON "franz_blogs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "franz_work_experience_updated_at_idx" ON "franz_work_experience" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "franz_work_experience_created_at_idx" ON "franz_work_experience" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_etta_media_id_idx" ON "payload_locked_documents_rels" USING btree ("etta_media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_etta_work_experience_id_idx" ON "payload_locked_documents_rels" USING btree ("etta_work_experience_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_etta_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("etta_projects_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_etta_course_id_idx" ON "payload_locked_documents_rels" USING btree ("etta_course_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_etta_exploration_id_idx" ON "payload_locked_documents_rels" USING btree ("etta_exploration_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_franz_media_id_idx" ON "payload_locked_documents_rels" USING btree ("franz_media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_franz_blogs_id_idx" ON "payload_locked_documents_rels" USING btree ("franz_blogs_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_franz_work_experience_id_idx" ON "payload_locked_documents_rels" USING btree ("franz_work_experience_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "etta_media" CASCADE;
  DROP TABLE "etta_work_experience_blocks_text_field_block" CASCADE;
  DROP TABLE "etta_work_experience" CASCADE;
  DROP TABLE "etta_projects_tags" CASCADE;
  DROP TABLE "etta_projects" CASCADE;
  DROP TABLE "etta_course_blocks_link_block" CASCADE;
  DROP TABLE "etta_course" CASCADE;
  DROP TABLE "etta_exploration_blocks_link_block" CASCADE;
  DROP TABLE "etta_exploration" CASCADE;
  DROP TABLE "franz_media" CASCADE;
  DROP TABLE "franz_blogs" CASCADE;
  DROP TABLE "franz_work_experience" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_etta_projects_tags";
  DROP TYPE "public"."enum_etta_projects_project_type";`)
}
