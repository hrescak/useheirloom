# Migration `20200610141138-is-public`

This migration has been generated by Matej Hrescak at 6/10/2020, 2:11:38 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Recipe" ADD COLUMN "isPublic" boolean  NOT NULL DEFAULT false;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200608231733-new..20200610141138-is-public
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL1")
 }
 enum Unit {
   TSP
@@ -57,8 +57,9 @@
   id                 Int      @default(autoincrement()) @id
   name               String?
   summary            String?
   publicID           String?   @unique
+  isPublic           Boolean   @default(false)
   sourceName         String?
   sourceURL          String?
   servings           Int?
   prepDuration       Int?
```

