/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Term` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Termbase` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."global_role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "public"."workspace_role" AS ENUM ('OWNER', 'ADMIN', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "public"."lang" AS ENUM ('EN', 'ZH');

-- CreateEnum
CREATE TYPE "public"."audit_action" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'INVITE', 'JOIN', 'LEAVE', 'EXPORT', 'IMPORT');

-- DropForeignKey
ALTER TABLE "public"."Member" DROP CONSTRAINT "Member_termbase_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Member" DROP CONSTRAINT "Member_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Term" DROP CONSTRAINT "Term_termbase_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Termbase" DROP CONSTRAINT "Termbase_ownerId_fkey";

-- DropTable
DROP TABLE "public"."Member";

-- DropTable
DROP TABLE "public"."Term";

-- DropTable
DROP TABLE "public"."Termbase";

-- DropTable
DROP TABLE "public"."User";

-- DropEnum
DROP TYPE "public"."Lang";

-- DropEnum
DROP TYPE "public"."Role";

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "globalRole" "public"."global_role" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workspaces" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "owner_id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."workspace_members" (
    "id" SERIAL NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "public"."workspace_role" NOT NULL DEFAULT 'VIEWER',
    "permissions" INTEGER NOT NULL DEFAULT 0,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspace_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."invitations" (
    "id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "role" "public"."workspace_role" NOT NULL DEFAULT 'VIEWER',
    "expires_at" TIMESTAMP(3) NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "used_at" TIMESTAMP(3),
    "invited_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."termbases" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "owner_id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "source_lang" "public"."lang" NOT NULL,
    "target_lang" "public"."lang" NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "term_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "termbases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."terms" (
    "id" TEXT NOT NULL,
    "termbase_id" TEXT NOT NULL,
    "source_term" TEXT NOT NULL,
    "target_term" TEXT NOT NULL,
    "definition" TEXT,
    "context" TEXT,
    "notes" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "verified_by" TEXT,
    "verified_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."audit_logs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "action" "public"."audit_action" NOT NULL,
    "entity_type" VARCHAR(50) NOT NULL,
    "entity_id" TEXT NOT NULL,
    "old_values" JSONB,
    "new_values" JSONB,
    "metadata" JSONB,
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "workspaces_owner_id_idx" ON "public"."workspaces"("owner_id");

-- CreateIndex
CREATE INDEX "workspaces_isActive_idx" ON "public"."workspaces"("isActive");

-- CreateIndex
CREATE INDEX "workspace_members_workspace_id_idx" ON "public"."workspace_members"("workspace_id");

-- CreateIndex
CREATE INDEX "workspace_members_user_id_idx" ON "public"."workspace_members"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_members_user_id_workspace_id_key" ON "public"."workspace_members"("user_id", "workspace_id");

-- CreateIndex
CREATE UNIQUE INDEX "invitations_token_key" ON "public"."invitations"("token");

-- CreateIndex
CREATE INDEX "invitations_token_idx" ON "public"."invitations"("token");

-- CreateIndex
CREATE INDEX "invitations_email_idx" ON "public"."invitations"("email");

-- CreateIndex
CREATE INDEX "invitations_workspace_id_idx" ON "public"."invitations"("workspace_id");

-- CreateIndex
CREATE INDEX "invitations_expires_at_idx" ON "public"."invitations"("expires_at");

-- CreateIndex
CREATE INDEX "termbases_workspace_id_idx" ON "public"."termbases"("workspace_id");

-- CreateIndex
CREATE INDEX "termbases_owner_id_idx" ON "public"."termbases"("owner_id");

-- CreateIndex
CREATE INDEX "termbases_is_deleted_idx" ON "public"."termbases"("is_deleted");

-- CreateIndex
CREATE INDEX "termbases_source_lang_target_lang_idx" ON "public"."termbases"("source_lang", "target_lang");

-- CreateIndex
CREATE INDEX "termbases_created_at_idx" ON "public"."termbases"("created_at");

-- CreateIndex
CREATE INDEX "terms_termbase_id_idx" ON "public"."terms"("termbase_id");

-- CreateIndex
CREATE INDEX "terms_source_term_idx" ON "public"."terms"("source_term");

-- CreateIndex
CREATE INDEX "terms_target_term_idx" ON "public"."terms"("target_term");

-- CreateIndex
CREATE INDEX "terms_is_verified_idx" ON "public"."terms"("is_verified");

-- CreateIndex
CREATE INDEX "audit_logs_user_id_idx" ON "public"."audit_logs"("user_id");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "public"."audit_logs"("action");

-- CreateIndex
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "public"."audit_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "audit_logs_created_at_idx" ON "public"."audit_logs"("created_at");

-- AddForeignKey
ALTER TABLE "public"."workspaces" ADD CONSTRAINT "workspaces_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workspace_members" ADD CONSTRAINT "workspace_members_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."workspace_members" ADD CONSTRAINT "workspace_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."invitations" ADD CONSTRAINT "invitations_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."termbases" ADD CONSTRAINT "termbases_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."termbases" ADD CONSTRAINT "termbases_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."terms" ADD CONSTRAINT "terms_termbase_id_fkey" FOREIGN KEY ("termbase_id") REFERENCES "public"."termbases"("id") ON DELETE CASCADE ON UPDATE CASCADE;
