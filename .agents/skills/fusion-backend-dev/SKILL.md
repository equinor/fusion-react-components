---
name: fusion-backend-dev
description: 'Guides consumption and understanding of Fusion backend services, APIs, and patterns for frontend/client developers, integrators, and architects. Shows reference implementations, explains architectural decisions, and clarifies contracts. USE FOR: understanding Fusion backend APIs, learning implementation patterns, exploring reference code, choosing the right integration point, and understanding authorization/validation/async patterns. DO NOT USE FOR: modifying backend services, creating new endpoints, database changes, or backend-specific development (use fusion-services-develop or backend service repo instead).'
license: MIT
compatibility: Works best with Fusion MCP. Works best with mcp_fusion_search_backend_code for reference code discovery. Frontend/client developers should also install fusion-research for deeper architectural context.
metadata:
  version: "0.1.2"
  status: active
  owner: "@equinor/fusion-core"
  skills:
    - fusion-research
    - fusion-code-conventions
    - fusion-devtools
  tags:
    - fusion-backend
    - api-consumption
    - patterns
    - architecture
    - reference-implementation
    - csharp
  mcp:
    suggested:
      - mcp_fusion_search_backend_code
---

# Fusion Backend Consumption

## When to use

Use when needing to understand Fusion backend services, available APIs, integration patterns, or architectural decisions.

Typical triggers:
- "How do I call the People API?"
- "Show an example of how the authorization pattern works"
- "What's the contract for the Org service?"
- "How do services handle validation errors?"
- "What async/messaging patterns does Fusion use?"
- "Can I see a reference implementation of a CQRS handler?"
- "How do services integrate with external APIs?"
- "What authentication/authorization requirements do I need?"
- "Show how events flow through the system"
- "What's the pattern for cross-service calls?"
- "How should I structure my API client?"
- "Where should I call the Context API?"
- "What's the difference between a command and a query in Fusion?"

Implicit triggers:
- Building frontend/client app needing to understand backend contracts
- Integrating with Fusion APIs and need patterns
- Designing architecture needing backend best practices
- Learning from existing Fusion service implementations

## When not to use

- **Creating or modifying backend services** — use service-specific repo skill
- **Adding new endpoints or API operations** — backend development
- **Database schema changes or migrations** — backend development
- **Authorization requirement definitions** — backend development (this skill shows what exists, not new requirements)
- **Pure architecture discussions without code references** — use `fusion-research` or ADR-focused skills
- **Selecting between Fusion Framework alternatives** — use `fusion-research` or `fusion-app-react-dev`

## Required inputs

### Mandatory

- **What you're trying to do**: clear description of integration point, use case, or pattern
- **Your role/context**: building a frontend app? Integrating externally? Designing architecture?

### Conditional

- When comparing patterns: which two options you're deciding between
- When consuming an API: what operation/scenario (CRUD, async, real-time, etc.)
- When integrating: external system name and direction of flow (calling out vs being called)

## Instructions

### Step 1 — Clarify consumption context

Before searching for code, understand what you need:

1. **Integration point**: Calling a backend API? Reading event messages? Implementing a webhook? Integrating with external system?
2. **Your boundaries**: Frontend developer? Backend developer in another service? External integrator? Architect?
3. **Scope**: Single API contract? Full pattern? Reference implementation? Architectural tradeoffs?

Use `assets/follow-up-questions.md` if user intent is unclear.

### Step 2 — Search for reference implementation

Use `mcp_fusion_search_backend_code` to locate existing patterns:

1. Call with high-level intent: "How People service exposes authorization" or "Cross-service API integration patterns"
2. Start with `top: 3-5` results
3. Capture `metadata.repository`, `metadata.service`, `metadata.filePath`
4. Extract minimal code snippets showing the pattern (method signature, type contract, authorization check)
5. If results are unclear, refine once:
   - Add specific service name or interface
   - Narrow to specific layer (controller, handler, client interface)
   - Try a different phrase focusing on outcome rather than implementation details

### Step 3 — Explain the pattern

Use evidence from Step 2:

1. **State the pattern clearly**: What does the service do? What contract does it expose?
2. **Show the reference code**: Quote relevant snippet with file path and line range
3. **Explain the constraints**: Preconditions? Authorization? Error handling? Async behavior?
4. **Relate to your use case**: How to apply this pattern?
5. **Surface tradeoffs or alternatives** if they exist

### Step 4 — Verify completeness

Before ending, check:

- [ ] User understands the contract (inputs, outputs, errors)
- [ ] User sees a real code reference (not invented)
- [ ] User knows where the code lives (repository, service, file path)
- [ ] User knows prerequisites (authentication, configuration, dependencies)
- [ ] User has enough context to implement or integrate

If uncertainty remains, flag it explicitly.

## Reference guides

See `references/` for deeper pattern documentation:

- `api-contracts.md` — Fusion service API contracts and versioning
- `authorization-patterns.md` — Authentication, authorization requirements, role-based access
- `validation-patterns.md` — Input validation, error responses, business rules
- `async-patterns.md` — Events, service bus, domain notifications, eventual consistency
- `integration-patterns.md` — Cross-service calls, external APIs, webhook handling
- `cqrs-reference.md` — CQRS handlers, commands, queries, notifications structure

## Assets

- `assets/follow-up-questions.md` — Clarifying questions for ambiguous requests
- `references/integration-patterns.md` — Common integration scenarios and which patterns apply

## Safety & constraints

Never:
- Describe real backend API behavior as fact unless verifiable in retrieved source code or cited repo docs
- Claim a pattern exists when search returns no evidence
- Present illustrative pseudo-code as retrieved source code
- Suggest modifying a backend service — that's out of scope

Always:
- Label illustrative examples as examples/pseudo-code when explanatory rather than retrieved
- Capture and cite repository, file path, and line references for real code
- State which repository the pattern comes from
- Note when a pattern exists in one service but not others
- Offer to escalate to `fusion-services-develop` skill if user wants to implement changes
