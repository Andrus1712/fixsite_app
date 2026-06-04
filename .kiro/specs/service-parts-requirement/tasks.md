# Implementation Plan: Service Parts Requirement

## Overview

This plan implements four independent frontend modules for managing spare parts (articles) in services and handling inventory consumption when assigning services to work orders. The implementation follows the project's established patterns: `baseApi.injectEndpoints`, `zodResolver`, `componentDictionary` registration, feature-based folder structure, and Spanish-language UI.

## Tasks

- [x] 1. Set up ServiceArticle feature module structure and core schemas
  - [x] 1.1 Create directory structure and Zod schemas for service-articles module
    - Create `src/features/service-articles/` with `components/`, `pages/`, `schemas/`, `services/` subdirectories
    - Create `src/features/service-articles/schemas/service-article.schema.ts` with `ServiceArticleSchema`, `ServiceArticleFormData` type, and `serviceArticleDefaultValues`
    - Create `src/features/service-articles/schemas/index.ts` barrel export
    - Validation: `article_id` min 1, `default_quantity` 0.01–9999.99 with max 2 decimal places, `is_active` boolean
    - _Requirements: 2.5, 3.2, 10.7_

  - [x] 1.2 Create RTK Query service for ServiceArticle CRUD endpoints
    - Create `src/features/service-articles/services/ServiceArticleApi.ts`
    - Define TypeScript interfaces: `ServiceArticle`, `ServiceArticlesListResponse`, `CreateServiceArticleDto`, `UpdateServiceArticleDto`
    - Implement endpoints: `getServiceArticles` (paginated query with `service_id`, `page`, `limit`, `filter`), `createServiceArticle` (mutation POST), `updateServiceArticle` (mutation PATCH), `deleteServiceArticle` (mutation DELETE)
    - Use `baseApi.injectEndpoints` pattern, `providesTags: ["ServiceArticle"]`, `invalidatesTags: ["ServiceArticle"]`
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 3.4, 4.3, 10.6_

  - [x] 1.3 Extend ServiceSchema with `requires_articles` field
    - Modify `src/features/services-catalog/schemas/service.schema.ts` to add `requires_articles: z.boolean()` field
    - Update `serviceDefaultValues` to include `requires_articles: false`
    - Update `Service` interface in `src/features/services-catalog/services/ServicesApi.ts` to include `requires_articles: boolean`
    - Update `CreateServiceDto` and `UpdateServiceDto` types to include `requires_articles`
    - _Requirements: 5.1, 5.4, 5.5, 10.7_

- [x] 2. Implement ServiceArticle CRUD page and form components
  - [x] 2.1 Create ServiceArticleForm component
    - Create `src/features/service-articles/components/ServiceArticleForm.tsx`
    - Props: `serviceId`, `editingArticle`, `onSuccess`, `onCancel`
    - Create mode: `SearchableSelect` for article (search by name/SKU, min 2 chars, max 50 results), quantity `Input`, `Switch` for active (default true)
    - Edit mode: read-only article name display, editable quantity + active toggle
    - Use `useForm` with `zodResolver(ServiceArticleSchema)`
    - Handle 409 conflict with specific message: "Este artículo ya está configurado para este servicio"
    - Handle generic errors with toast notification, preserve form data on error
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [x] 2.2 Create ServiceArticlesPage with DataTable, search, and CRUD modals
    - Create `src/features/service-articles/pages/ServiceArticlesPage.tsx`
    - Paginated `DataTable` with columns: SKU, Article name, Default quantity, Unit of measurement, Active status, Actions
    - Server-side pagination with initial page size of 25
    - Search with 300ms debounce, resetting to page 1
    - Create/Edit via `Modal` with `ServiceArticleForm`
    - Delete via `AlertModal` confirmation
    - Loading state while fetching, empty state message when no articles configured
    - Show message when service has `requires_articles = false`
    - Permission-gated action buttons using `useHasPermission`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 4.1, 4.2, 4.3, 4.4, 4.5, 10.2, 10.3_

  - [ ]* 2.3 Write property test for ServiceArticle quantity validation (Property 1)
    - **Property 1: ServiceArticle quantity validation accepts valid decimals and rejects invalid ones**
    - Create `src/features/service-articles/__tests__/service-article.schema.property.test.ts`
    - Use fast-check to generate arbitrary numbers and verify schema accepts iff 0.01 ≤ n ≤ 9999.99 with at most 2 decimal places
    - Minimum 100 iterations
    - **Validates: Requirements 2.5, 3.2**

  - [ ]* 2.4 Write property test for PATCH delta logic (Property 2)
    - **Property 2: Edit form PATCH payload contains only changed fields**
    - Create `src/features/service-articles/__tests__/patch-delta.property.test.ts`
    - Use fast-check to generate original and new form values, verify PATCH body includes only fields where values differ
    - Minimum 100 iterations
    - **Validates: Requirements 3.4**

- [x] 3. Checkpoint - Ensure ServiceArticle module compiles and tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Extend Service Form with requires_articles toggle
  - [x] 4.1 Modify ServicesPage to add requires_articles Switch and navigation button
    - Modify `src/features/services-catalog/pages/ServicesPage.tsx`
    - Add `Switch` control labeled "¿Requiere artículos de recambio?" in the create/edit modal
    - When editing a service with `requires_articles = true`, show navigation button to ServiceArticle CRUD
    - In creation mode, never show the navigation button regardless of toggle value
    - Include `requires_articles` boolean in POST/PUT request body
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 5. Implement parts section in service assignment flow
  - [x] 5.1 Create AssignmentPartsSchema for parts section validation
    - Create or extend the assignment form schema to include `store_id` and `parts` array validation
    - `store_id`: `z.number().min(1, "Debe seleccionar un almacén.")`
    - `parts`: array of `{article_id, article_name, sku, quantity}` with min 1, max 50, quantity integer 1–10000
    - Export schema, type, and default values
    - _Requirements: 6.4, 6.5, 6.8, 6.9, 10.7_

  - [x] 5.2 Create AssignServiceParts component
    - Create `src/features/orders/components/AssignServiceParts.tsx`
    - Props: `serviceId`, `requiresArticles`, `control`, `errors`, `setValue`, `watch`
    - Only visible when `requires_articles = true`; hidden + cleared otherwise
    - `SearchableSelect` for store (active stores only)
    - Pre-fill article list from `GET /service-articles?service_id=X` with rounded quantities (`Math.max(1, Math.round(d))`)
    - Allow quantity adjustment (integer, 1–10000), adding/removing articles (max 50, no duplicates)
    - Clear state on service change
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.10, 6.11_

  - [x] 5.3 Create StockErrorTable component
    - Create `src/features/service-articles/components/StockErrorTable.tsx`
    - Props: `errors` array with `{article_id, required, available}`, `articleNames` map
    - Render inline table with columns: Article name, Required quantity, Available quantity
    - One row per item in errors array
    - _Requirements: 7.1_

  - [x] 5.4 Integrate AssignServiceParts into order-service assignment form
    - Modify the service assignment form (in `src/features/orders/components/FromTabService.tsx` or relevant component)
    - Conditionally render `AssignServiceParts` based on selected service's `requires_articles`
    - Include `parts` array and `store_id` in `POST /orders-service/create` request body
    - Handle stock error responses (400): display `StockErrorTable`, preserve form state, allow retry
    - Handle article-not-permitted, store-inactive, and duplicate-articles errors with inline messages and error borders
    - _Requirements: 6.7, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

  - [ ]* 5.5 Write property test for default quantity rounding (Property 3)
    - **Property 3: Default quantity rounding produces integer ≥ 1**
    - Create `src/features/service-articles/__tests__/quantity-rounding.property.test.ts`
    - Use fast-check to generate positive decimals, verify `Math.max(1, Math.round(d))` produces integer ≥ 1
    - Minimum 100 iterations
    - **Validates: Requirements 6.3**

  - [ ]* 5.6 Write property test for assignment part quantity validation (Property 4)
    - **Property 4: Assignment part quantity validation accepts valid integers in range**
    - Add tests to `src/features/service-articles/__tests__/service-article.schema.property.test.ts`
    - Use fast-check to verify schema accepts integer n iff 1 ≤ n ≤ 10000; rejects non-integers and out-of-range values
    - Minimum 100 iterations
    - **Validates: Requirements 6.4**

  - [ ]* 5.7 Write property tests for parts list logic (Properties 5, 6)
    - **Property 5: Duplicate article prevention in parts list**
    - **Property 6: Service change clears parts state**
    - Create `src/features/service-articles/__tests__/parts-list.property.test.ts`
    - Property 5: Generate parts list with existing article_id X, verify adding X again is rejected with "Este artículo ya fue agregado" and list unchanged
    - Property 6: Generate arbitrary previous parts state, verify service change results in empty parts list and null store
    - Minimum 100 iterations each
    - **Validates: Requirements 6.6, 6.2, 6.11**

- [x] 6. Checkpoint - Ensure assignment flow compiles and property tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implement parts display in OrderService detail
  - [x] 7.1 Create OrderServiceParts component for read-only parts display
    - Create `src/features/orders/components/OrderServiceParts.tsx`
    - Props: `parts` array, `materialIssueId`, `materialIssueStatus`
    - Render list of parts: article name, SKU, quantity, store name
    - Show "no parts consumed" message when array is empty/absent
    - Display MaterialIssue `Badge` with status-based variant: DRAFT → info, PENDING → warning, APPROVED → success
    - Badge links to MaterialIssue detail route
    - Only render badge when `materialIssueId` is non-null
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

  - [x] 7.2 Integrate OrderServiceParts into InfoOrderPage
    - Modify `src/features/orders/pages/InfoOrderPage.tsx` to display parts section for each OrderService
    - Read `parts`, `material_issue_id`, `material_issue_status` from OrderService response
    - Conditionally render `OrderServiceParts` component
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 7.3 Implement OrderService deletion with MaterialIssue validation
    - Extend existing deletion flow in the order detail page
    - If `material_issue_status === 'APPROVED'` → block with error alert "No se puede eliminar: el egreso de material ya fue aprobado", no API call
    - If `material_issue_status === 'DRAFT' | 'PENDING'` → warning modal about material issue cancellation with "Cancelar" and "Eliminar" buttons
    - If no material issue → standard `AlertModal` confirmation
    - Handle DELETE request failure with error toast, preserve list
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ]* 7.4 Write property tests for stock error table and form preservation (Properties 7, 8)
    - **Property 7: Stock error table renders correct number of rows**
    - **Property 8: Form state preserved on stock-related errors**
    - Create `src/features/service-articles/__tests__/stock-error.property.test.ts`
    - Property 7: Generate errors array of length N ≥ 1, verify table renders exactly N rows
    - Property 8: Generate arbitrary form state + stock error, verify all form values preserved
    - Minimum 100 iterations each
    - **Validates: Requirements 7.1, 7.7**

  - [ ]* 7.5 Write property test for deletion guard (Property 9)
    - **Property 9: Deletion blocked for OrderService with APPROVED MaterialIssue**
    - Create `src/features/service-articles/__tests__/deletion-guard.property.test.ts`
    - Generate OrderService with APPROVED status, verify error alert displayed and no DELETE request sent
    - Minimum 100 iterations
    - **Validates: Requirements 9.1**

- [x] 8. Register components in componentDictionary and wire routes
  - [x] 8.1 Register ServiceArticlesPage in componentDictionary
    - Add lazy import and entry in `src/app/router/componentDictionary.ts` for `ServiceArticlesPage`
    - Use componentKey: `"service-article-index"` (or appropriate key matching backend permission)
    - _Requirements: 10.2, 10.3_

  - [x] 8.2 Wire navigation from ServicesPage to ServiceArticlesPage
    - Ensure the navigation button in ServicesPage correctly routes to the ServiceArticles page with `service_id` param
    - Verify route params are correctly consumed in `ServiceArticlesPage`
    - _Requirements: 5.2, 10.2_

- [x] 9. Final checkpoint - Ensure all modules compile, tests pass, and integration works
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The design uses TypeScript explicitly — no language selection needed
- Existing `PartsManagement` directory in orders/components is unrelated prototype code
- `StockErrorTable` is placed in `service-articles/components/` per design but used from orders module via import

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.3"] },
    { "id": 1, "tasks": ["1.2", "4.1", "5.1"] },
    { "id": 2, "tasks": ["2.1", "5.3"] },
    { "id": 3, "tasks": ["2.2", "2.3", "2.4", "5.2"] },
    { "id": 4, "tasks": ["5.4", "5.5", "5.6", "5.7"] },
    { "id": 5, "tasks": ["7.1", "7.3"] },
    { "id": 6, "tasks": ["7.2", "7.4", "7.5"] },
    { "id": 7, "tasks": ["8.1", "8.2"] }
  ]
}
```
