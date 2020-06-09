# Migration `20200602223510`

This migration has been generated by Matej Hrescak at 6/2/2020, 10:35:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Category" ADD COLUMN "recipeId" integer   ;

ALTER TABLE "public"."Category" ADD FOREIGN KEY ("recipeId")REFERENCES "public"."Recipe"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200602223144-optionals..20200602223510
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 enum Unit {
   TSP
@@ -66,16 +66,15 @@
   totalDuration      Int?
   kitchen            Kitchen  @relation(references: [id], fields: [kitchenId])
   kitchenId          Int
   imageURL           String?
-  //ingredients  RecipeIngredient[]
+  ingredients  RecipeIngredient[]
   ingredientSections String[]
   instructions       String?
   isDeleted          Boolean  @default(value: false)
-  //categories   Category[] @relation(references: [id])
+  categories   Category[] 
   starredBy          User[]
-  RecipeIngredient RecipeIngredient[]
 }
 model Ingredient {
   id       Int                @default(autoincrement()) @id
```

