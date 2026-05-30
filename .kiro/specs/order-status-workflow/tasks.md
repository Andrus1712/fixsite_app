# Implementation Plan: Order Status Workflow

## Overview

This plan implements the order status workflow UI for the FixSite App. The implementation follows a dependency-driven order: foundational constants and types first, then API endpoints, then hooks, then presentational components, then composite components, and finally integration into the existing order detail page.

## Tasks

- [x] 1. Set up status configuration and utility functions
  - [x] 1.1 Create ORDER_STATUS_CONFIG constant and utility functions
    - Create file `src/features/orders/constants/orderStatusConfig.ts`
    - Define `StatusConfig` interface with `value`, `label`, and `color` fields
    - Define `ORDER_STATUS_CONFIG` Record<number, StatusConfig> mapping all 8 statuses
    - Implement `getStatusConfig(status: number): StatusConfig` that returns config or fallback `{ label: "Desconocido", color: "gray400" }`
    - Implement `getActionsForStatus(status: number): string[]` returning the correct button labels per status
    - Implement `truncateNotes(text: string, limit?: number): string` that truncates at 300 chars with "…"
    - Implement `validateTransitionNotes(targetStatus: number, notes: string): boolean` for mandatory notes validation
    - Export all from an `index.ts` barrel file
    - _Requirements: 1.1–1.11, 6.6, 10.3–10.5_

  - [ ]* 1.2 Write property tests for status configuration (Property 1)
    - **Property 1: Status configuration mapping is total and correct**
    - Use fast-check to generate arbitrary integers, verify `getStatusConfig` returns correct config for 1–8 and fallback for all others
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.11, 10.1**

  - [ ]* 1.3 Write property test for notes truncation (Property 6)
    - **Property 6: Notes truncation preserves content up to limit**
    - Use fast-check to generate arbitrary strings (0–1000 chars), verify truncation behavior
    - **Validates: Requirements 6.6**

  - [ ]* 1.4 Write property test for notes validation (Property 7)
    - **Property 7: Notes validation enforces mandatory notes for WAITING_PARTS**
    - Use fast-check to generate `{ targetStatus, notes }` pairs, verify validation logic
    - **Validates: Requirements 10.3, 10.4, 10.5**

  - [ ]* 1.5 Write property test for action set mapping (Property 3)
    - **Property 3: Status-to-buttons mapping produces the correct action set**
    - Use fast-check to generate valid status values (1–8), verify `getActionsForStatus` returns correct button set including cancel logic
    - **Validates: Requirements 3.1, 4.1, 5.1, 5.3, 6.1, 7.1, 8.1, 8.2, 9.1, 9.2**

- [x] 2. Add RTK Query endpoints
  - [x] 2.1 Add updateOrderStatus mutation and getOrderLogEvents query to orderApi
    - Add `UpdateOrderStatusArgs` interface: `{ orderCode: string; status: number; notes?: string }`
    - Add `OrderLogEvent` interface: `{ id: number; order_id: number; status: number; notes: string | null; created_at: string; created_by: number }`
    - Add `updateOrderStatus` mutation endpoint using `PUT /orders/update-status/${orderCode}` with body `{ status, notes? }`
    - Add `invalidatesTags` for `[{ type: 'Order', id: arg.orderCode }]`
    - Add `getOrderLogEvents` query endpoint using `GET /orders/${orderCode}/log-events`
    - Add `transformResponse` to extract `response.data` for log events
    - Add `providesTags` for `[{ type: 'Order', id: arg.orderCode }]`
    - Export generated hooks: `useUpdateOrderStatusMutation`, `useGetOrderLogEventsQuery`
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [x] 3. Implement useOrderPermissions hook
  - [x] 3.1 Create useOrderPermissions hook
    - Create file `src/features/orders/hooks/useOrderPermissions.ts`
    - Define `OrderPermissions` interface with `isTechnicianOwner`, `isAdmin`, `canPerformTechnicianAction`, `canPerformAdminAction`
    - Read user ID and current role from auth store (`authSlice`)
    - Compare user ID with `order.assigned_technician_id` for technician ownership
    - Check role name against "Administrator" and "Receptionist" for admin access
    - Return computed permissions object
    - _Requirements: 11.1–11.6, 3.3, 4.4, 5.7, 6.4, 6.5, 7.3, 7.4, 9.4_

  - [ ]* 3.2 Write property test for permission logic (Property 4)
    - **Property 4: Permission logic correctly determines action authorization**
    - Use fast-check to generate `{ userId, roleName, assignedTechnicianId }` tuples, verify permission computation
    - **Validates: Requirements 3.3, 4.4, 5.7, 6.4, 6.5, 7.3, 7.4, 9.4, 11.1–11.5**

- [x] 4. Checkpoint - Ensure foundational pieces compile
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement OrderStatusBadge component
  - [x] 5.1 Create OrderStatusBadge component
    - Create file `src/features/orders/components/OrderStatusBadge.tsx`
    - Define `OrderStatusBadgeProps` interface with `status: number` and optional `size: 'sm' | 'md'`
    - Use `getStatusConfig` to resolve label and color
    - Render a styled `<span>` with white text, theme-mapped background color, and `border-radius: full`
    - Add `aria-label` with the status text for accessibility
    - Use Styled Components with theme variables for all colors
    - _Requirements: 1.1–1.11_

  - [ ]* 5.2 Write unit tests for OrderStatusBadge
    - Test rendering for each known status (1–8) verifying label text
    - Test fallback for unrecognized status values
    - Test accessibility attributes
    - _Requirements: 1.1–1.11_

- [x] 6. Implement OrderStatusStepper component
  - [x] 6.1 Create OrderStatusStepper component
    - Create file `src/features/orders/components/OrderStatusStepper.tsx`
    - Define `OrderStatusStepperProps` with `order: WorkOrder`
    - Use `useGetOrderLogEventsQuery` to fetch transition history
    - Display normal flow steps: PENDING → ASSIGNED → DIAGNOSING → IN_REPAIR → COMPLETED → DELIVERED
    - Classify steps as completed (success color), active (primary color), or pending (textMuted color)
    - Format transition dates using `date-fns` `format(date, "dd/MM/yyyy HH:mm")`
    - Render branching states (WAITING_PARTS, CANCELLED) as secondary indicators
    - Handle API failure gracefully: show only current status as active
    - Use Styled Components with theme variables for all colors and spacing
    - Add `aria-current="step"` on the active step
    - _Requirements: 2.1–2.9_

  - [ ]* 6.2 Write property test for step classification (Property 2)
    - **Property 2: Stepper step classification is consistent with order status**
    - Use fast-check to generate valid statuses in normal flow (1–6), verify classification logic
    - **Validates: Requirements 2.2, 2.3, 2.9**

  - [ ]* 6.3 Write unit tests for OrderStatusStepper
    - Test rendering with mock log events, verify step order and date formatting
    - Test branching state rendering for WAITING_PARTS
    - Test fallback when log events are empty
    - _Requirements: 2.1–2.9_

- [x] 7. Implement OrderStatusActions component
  - [x] 7.1 Create OrderStatusActions component
    - Create file `src/features/orders/components/OrderStatusActions.tsx`
    - Define `OrderStatusActionsProps` with `order: WorkOrder`
    - Use `useOrderPermissions(order)` for permission checks
    - Implement button rendering logic per status:
      - ASSIGNED (2): "Iniciar diagnóstico" button (primary), disabled if not owner or no technician
      - DIAGNOSING (3): "Diagnóstico completado" button + warning status banner
      - IN_REPAIR (4): "Esperando repuestos" (warning) + "Finalizar orden" (success) with issue gate
      - WAITING_PARTS (8): "Continuar reparación" (primary) + info card with notes
      - COMPLETED (5): "Marcar como entregado" (success), admin-only
      - DELIVERED (6) / CANCELLED (7): Terminal badge + message, no buttons
    - Show "Cancelar orden" (danger) for statuses 2, 3, 4, 8 (admin-only)
    - Manage local state `pendingTransition: { targetStatus: number } | null`
    - Render `ConfirmStatusChangeModal` when pendingTransition is set
    - Add tooltips on disabled buttons explaining why
    - _Requirements: 3.1–3.4, 4.1–4.4, 5.1–5.7, 6.1–6.6, 7.1–7.4, 8.1–8.3, 9.1–9.5, 11.1–11.6_

  - [ ]* 7.2 Write property test for issue resolution gate (Property 5)
    - **Property 5: Issue resolution gate enables "Finalizar" correctly**
    - Use fast-check to generate arrays of `{ status: 'PENDING' | 'RESOLVED' | 'REJECTED' }`, verify gate logic
    - **Validates: Requirements 5.4, 5.5**

  - [ ]* 7.3 Write unit tests for OrderStatusActions
    - Test correct buttons rendered for each status
    - Test disabled state when user lacks permission
    - Test cancel button visibility per status
    - Test terminal state rendering
    - _Requirements: 3.1–9.5_

- [x] 8. Implement ConfirmStatusChangeModal component
  - [x] 8.1 Create ConfirmStatusChangeModal component
    - Create file `src/features/orders/components/ConfirmStatusChangeModal.tsx`
    - Define `ConfirmStatusChangeModalProps` with `isOpen`, `onClose`, `orderCode`, `currentStatus`, `targetStatus`
    - Display title: "De: {currentLabel} → A: {targetLabel}" using `getStatusConfig`
    - Render TextArea for notes (maxLength 500)
    - Enforce mandatory notes (min 1 non-whitespace char) when target is WAITING_PARTS (8)
    - Show inline validation error in Spanish when notes are required but empty
    - Use `useUpdateOrderStatusMutation` for the API call
    - Disable "Confirmar" button and show loading during API call
    - On success: close modal, show success toast via `useToast`, cache invalidation handles refetch
    - On failure: show error toast with backend message
    - Close on "Cancelar" click, Escape key, or overlay click
    - Apply destructive/warning styling when target is CANCELLED (7)
    - Use shared `Modal` component as base, `Button`, `TextArea` from shared components
    - _Requirements: 10.1–10.11_

  - [ ]* 8.2 Write unit tests for ConfirmStatusChangeModal
    - Test modal title shows correct status labels
    - Test notes validation for WAITING_PARTS target
    - Test loading state disables confirm button
    - Test close behavior (cancel, escape, overlay)
    - _Requirements: 10.1–10.11_

- [x] 9. Checkpoint - Ensure all components compile and tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Integrate into order detail page
  - [x] 10.1 Wire OrderStatusBadge, OrderStatusStepper, and OrderStatusActions into the existing order detail page
    - Import and render `OrderStatusBadge` in the order header area
    - Import and render `OrderStatusStepper` below the order header
    - Import and render `OrderStatusActions` in the appropriate action section
    - Pass the `order` object from the existing `useGetOrdersByCodeQuery` result
    - Ensure components render conditionally when order data is available
    - _Requirements: 1.1, 2.1, 3.1, 11.6, 12.4_

  - [ ]* 10.2 Write integration tests for the full status transition flow
    - Mock API endpoints, mount OrderStatusActions
    - Click action button → verify modal opens
    - Confirm → verify API call with correct payload
    - Verify success toast and cache invalidation
    - _Requirements: 10.8, 10.9, 12.1, 12.2_

- [x] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- All components use Styled Components with theme variables (NOT Tailwind CSS)
- fast-check is used for property-based testing
- date-fns is used for date formatting in the stepper

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "2.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.4", "1.5", "3.1"] },
    { "id": 2, "tasks": ["3.2", "5.1"] },
    { "id": 3, "tasks": ["5.2", "6.1"] },
    { "id": 4, "tasks": ["6.2", "6.3", "7.1"] },
    { "id": 5, "tasks": ["7.2", "7.3", "8.1"] },
    { "id": 6, "tasks": ["8.2", "10.1"] },
    { "id": 7, "tasks": ["10.2"] }
  ]
}
```
