# AI DEVELOPMENT PROMPT: Virtual Business Card Management System

**Agent:** AugmentCode  
**Model:** Haiku 4.5  
**Framework:** Laravel 12 + React Starter Kit  
**Objective:** Build a production-ready Virtual Business Card (V-Card) application using the existing boilerplate.

---

## 1. Project Overview

I already have a Laravel 12 boilerplate project using the React Starter Kit. Extend this existing project to build a modern, secure, responsive Virtual Business Card management application.

The application will allow administrators to create and manage multiple digital business cards. Every card must have its own unique, public URL generated using a slug.

Example public URLs:

- `https://example.com/john-doe`
- `https://example.com/abdul-quadir`
- `https://example.com/lumin-infotech`

Visitors can access these public cards without logging in. All card creation, editing, deletion, and administrative operations must require authentication and appropriate authorization.

This is an **admin-managed application, not a public registration platform**.

## 2. Mandatory Development Rules

Before writing code:

1. Inspect the existing project structure and understand the current Laravel 12 and React Starter Kit implementation.
2. Identify the existing frontend architecture, React setup, routing, authentication, middleware, UI components, CSS framework, and database configuration.
3. Review the existing `composer.json`, `package.json`, route files, models, migrations, and authentication components.
4. Reuse existing packages and components wherever practical.
5. Do not replace, recreate, or unnecessarily modify the existing boilerplate.
6. Do not upgrade framework or package versions unless absolutely necessary and explicitly justified.
7. Follow Laravel conventions, React best practices, and the existing project architecture.
8. Implement the application incrementally, completing and verifying each functional module before proceeding.
9. Do not generate the entire application in one enormous file or make unrelated changes.
10. Do not leave placeholder implementations, fake CRUD operations, dead buttons, or unfinished critical functionality.
11. Do not claim a feature is complete unless its implementation has been verified.
12. If an architectural decision is unclear, inspect the project and choose the simplest maintainable solution compatible with the existing stack.

First provide a concise implementation plan and list the existing project components you intend to reuse. Then begin implementation.

## 3. Application Architecture

Build the application with two distinct areas.

### A. Administrative application

The administrative interface must be authenticated and used for:

- Dashboard and statistics.
- Business card creation.
- Business card listing.
- Business card editing.
- Business card deletion.
- Business card preview.
- Theme selection and customization.
- User management.
- Profile and account management.
- Password changes.

### B. Public business cards

Public visitors must be able to access business cards using their unique slugs.

Examples:

- `/john-doe`
- `/lumin-infotech`
- `/jane-smith`

Public card pages must:

- Work without authentication.
- Display the business card using its selected theme.
- Support responsive desktop and mobile layouts.
- Display only published, active cards.
- Provide functional contact actions.
- Include social links when configured.
- Provide a vCard contact download.
- Include an optional QR code for the public card URL.

Public visitors must not be able to access the administrative dashboard or perform administrative operations.

Keep the existing Laravel application architecture. Use Laravel routes and the existing React integration rather than introducing an unnecessary separate frontend application or backend API.

## 4. Authentication and Access Control

Implement the following authentication requirements.

### Login

- The application root URL `/` must redirect unauthenticated visitors to the login page.
- Authenticated users visiting `/` should be redirected to the administrative dashboard.
- Use the existing Laravel Starter Kit authentication functionality.
- Keep login and logout functionality working.
- Ensure protected routes redirect unauthenticated users to login.
- Do not expose any public registration page or registration API.

### User management

Administrators must be able to create users from the admin panel.

Required functionality:

- List users.
- Create users.
- Edit user details.
- Activate or deactivate users.
- Reset or change passwords securely.
- Delete users where permitted.
- Validate email uniqueness.
- Hash passwords using Laravel's supported password hashing mechanism.

Do not allow an administrator to accidentally remove their own account or leave the application without an active administrator.

### Roles and permissions

Implement a straightforward role system suitable for the application:

- `admin`: Full access to administrative functionality.
- `editor`: Optional restricted administrative role, if practical.

If implementing multiple roles adds unnecessary complexity, implement an administrator-only system first and keep authorization extensible.

Enforce authorization on the server using middleware, policies, or gates. Hiding UI elements is not sufficient security.

### Default administrator seeder

Create a database seeder that provisions a default administrator.

Use environment variables for credentials:

- `ADMIN_NAME`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Provide safe development defaults only when appropriate for local development.

Requirements:

- Never hardcode production credentials.
- Hash passwords.
- Make the seeder idempotent.
- Do not overwrite an existing administrator's password every time the seeder runs.
- Document how to configure credentials in `.env`.
- Ensure the initial administrator can log in immediately after seeding.

Create any required roles, permissions, and administrator records in the correct seeding order.

## 5. Business Card Data Model

Create a maintainable database schema for business cards.

Suggested fields:

**Identity and publishing**
- `id`
- `name`
- `slug`
- `status` — draft or published
- `is_active`
- `published_at`, if useful

**Personal information**
- `full_name`
- `job_title`
- `company_name`
- `department`, optional
- `profile_photo`
- `cover_image`, optional
- `short_bio`
- `description`, optional

**Contact information**
- `email`
- `phone`
- `alternate_phone`, optional
- `whatsapp_number`, optional
- `website`, optional
- `address`, optional
- `city`, optional
- `state`, optional
- `country`, optional
- `postal_code`, optional

**Social media**
- LinkedIn URL
- Facebook URL
- Instagram URL
- X URL
- YouTube URL
- GitHub URL
- Additional configurable social links, if practical

**Design configuration**
- `theme`
- `primary_color`
- `secondary_color`
- `accent_color`
- `background_color`, if needed
- `font_family`, if supported
- `custom_settings` JSON field, if appropriate

**Ownership and timestamps**
- `created_by`
- `updated_by`, optional
- `created_at`
- `updated_at`

Adjust this schema to fit the existing application conventions.

Requirements:

1. Use a unique database index for `slug`.
2. Validate all user-provided data.
3. Generate a slug automatically from the card name or full name.
4. Allow administrators to edit the slug.
5. Check slug availability before saving.
6. Handle duplicate slugs gracefully.
7. Reserve application paths such as `login`, `logout`, `admin`, `dashboard`, `users`, `cards`, `settings`, and other system routes.
8. Never allow a public URL to expose an unpublished, inactive, or deleted card.
9. Use appropriate foreign keys, indexes, and deletion rules.
10. Store flexible theme configuration without allowing arbitrary executable code or unsafe CSS injection.

Create migrations, Eloquent models, relationships, factories where useful, and validation rules.

## 6. Business Card CRUD

Create a complete administrative interface for managing cards.

### Card listing

Display a modern table or responsive card grid with:

- Profile image.
- Full name.
- Company.
- Job title.
- Public slug or URL.
- Selected theme.
- Publication status.
- Creation date.
- Actions.

Actions should include:

- View preview.
- Open public card.
- Copy public URL.
- Edit.
- Duplicate, if practical.
- Publish or unpublish.
- Activate or deactivate.
- Delete.

Include:

- Search by name, company, or slug.
- Filtering by status and theme.
- Pagination.
- Sorting where useful.
- Empty states.
- Loading states.
- Confirmation dialogs for destructive actions.
- Clear success and error notifications.

### Create and edit card

Create a polished form divided into logical sections:

1. Personal information.
2. Company information.
3. Contact details.
4. Address.
5. Social media.
6. Appearance and themes.
7. Publishing settings.

Requirements:

- Use reusable React components.
- Show field-level validation errors.
- Preserve submitted values when validation fails.
- Validate on the server.
- Use sensible defaults.
- Allow administrators to save cards as drafts.
- Allow administrators to publish cards.
- Support image upload, validation, storage, and replacement.
- Show image previews before submission.
- Handle upload failures correctly.
- Allow slug editing with availability feedback.

Do not store uploaded images as arbitrary filesystem paths or trust client-provided filenames. Use Laravel's storage system.

## 7. Theme System and Live Preview

**This is a major feature and must be implemented properly.**

Create multiple visually distinct, professional business card themes. Do not create themes that differ only by changing a background color.

Implement at least these five themes:

### Theme 1: Corporate Classic

- White background.
- Navy blue accents.
- Clean typography.
- Professional profile layout.
- Structured company and contact information.
- Appropriate for consultants and corporate professionals.

### Theme 2: Modern Gradient

- Blue-to-purple gradients.
- Bold typography.
- Contemporary profile presentation.
- Rounded surfaces and subtle shadows.
- Appropriate for technology professionals and startups.

### Theme 3: Minimal Light

- White or warm-neutral background.
- Generous whitespace.
- Elegant typography.
- Fine borders and understated icons.
- Appropriate for executives and consultants.

### Theme 4: Dark Executive

- Deep charcoal or navy background.
- High-contrast typography.
- Restrained metallic or accent colors.
- Premium-looking profile presentation.
- Appropriate for senior professionals and executives.

### Theme 5: Creative Bold

- Expressive color blocks.
- Distinctive typography.
- Strong visual hierarchy.
- Modern layout for creative professionals and agencies.

### Theme selection experience

In the create and edit forms:

1. Display theme options as visual thumbnail cards.
2. Show each theme's name and a short description.
3. Allow the administrator to select a theme.
4. Display a live preview of the business card.
5. Update the preview immediately when theme selection changes.
6. Update the preview when profile information, colors, or supported settings change.
7. Clearly indicate the currently selected theme.
8. Preserve the selected theme when editing existing cards.
9. Ensure the saved public card uses the same configuration as the preview.

Use the actual theme components to render previews instead of maintaining unrelated, approximate preview markup.

The live preview should be responsive and work smoothly on desktop and mobile.

If practical, offer desktop and mobile preview modes.

### Theme customization

Provide a restrained set of customization controls:

- Primary color.
- Secondary color.
- Accent color.
- Optional background color.
- Supported font choices.

Create reusable theme components and centralized theme configuration. Do not duplicate the entire public card implementation for every theme.

Theme configuration must be validated and sanitized on the server.

## 8. Design System and Color Palette

Establish a consistent design system before implementing the UI.

Use the following palette as the application's default administrative design system.

| Token | Color | Purpose |
|---|---|---|
| Primary | `#4F46E5` | Primary actions and branding |
| Primary Hover | `#4338CA` | Hover states |
| Secondary | `#7C3AED` | Secondary brand accents |
| Accent | `#06B6D4` | Highlights and interactive accents |
| Background | `#F8FAFC` | Main application background |
| Surface | `#FFFFFF` | Cards, dialogs, and panels |
| Text Primary | `#0F172A` | Headings and primary text |
| Text Secondary | `#475569` | Secondary information |
| Border | `#E2E8F0` | Borders and dividers |
| Success | `#16A34A` | Successful operations |
| Warning | `#D97706` | Warnings |
| Danger | `#DC2626` | Destructive actions and errors |

Use these colors consistently through CSS variables or the existing styling system.

Design requirements:

- Modern SaaS-style interface.
- Clean spacing and typography.
- Consistent border radii.
- Subtle shadows.
- Responsive layouts.
- Accessible contrast.
- Clear visual hierarchy.
- Consistent buttons, forms, tables, badges, dialogs, and notifications.
- Proper focus indicators and keyboard navigation.
- Mobile-friendly administrative navigation.
- Consistent light-mode appearance.

Use the existing CSS framework and UI component library where available. Do not introduce a second design system unnecessarily.

Public card themes may use their own distinct palettes while remaining visually coherent.

## 9. Administrative Dashboard

Create a useful, polished dashboard with real database-backed statistics.

Display:

- Total business cards.
- Published cards.
- Draft cards.
- Inactive cards.
- Total users, where appropriate.
- Recently created cards.
- Recently updated cards.
- Quick actions for creating cards and managing users.

Include recent activity only if a real activity source is implemented.

Do not invent statistics or populate dashboard charts with fake data.

Ensure all dashboard queries respect authorization and avoid unnecessary database queries.

## 10. Public Business Card Page

Implement a public route that resolves cards by slug.

Example:

`GET /{slug}`

However, ensure this route does not conflict with existing authentication, administrative, health-check, or framework routes. Review all existing routes before implementing it.

The public page must display:

- Profile image.
- Full name.
- Job title.
- Company.
- Short biography.
- Phone.
- Email.
- Website.
- WhatsApp contact action, when configured.
- Social media icons and links.
- Address, when configured.
- QR code linking to the card.
- Download contact button.
- Share or copy-link action.

Requirements:

- Hide contact sections that have no data.
- Use accessible labels and recognizable icons.
- Use correct `tel:`, `mailto:`, and WhatsApp links.
- Validate external URLs and use safe link attributes.
- Ensure layouts work on mobile, tablet, and desktop.
- Optimize images and page loading.
- Include page titles and useful SEO metadata.
- Provide a sensible 404 page for unknown or unavailable cards.
- Return only published and active cards.
- Do not expose internal database IDs or administrative information unnecessarily.

Use the selected theme and saved color configuration to render the public page.

## 11. vCard Contact Download

Implement contact export using the standard `.vcf` vCard format.

The download should include the available supported information:

- Full name.
- Organization.
- Job title.
- Phone number.
- Email.
- Website.
- Address.
- Social profile URLs where supported.

Requirements:

- Generate a valid vCard file.
- Escape special characters correctly.
- Use UTF-8.
- Set appropriate download headers and filename.
- Do not include missing or private fields.
- Test the generated file using representative contact data.

The downloaded contact should be suitable for importing into common mobile and desktop contact applications.

## 12. QR Code Generation

Provide a QR code for every published business card.

Requirements:

- Encode the canonical public URL.
- Use HTTPS when the application is deployed behind HTTPS.
- Update the generated QR code if the slug changes.
- Allow the QR code to be downloaded as an image if practical.
- Do not expose administrative URLs in the QR code.
- Use an established, maintained QR code library compatible with the project.

Avoid unnecessary external QR services that expose card URLs to third parties.

## 13. Security Requirements

Implement production-conscious security measures.

- Use Laravel authentication and authorization.
- Protect all administrative routes.
- Do not expose public registration.
- Validate every write operation on the server.
- Prevent mass-assignment vulnerabilities.
- Enforce slug uniqueness at both validation and database levels.
- Validate uploaded file types, MIME types, and size.
- Restrict uploads to supported image formats.
- Prevent unsafe SVG or executable uploads unless safely processed.
- Prevent stored XSS through user-generated card content.
- Escape output appropriately in React.
- Validate external URLs and permitted protocols.
- Prevent open redirects.
- Apply CSRF protection to state-changing operations.
- Use rate limiting where appropriate.
- Avoid leaking sensitive details through exception messages.
- Use secure password handling.
- Do not commit secrets or production credentials.
- Use soft deletes only if they fit the data-retention requirements; otherwise implement safe permanent deletion with clear confirmation.
- Ensure private storage is used for files that should not be public.
- Keep public card data separate from administrative metadata.

Document any security limitations or configuration requirements.

## 14. Suggested Route Structure

Adapt the following to the existing Laravel route setup.

### Public routes

- `GET /` — redirect according to authentication status.
- `GET /{slug}` — render a published, active business card.
- A public contact download endpoint scoped to a valid published card, if necessary.

### Authentication routes

- Existing login and logout routes.
- No public registration route.
- No public user creation endpoint.

### Protected admin routes

- `GET /admin/dashboard`
- `GET /admin/cards`
- `GET /admin/cards/create`
- `POST /admin/cards`
- `GET /admin/cards/{card}/edit`
- `PUT /admin/cards/{card}`
- `DELETE /admin/cards/{card}`
- `GET /admin/users`
- `POST /admin/users`
- User update and deletion routes as required.

Use the existing Starter Kit conventions and route names when appropriate. These paths are architectural examples, not a requirement to duplicate existing authentication routes.

Ensure the public catch-all route is registered in the correct position and cannot intercept administrative or framework endpoints.

## 15. Code Quality and Maintainability

Follow these conventions:

### Laravel

- Use Eloquent models and relationships.
- Use form request classes for complex validation.
- Use policies or gates for authorization.
- Use service classes when they simplify meaningful business logic.
- Use transactions for multi-step database operations when necessary.
- Use database indexes appropriately.
- Use named routes and route model binding where appropriate.
- Avoid placing all business logic in controllers.
- Keep file storage and cleanup operations consistent.
- Follow existing naming conventions.

### React

- Build reusable functional components.
- Use the existing routing and server integration approach.
- Keep theme definitions centralized.
- Separate forms, previews, layout components, and public card rendering.
- Use the project's existing form-handling and validation libraries.
- Handle loading, empty, error, and success states.
- Avoid duplicating large components.
- Keep TypeScript types accurate if the project uses TypeScript.
- Follow the project's linting and formatting rules.

Do not add unnecessary packages. When a new package is needed, verify compatibility with Laravel 12, the installed PHP version, and the existing frontend toolchain.

## 16. Testing Requirements

Implement automated tests using the testing framework already configured in the project.

At minimum, verify the following scenarios.

### Authentication

- Unauthenticated users visiting `/` are redirected to login.
- Authenticated users visiting `/` are redirected to the dashboard.
- Login and logout work.
- Registration pages and endpoints are unavailable.
- Unauthenticated users cannot access administrative routes.
- Unauthorized users cannot manage users or cards.

### Business cards

- An administrator can create a card.
- An administrator can edit a card.
- An administrator can delete a card.
- Duplicate slugs are rejected.
- Slugs are generated and validated correctly.
- Reserved slugs cannot be used.
- Draft cards are not publicly accessible.
- Inactive cards are not publicly accessible.
- Published active cards are accessible without authentication.
- Unknown slugs return a 404 response.

### Themes

- All available themes can be selected.
- The selected theme persists after saving.
- Color settings are validated.
- The public page uses the saved theme.
- Theme previews reflect current form values.

### Users

- Administrators can create users.
- Passwords are hashed.
- Duplicate email addresses are rejected.
- Existing administrator credentials are not unintentionally overwritten by reseeding.
- Authorization rules prevent unauthorized user management.

### Contact and QR functionality

- vCard files are valid and include supported contact data.
- Contact fields are correctly escaped.
- QR codes encode the correct public URL.
- Slug changes produce the correct updated public URL and QR code.

### Uploads

- Valid images are accepted.
- Invalid file types are rejected.
- File-size limits are enforced.
- Replacing an image does not leave unnecessary orphaned files.

Run relevant tests and resolve failures introduced by your implementation.

## 17. Implementation Phases

Work through these phases sequentially.

**Phase 1 — Project inspection and planning**
- Inspect the boilerplate.
- Identify existing components and constraints.
- Present a concise implementation plan.
- Identify any architectural conflicts.

**Phase 2 — Database and authentication**
- Create the required migrations and models.
- Implement administrator seeding.
- Disable registration.
- Secure administrative access.
- Implement role and authorization rules.

**Phase 3 — Application shell and design system**
- Establish the design tokens.
- Implement the authenticated layout.
- Build navigation and reusable UI components.
- Create the dashboard.

**Phase 4 — Business card management**
- Implement listing, searching, filtering, pagination, creation, editing, deletion, and publication controls.
- Implement secure image handling.
- Validate all server-side operations.

**Phase 5 — Theme engine**
- Build all five themes.
- Implement theme selection.
- Implement live preview.
- Add supported color customization.
- Reuse the same rendering components for previews and public pages.

**Phase 6 — Public cards**
- Implement public slug resolution.
- Render published cards.
- Add responsive layouts.
- Add contact actions, social links, and SEO metadata.

**Phase 7 — QR codes and contact exports**
- Implement QR code generation and download.
- Implement vCard generation and download.
- Verify URL and contact-data correctness.

**Phase 8 — User management**
- Implement user CRUD.
- Add activation controls and password management.
- Verify administrator safeguards.

**Phase 9 — Testing and refinement**
- Run automated tests.
- Run the frontend build.
- Run linting and type checks where available.
- Fix errors and regressions.
- Test responsive layouts and accessibility.
- Verify the full authentication and card-publication workflow.

Do not skip a phase merely to produce more code quickly.

## 18. Definition of Done

The application is complete only when:

- The existing Laravel 12 boilerplate remains functional.
- The default administrator can log in after seeding.
- The home page redirects correctly.
- No public registration is available.
- Administrators can create and manage users.
- Administrators can create, edit, publish, unpublish, and delete cards.
- Each card has a unique public slug.
- Public cards work without authentication.
- Draft and inactive cards are not publicly accessible.
- Five distinct themes are implemented.
- Theme previews update live while editing.
- The selected theme and customization persist.
- Public cards are responsive and visually polished.
- QR codes point to the correct public URLs.
- vCard downloads contain valid contact data.
- Authorization and validation are enforced server-side.
- Automated tests pass.
- The production build completes successfully.
- Setup instructions and environment variables are documented.

## 19. Final Deliverables

At completion, provide:

1. Summary of implemented features.
2. Database migrations and model changes.
3. Route and middleware changes.
4. Authentication and authorization implementation.
5. List of new frontend components and theme files.
6. Packages added and reasons for adding them.
7. Seeder instructions and default administrator configuration.
8. Environment variables required.
9. Database migration and build commands.
10. Automated test results.
11. Any unresolved issues or limitations.

Start by inspecting the existing repository. Then implement the system phase by phase, preserving the existing Laravel 12 + React Starter Kit architecture and prioritizing correctness, security, maintainability, and modern UI quality.