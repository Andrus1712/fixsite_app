# Requirements Document

## Introduction

This feature implements the order status workflow UI for the FixSite App. The backend already provides status transition validation via `PUT /orders/update-status/:order_code`. The frontend needs contextual action buttons per status, a visual stepper/timeline, confirmation modals, status badges, and role-based permission logic to guide technicians and administrators through the repair lifecycle.

## Glossary

- **Order_Status_Workflow**: The UI system that manages visual representation and user interactions for transitioning work orders through their lifecycle states
- **Status_Badge**: A colored chip/badge component that visually indicates the current state of a work order
- **Status_Stepper**: A visual timeline component showing all states an order has passed through, with the current state highlighted
- **Action_Bar**: A contextual section displaying available action buttons based on the current order status and user permissions
- **Confirmation_Modal**: A dialog that requires user confirmation before executing a status transition, with optional or mandatory notes
- **Work_Order**: A repair service order tracked in the system, containing client, device, issues, and service information
- **Technician**: A user with the assigned technician role responsible for diagnosing and repairing devices
- **Administrator**: A user with admin or receptionist role who manages order delivery and cancellation
- **Order_Issue**: A reported failure/problem associated with a work order, having a status of PENDING, RESOLVED, or REJECTED
- **Status_Transition**: A valid change from one order state to another, validated by the backend API
- **RTK_Query**: Redux Toolkit Query, the data fetching and caching library used in the project

## Requirements

### Requirement 1: Status Badge Display

**User Story:** As a user, I want to see a colored badge indicating the current order status, so that I can quickly identify the state of any work order at a glance.

#### Acceptance Criteria

1. WHEN the Status_Badge receives an order status value, THE Status_Badge SHALL render a colored chip displaying the corresponding Spanish status label text and the mapped background color
2. WHEN the order status is PENDING (1), THE Status_Badge SHALL display the label "Pendiente" with a gray background color using the theme `gray400` variable
3. WHEN the order status is ASSIGNED (2), THE Status_Badge SHALL display the label "Asignada" with a blue background color using the theme `primary` variable
4. WHEN the order status is DIAGNOSING (3), THE Status_Badge SHALL display the label "En diagnóstico" with an amber background color using the theme `accent` variable
5. WHEN the order status is IN_REPAIR (4), THE Status_Badge SHALL display the label "En reparación" with an orange background color using the theme `orange` variable
6. WHEN the order status is COMPLETED (5), THE Status_Badge SHALL display the label "Completada" with a green background color using the theme `success` variable
7. WHEN the order status is DELIVERED (6), THE Status_Badge SHALL display the label "Entregada" with a dark green background color using the theme `teal` variable
8. WHEN the order status is CANCELLED (7), THE Status_Badge SHALL display the label "Cancelada" with a red background color using the theme `error` variable
9. WHEN the order status is WAITING_PARTS (8), THE Status_Badge SHALL display the label "Esperando repuestos" with a purple background color using the theme `purple` variable
10. THE Status_Badge SHALL use white text color for all status variants to ensure readable contrast against the colored backgrounds
11. IF the Status_Badge receives an unrecognized status value, THEN THE Status_Badge SHALL display the label "Desconocido" with a gray background color using the theme `gray400` variable

### Requirement 2: Status Stepper/Timeline

**User Story:** As a user, I want to see a visual timeline of all states the order has passed through, so that I can understand the repair progress history.

#### Acceptance Criteria

1. THE Status_Stepper SHALL display the normal flow states in fixed order (PENDING → ASSIGNED → DIAGNOSING → IN_REPAIR → COMPLETED → DELIVERED), showing completed states, the current active state, and future pending states
2. THE Status_Stepper SHALL highlight the current active state using the theme primary color for the step marker and label, visually distinguishing it from completed and pending steps
3. THE Status_Stepper SHALL display future/pending states using the theme textMuted color for the step marker and label
4. WHEN a state has been completed, THE Status_Stepper SHALL display the transition date and time formatted as "dd/MM/yyyy HH:mm" using the created_at value from the corresponding log event entry
5. THE Status_Stepper SHALL retrieve transition history from the order's log events API endpoint and map each log entry (containing status, created_at, and notes fields) to the corresponding step in the timeline
6. THE Status_Stepper SHALL render using Styled Components and theme variables for all colors and spacing
7. IF the order has transitioned through WAITING_PARTS or CANCELLED, THEN THE Status_Stepper SHALL display those branching states as a secondary indicator attached to the step from which the branch occurred, rather than inline in the normal flow sequence
8. IF the log events API call fails or returns an empty array, THEN THE Status_Stepper SHALL display only the current order status as the active step with no timestamp information, and show remaining states as pending
9. THE Status_Stepper SHALL display completed states using the theme success color for the step marker, along with a connector line between consecutive steps colored to indicate completion

### Requirement 3: Contextual Action Bar for ASSIGNED Status

**User Story:** As a technician, I want to see an "Iniciar diagnóstico" button when the order is assigned to me, so that I can begin the diagnostic phase.

#### Acceptance Criteria

1. WHILE the order status is ASSIGNED (2), THE Action_Bar SHALL display an "Iniciar diagnóstico" button using variant="primary"
2. WHEN the technician clicks "Iniciar diagnóstico", THE Order_Status_Workflow SHALL open the Confirmation_Modal to transition to DIAGNOSING (3)
3. WHILE the order status is ASSIGNED (2) AND the current user's ID does not match the order's assigned_technician_id, THE Action_Bar SHALL disable the "Iniciar diagnóstico" button
4. IF the order status is ASSIGNED (2) AND the order has no assigned_technician_id value, THEN THE Action_Bar SHALL hide the "Iniciar diagnóstico" button

### Requirement 4: Contextual Action Bar for DIAGNOSING Status

**User Story:** As a technician, I want to see a "Diagnóstico completado" button during diagnosis, so that I can advance the order to the repair phase after completing my assessment.

#### Acceptance Criteria

1. WHILE the order status is DIAGNOSING (3), THE Action_Bar SHALL display a "Diagnóstico completado" button
2. WHEN the technician clicks "Diagnóstico completado", THE Order_Status_Workflow SHALL open the Confirmation_Modal to transition to IN_REPAIR (4)
3. WHILE the order status is DIAGNOSING (3), THE Action_Bar SHALL display a status banner using the theme warning color palette (amber/yellow background) with a magnifying glass icon and the text "En diagnóstico"
4. WHILE the order status is DIAGNOSING (3) AND the current user is NOT the assigned technician, THE Action_Bar SHALL display the "Diagnóstico completado" button in a disabled state with a tooltip indicating that only the assigned technician can perform this action

### Requirement 5: Contextual Action Bar for IN_REPAIR Status

**User Story:** As a technician, I want to see repair-phase actions including "Esperando repuestos" and "Finalizar orden", so that I can manage the repair workflow appropriately.

#### Acceptance Criteria

1. WHILE the order status is IN_REPAIR (4), THE Action_Bar SHALL display an "Esperando repuestos" button with variant="warning"
2. WHEN the technician clicks "Esperando repuestos", THE Order_Status_Workflow SHALL open the Confirmation_Modal with a mandatory notes field (minimum 1 character, maximum 500 characters) to transition to WAITING_PARTS (8)
3. WHILE the order status is IN_REPAIR (4), THE Action_Bar SHALL display a "Finalizar orden" button with variant="success"
4. WHILE the order status is IN_REPAIR (4) AND all Order_Issue items have status RESOLVED or the order issues array is empty, THE Action_Bar SHALL enable the "Finalizar orden" button
5. WHILE the order status is IN_REPAIR (4) AND any Order_Issue item has status other than RESOLVED, THE Action_Bar SHALL disable the "Finalizar orden" button and display a tooltip with the text "Resuelve todas las fallas para completar"
6. WHEN the technician clicks "Finalizar orden" while enabled, THE Order_Status_Workflow SHALL open the Confirmation_Modal to transition to COMPLETED (5)
7. WHILE the order status is IN_REPAIR (4), THE Action_Bar SHALL only display the "Esperando repuestos" and "Finalizar orden" buttons as enabled for the assigned technician, and hide them for other users

### Requirement 6: Contextual Action Bar for WAITING_PARTS Status

**User Story:** As a technician, I want to see a "Continuar reparación" button when waiting for parts, so that I can resume the repair once parts arrive.

#### Acceptance Criteria

1. WHILE the order status is WAITING_PARTS (8), THE Action_Bar SHALL display a "Continuar reparación" button with variant="primary"
2. WHEN the technician clicks "Continuar reparación", THE Order_Status_Workflow SHALL open the Confirmation_Modal to transition to IN_REPAIR (4)
3. WHILE the order status is WAITING_PARTS (8), THE Action_Bar SHALL display the notes text from the most recent status transition log entry where the status changed to WAITING_PARTS, rendered inside a highlighted info card with a purple accent
4. WHILE the order status is WAITING_PARTS (8), THE Action_Bar SHALL enable the "Continuar reparación" button only for the assigned technician
5. WHILE the order status is WAITING_PARTS (8) AND the current user is not the assigned technician, THE Action_Bar SHALL display the "Continuar reparación" button in a disabled state
6. IF the notes text from the transition log exceeds 300 characters, THEN THE Action_Bar SHALL truncate the displayed text at 300 characters with an ellipsis indicator

### Requirement 7: Contextual Action Bar for COMPLETED Status

**User Story:** As an administrator, I want to see a "Marcar como entregado" button when the order is completed, so that I can record the device delivery to the customer.

#### Acceptance Criteria

1. WHILE the order status is COMPLETED (5), THE Action_Bar SHALL display a "Marcar como entregado" button using the "success" variant
2. WHEN the administrator clicks "Marcar como entregado", THE Order_Status_Workflow SHALL open the Confirmation_Modal to transition to DELIVERED (6)
3. WHILE the order status is COMPLETED (5), THE Action_Bar SHALL enable the "Marcar como entregado" button only when the current user's active role name in the auth store matches "Administrator" or "Receptionist"
4. IF the current user's active role does not match "Administrator" or "Receptionist" while the order status is COMPLETED (5), THEN THE Action_Bar SHALL hide the "Marcar como entregado" button

### Requirement 8: Terminal Status Display

**User Story:** As a user, I want to see a clear indicator when an order is delivered or cancelled, so that I know no further actions are available.

#### Acceptance Criteria

1. WHILE the order status is DELIVERED (6), THE Action_Bar SHALL display an "Entregada" Status_Badge using the "success" variant and SHALL NOT render any action buttons
2. WHILE the order status is CANCELLED (7), THE Action_Bar SHALL display a "Cancelada" Status_Badge using the "danger" variant and SHALL NOT render any action buttons
3. WHILE the order status is DELIVERED (6) or CANCELLED (7), THE Action_Bar SHALL display a text message indicating that the order lifecycle is complete and no further transitions are available

### Requirement 9: Cancel Order Action

**User Story:** As an administrator, I want to cancel an order from any eligible state, so that I can handle orders that cannot be completed.

#### Acceptance Criteria

1. WHILE the order status is ASSIGNED (2), DIAGNOSING (3), IN_REPAIR (4), or WAITING_PARTS (8), THE Action_Bar SHALL display a "Cancelar orden" button
2. WHILE the order status is PENDING (1), COMPLETED (5), DELIVERED (6), or CANCELLED (7), THE Action_Bar SHALL NOT display a "Cancelar orden" button
3. WHEN the administrator clicks "Cancelar orden", THE Order_Status_Workflow SHALL open the Confirmation_Modal with a destructive/warning visual style to transition to CANCELLED (7)
4. THE Action_Bar SHALL only enable the "Cancelar orden" button for users with Administrator or Receptionist role
5. THE Action_Bar SHALL render the "Cancelar orden" button with variant="danger" and visually separated from the primary action buttons in the bar

### Requirement 10: Confirmation Modal

**User Story:** As a user, I want to confirm status changes before they are executed, so that I can avoid accidental transitions and provide context notes.

#### Acceptance Criteria

1. WHEN a status transition is initiated, THE Confirmation_Modal SHALL display the current state name and the target state name in Spanish as the modal title context (e.g., "De: Pendiente → A: En diagnóstico")
2. THE Confirmation_Modal SHALL display a notes TextArea field with a maximum length of 500 characters for the user to provide context
3. WHILE the target status is WAITING_PARTS (8), THE Confirmation_Modal SHALL require the notes field to contain at least 1 non-whitespace character before enabling the "Confirmar" button
4. IF the target status is WAITING_PARTS (8) AND the user clicks "Confirmar" with an empty or whitespace-only notes field, THEN THE Confirmation_Modal SHALL display a validation error message in Spanish below the notes field indicating that notes are required
5. WHILE the target status is any status other than WAITING_PARTS, THE Confirmation_Modal SHALL allow the notes field to remain empty
6. THE Confirmation_Modal SHALL display a "Confirmar" button and a "Cancelar" button
7. WHEN the user clicks "Cancelar" or presses the Escape key or clicks the modal overlay, THE Confirmation_Modal SHALL close without executing any status transition
8. WHEN the user clicks "Confirmar" with valid input, THE Confirmation_Modal SHALL call the PUT /orders/update-status/:order_code endpoint with the target status number and optional notes
9. WHEN the API call succeeds, THE Order_Status_Workflow SHALL close the modal, show a success toast notification, and refresh the order data using RTK_Query cache invalidation
10. IF the API call fails, THEN THE Confirmation_Modal SHALL display the backend error message to the user via an error toast notification
11. WHILE the API call is in progress, THE Confirmation_Modal SHALL disable the "Confirmar" button and show a loading indicator on the button

### Requirement 11: Permission-Based UI Control

**User Story:** As a system administrator, I want the UI to enforce role-based access to status actions, so that only authorized users can perform transitions.

#### Acceptance Criteria

1. IF the current user's ID matches the order's assigned_technician_id, THEN THE Action_Bar SHALL enable the technician-specific action buttons ("Iniciar diagnóstico", "Diagnóstico completado", "Esperando repuestos", "Continuar reparación")
2. IF the current user's ID does not match the order's assigned_technician_id, THEN THE Action_Bar SHALL display the technician-specific action buttons as disabled with a visual indication that the user lacks permission
3. IF the current user has the Administrator or Receptionist role, THEN THE Action_Bar SHALL enable the admin-specific action buttons ("Marcar como entregado", "Cancelar orden")
4. IF the current user does not have the Administrator or Receptionist role, THEN THE Action_Bar SHALL display the admin-specific action buttons as disabled with a visual indication that the user lacks permission
5. IF the order has no assigned technician, THEN THE Action_Bar SHALL display all technician-specific action buttons as disabled
6. THE Order_Status_Workflow SHALL read the current user identity and role from the auth store and the assigned technician from the order data on each render, so that permission state reflects changes without requiring a page reload

### Requirement 12: API Integration and Data Refresh

**User Story:** As a developer, I want the status workflow to integrate with the existing RTK Query setup, so that data stays consistent after transitions.

#### Acceptance Criteria

1. THE Order_Status_Workflow SHALL define an updateOrderStatus mutation endpoint in the orders RTK_Query API using the PUT /orders/update-status/:order_code endpoint, accepting `{ orderCode: string, status: number, notes?: string }` as the mutation argument
2. WHEN the updateOrderStatus mutation succeeds, THE Order_Status_Workflow SHALL invalidate the cache tag `{ type: 'Order', id: order_code }` to trigger a refetch of the specific order detail
3. THE Order_Status_Workflow SHALL send the request body as `{ status: number, notes?: string }` where notes has a maximum length of 500 characters, matching the backend contract
4. THE Order_Status_Workflow SHALL use the existing `credentials: 'include'` configuration from the baseApi for authentication
5. IF the updateOrderStatus mutation fails, THEN THE Order_Status_Workflow SHALL return the RTK Query error object without modifying cached order data, allowing the calling component to handle the error presentation
