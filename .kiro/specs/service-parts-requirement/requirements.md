# Requirements Document

## Introduction

This feature implements frontend views for parameterizing articles (spare parts) in services and handling automatic inventory consumption when assigning services to orders. It covers four independent components: ServiceArticle CRUD, Service form modification with `requires_articles` toggle, parts section in service-to-order assignment, and parts display in order detail. Each component has its own route and permission control following the project's feature-based architecture.

## Glossary

- **ServiceArticle**: Configuration entity that links an Article (spare part) to a Service, defining the default quantity to consume when the service is applied to an order.
- **Article**: An inventory item (spare part) identified by SKU, managed in the inventory module.
- **Service**: A repair or maintenance service from the catalog that can be applied to work orders.
- **OrderService**: The assignment of a Service to a specific Work Order, including price, estimated time, and linked issues.
- **MaterialIssue**: An inventory material exit document generated when parts are consumed for an OrderService. Has states: DRAFT, PENDING, APPROVED.
- **Store**: A warehouse/storage location (almacén) where articles are stocked.
- **Parts**: Array of articles with quantities to be consumed from a Store when assigning a service that requires articles.
- **ServiceArticle_CRUD**: The independent component for managing article configurations per service.
- **Service_Form**: The catalog form used to create and edit services.
- **Assignment_Form**: The form used to assign a service to a work order.
- **OrderService_Detail**: The view that displays details of a service assigned to an order, including consumed parts.
- **System**: The FixSite frontend application.

## Requirements

### Requirement 1: ServiceArticle Listing

**User Story:** As an administrator, I want to view a paginated list of configured articles for a service, so that I can manage which spare parts are required for each service.

#### Acceptance Criteria

1. WHEN the ServiceArticle_CRUD component is loaded for a given service, THE System SHALL display a paginated table with columns: SKU, Article name, Default quantity, Unit of measurement, Active status, and Actions, with an initial page size of 25 rows.
2. WHEN the user types a search term, THE System SHALL filter the ServiceArticle list by calling `GET /service-articles?service_id=X&filter=TERM&page=1&limit=LIMIT` with a debounce delay of 300 milliseconds, resetting to page 1.
3. WHEN the user changes the page or page size, THE System SHALL request the corresponding page from the API and display the results.
4. WHILE the System is fetching ServiceArticle data, THE System SHALL display a loading state.
5. IF the API returns an error, THEN THE System SHALL display an error message in Spanish indicating the operation failed, without exposing technical details.
6. IF the service has `requires_articles = false`, THEN THE System SHALL not render the ServiceArticle_CRUD component and SHALL display a message indicating the service does not require articles.
7. IF the API returns an empty result set, THEN THE System SHALL display an empty state message indicating no articles are configured for the service.

### Requirement 2: ServiceArticle Creation

**User Story:** As an administrator, I want to add article configurations to a service, so that I can define which spare parts the service requires and their default quantities.

#### Acceptance Criteria

1. WHEN the user submits the creation form with a valid article selection, default quantity (0.01–9999.99 with up to 2 decimal places), and active toggle, THE System SHALL send a `POST /service-articles` request with `service_id`, `article_id`, `default_quantity`, and `is_active`.
2. WHEN the API returns a successful response, THE System SHALL display a success notification for 3 seconds and refresh the ServiceArticle list.
3. IF the API returns a 409 conflict (duplicate article for the same service), THEN THE System SHALL display the message "Este artículo ya está configurado para este servicio".
4. IF the API returns a non-409 error response or the request fails due to a network error, THEN THE System SHALL display a generic error notification indicating the operation could not be completed and preserve the form data.
5. WHEN the user modifies the `default_quantity` field, THE System SHALL validate that the value is a number between 0.01 and 9999.99 with a maximum of 2 decimal places, and display the validation message "La cantidad debe ser un número entre 0.01 y 9999.99" when invalid.
6. THE System SHALL provide an article selector (SearchableSelect) that filters articles by name or SKU after the user types at least 2 characters, displaying a maximum of 50 results.
7. THE System SHALL initialize the `is_active` toggle to `true` by default when the creation form is opened.

### Requirement 3: ServiceArticle Editing

**User Story:** As an administrator, I want to edit the default quantity and active state of a configured article, so that I can adjust service requirements over time.

#### Acceptance Criteria

1. WHEN the user opens the edit form for a ServiceArticle, THE System SHALL pre-populate the form fields with the current `default_quantity` and `is_active` values and display the associated article name as read-only.
2. THE System SHALL validate that `default_quantity` is a number between 0.01 and 9999.99 with a maximum of 2 decimal places before submitting.
3. IF the validation fails, THEN THE System SHALL display an inline error message in Spanish below the invalid field and prevent form submission.
4. WHEN the user submits the edit form with updated `default_quantity` and/or `is_active`, THE System SHALL disable the submit button and send a `PATCH /service-articles/:id` request with only the changed fields.
5. WHEN the API returns a successful response, THE System SHALL display a success toast notification and refresh the ServiceArticle list.
6. IF the API returns an error, THEN THE System SHALL re-enable the submit button and display a non-technical error notification in Spanish indicating the operation could not be completed.

### Requirement 4: ServiceArticle Deletion

**User Story:** As an administrator, I want to delete an article configuration from a service, so that I can remove spare parts that are no longer needed.

#### Acceptance Criteria

1. WHEN the user clicks the delete action for a ServiceArticle, THE System SHALL display a confirmation modal (using AlertModal) requesting explicit confirmation before proceeding with deletion.
2. IF the user dismisses or cancels the confirmation modal, THEN THE System SHALL close the modal and take no further action, leaving the ServiceArticle unchanged.
3. WHEN the user confirms deletion in the modal, THE System SHALL send a `DELETE /service-articles/:id` request and disable the confirm button until the request completes to prevent duplicate submissions.
4. WHEN the API returns a successful response (HTTP 200 or 204), THE System SHALL close the confirmation modal, display a success toast notification, and refresh the ServiceArticle list to reflect the removal.
5. IF the API returns an error response, THEN THE System SHALL close the confirmation modal, display an error toast notification indicating that the deletion could not be completed, and leave the ServiceArticle list unchanged.

### Requirement 5: Service Form — requires_articles Toggle

**User Story:** As an administrator, I want to mark a service as requiring articles, so that technicians must provide spare parts information when applying the service to an order.

#### Acceptance Criteria

1. THE Service_Form SHALL display a Switch control labeled "¿Requiere artículos de recambio?" for the `requires_articles` field within the service creation/edition modal.
2. WHEN the administrator is editing an existing service AND `requires_articles` is `true`, THE Service_Form SHALL display a button to navigate to the ServiceArticle configuration for that service.
3. IF the service has not been persisted yet (creation mode), THEN THE Service_Form SHALL NOT display the button to access the ServiceArticle configuration, regardless of the `requires_articles` value.
4. WHEN saving the service, THE System SHALL include the `requires_articles` boolean in the request body sent to the existing `/services` POST and PUT endpoints.
5. THE System SHALL default `requires_articles` to `false` for new services in the form schema default values.
6. WHEN the administrator opens the edit modal for an existing service, THE Service_Form SHALL populate the `requires_articles` Switch with the current value returned by the API.

### Requirement 6: Conditional Parts Section in Service Assignment

**User Story:** As a technician, I want to specify parts and a store when assigning a service that requires articles, so that inventory consumption is tracked correctly.

#### Acceptance Criteria

1. WHEN the user selects a service with `requires_articles = true` in the Assignment_Form, THE System SHALL display a parts section containing a store selector (SearchableSelect showing only stores with `active = true`) and an editable article list.
2. WHEN the user selects a service with `requires_articles = false`, THE System SHALL hide the parts section and clear any previously selected store or articles.
3. WHEN the parts section is displayed, THE System SHALL fetch articles via `GET /service-articles?service_id=X` and pre-fill the article list with the service's configured ServiceArticles and their default quantities (rounded to the nearest integer, minimum 1).
4. WHILE the parts section is visible, THE System SHALL allow the user to adjust quantity for each article (integer, minimum 1, maximum 10000).
5. IF the user attempts to add an article when the parts list already contains 50 articles, THEN THE System SHALL prevent the addition and display "Se alcanzó el máximo de 50 artículos".
6. IF the user attempts to add an article that already exists in the parts list, THEN THE System SHALL prevent the addition and display "Este artículo ya fue agregado".
7. WHEN the user submits the Assignment_Form for a service with `requires_articles = true`, THE System SHALL include `parts` array and `store_id` in the `POST /orders-service/create` request body.
8. IF `requires_articles = true` and the parts array is empty, THEN THE System SHALL prevent form submission and display "Debe incluir al menos una parte".
9. IF `requires_articles = true` and no store is selected, THEN THE System SHALL prevent form submission and display "Debe seleccionar un almacén".
10. IF the `GET /service-articles?service_id=X` request fails, THEN THE System SHALL display an error message indicating the articles could not be loaded and prevent form submission until the list is successfully loaded or the user selects a different service.
11. WHEN the user changes the selected service in the Assignment_Form, THE System SHALL clear the current parts list and store selection, and re-evaluate whether the parts section should be displayed based on the new service's `requires_articles` value.

### Requirement 7: Stock Error Handling

**User Story:** As a technician, I want to see detailed stock availability when there is insufficient inventory, so that I can adjust quantities before retrying.

#### Acceptance Criteria

1. IF the API returns a 400 response with message "Stock insuficiente para completar la solicitud" and an `errors` array, THEN THE System SHALL display an inline table within the assignment form showing three columns: Article name (resolved from `article_id`), Required quantity, and Available quantity, with one row per item in the `errors` array.
2. WHILE the stock error table is displayed, THE System SHALL keep the form editable and preserve all previously entered field values, allowing the user to modify quantities in the parts list and resubmit the form without navigating away.
3. WHEN the user resubmits the form after a stock error, THE System SHALL hide the previous stock error table and display a new one only if the API returns a stock error again.
4. IF the API returns "El artículo {id} no está permitido para este servicio", THEN THE System SHALL display the error message inline in the form and apply a visual error state (error border color from the theme) to the article input that triggered the rejection.
5. IF the API returns "El almacén con ID {id} no existe o está inactivo", THEN THE System SHALL display the error message inline in the form and apply a visual error state (error border color from the theme) to the store selector field.
6. IF the API returns "No se permiten artículos duplicados en la misma solicitud", THEN THE System SHALL display the error message inline in the form above the parts list section.
7. IF the API returns a stock-related error (criteria 1, 4, 5, or 6), THEN THE System SHALL NOT clear the form or navigate the user away, preserving all current input state for correction.

### Requirement 8: Parts Display in OrderService Detail

**User Story:** As a user, I want to see the consumed parts for a service assigned to an order, so that I can review material usage.

#### Acceptance Criteria

1. WHEN an OrderService has associated parts (parts array with 1 or more items) in its response, THE OrderService_Detail SHALL display a list of consumed parts showing for each item: Article name (text), SKU (text), Quantity (integer, minimum 1), and Store name (text).
2. WHEN an OrderService has no associated parts (parts array is empty or absent), THE OrderService_Detail SHALL display a text message indicating no parts have been consumed for this service.
3. WHEN an OrderService has a `material_issue_id` (non-null numeric value), THE OrderService_Detail SHALL display a Badge component that shows the MaterialIssue reference identifier and functions as a navigable link to the MaterialIssue detail.
4. IF an OrderService has a `material_issue_id` and the MaterialIssue status is DRAFT, THEN THE OrderService_Detail SHALL display a Badge with variant "info" showing the status text.
5. IF an OrderService has a `material_issue_id` and the MaterialIssue status is PENDING, THEN THE OrderService_Detail SHALL display a Badge with variant "warning" showing the status text.
6. IF an OrderService has a `material_issue_id` and the MaterialIssue status is APPROVED, THEN THE OrderService_Detail SHALL display a Badge with variant "success" showing the status text.
7. IF an OrderService does not have a `material_issue_id` (null or absent), THEN THE OrderService_Detail SHALL not render the MaterialIssue badge or link.

### Requirement 9: OrderService Deletion with MaterialIssue Validation

**User Story:** As an administrator, I want to be prevented from deleting a service assignment whose material issue has been approved, so that approved inventory exits are not inadvertently reversed.

#### Acceptance Criteria

1. WHEN the user attempts to delete an OrderService whose associated MaterialIssue status is APPROVED, THE System SHALL block the deletion and display an error alert with the message "No se puede eliminar: el egreso de material ya fue aprobado" without sending a DELETE request to the backend.
2. WHEN the user attempts to delete an OrderService whose associated MaterialIssue status is DRAFT or PENDING, THE System SHALL display a warning modal indicating that the associated material issue will be cancelled, with a "Cancelar" button to abort and a "Eliminar" button to confirm.
3. WHEN the user confirms deletion of an OrderService with a DRAFT or PENDING MaterialIssue by clicking the "Eliminar" button in the warning modal, THE System SHALL send the DELETE request to the backend and, upon success, close the modal.
4. IF the OrderService has no associated MaterialIssue (material_issue_status is null or absent), THEN THE System SHALL display the standard deletion confirmation modal without referencing material issues.
5. IF the DELETE request for an OrderService fails with a backend error, THEN THE System SHALL display an error alert indicating the deletion could not be completed and preserve the OrderService in the list without changes.

### Requirement 10: Independent Component Architecture

**User Story:** As a developer, I want each CRUD functionality to be an independent component with its own route and permission control, so that visibility can be managed per user role.

#### Acceptance Criteria

1. THE System SHALL implement ServiceArticle_CRUD as an independent feature module under `src/features/` with `pages/`, `services/`, `schemas/`, and `components/` subdirectories.
2. THE System SHALL implement each view (ServiceArticle listing, Service form modification, Parts assignment section, OrderService detail) as a separate page component, each registered in the `componentDictionary` with a unique `componentKey` string for lazy-loading.
3. THE System SHALL make each component route accessible only when the user's role includes the corresponding permission entry, relying on the dynamic route generation from the permissions array, and SHALL use the `useHasPermission` hook to conditionally render action elements (create, edit, delete buttons) within each view.
4. THE System SHALL use strict TypeScript with no `any` types across all new components, enforced by the project's existing ESLint configuration.
5. THE System SHALL implement all UI labels, form placeholders, and validation error messages in Spanish.
6. THE System SHALL use RTK Query for all API communication by defining endpoints via `baseApi.injectEndpoints` in a dedicated service file within the feature module's `services/` directory.
7. THE System SHALL use Zod schemas with React Hook Form (via `zodResolver`) for all form validations, exporting the schema, inferred type, and default values from the feature module's `schemas/` directory.
