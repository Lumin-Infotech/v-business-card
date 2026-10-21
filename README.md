# Virtual Business Card Management System

**A modern, production-ready SaaS application for creating, managing, and sharing professional virtual business cards.**

[![Tests](https://img.shields.io/badge/tests-74%2F74-brightgreen)](./tests)
[![Build](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Laravel](https://img.shields.io/badge/laravel-12-red)]()
[![React](https://img.shields.io/badge/react-19-blue)]()

## Features

✨ **Core Functionality**
- Create and manage unlimited virtual business cards
- 5 professional predefined themes with locked design settings
- Responsive design for all devices
- Slug-based public URLs (e.g., yoursite.com/john-doe)
- Draft and published status control
- Auto-generated slugs from card names

🎨 **Theme System**
- Visual card-based theme selection
- 5 professionally designed themes
- Locked design colors and fonts (no customization)
- Editable theme selection on create and edit
- Live preview of selected theme

🔐 **Security & Administration**
- Role-based access control (Admin/Editor)
- User management with strong password requirements
- Active/inactive user status
- Email verification support
- Secure design enforcement (5-layer protection)

📊 **Analytics & Tracking**
- Track page views and QR scans
- IP masking for privacy compliance
- Event-based analytics dashboard
- Daily statistics

🔗 **Export & Sharing**
- QR code generation
- vCard (.vcf) export
- Social media integration ready

## Quick Start

### Prerequisites
- PHP 8.2+
- Node.js 18+
- Composer
- MySQL 8.0+ or SQLite

### Installation

```bash
# Install dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Database
php artisan migrate
php artisan db:seed

# Build
npm run build

# Start
php artisan serve
```

Access: http://localhost:8000
Default: admin@example.com / password

## Technology Stack

- Backend: Laravel 12 + PHP 8.2
- Frontend: React 19 + Inertia.js
- Styling: Tailwind CSS v4
- Components: Radix UI
- Database: MySQL + Eloquent ORM
- Testing: Pest (74 tests)

## Project Structure

```
app/ - Controllers, Models, Services
resources/ - React pages and components
database/ - Migrations, Seeds, Factories
tests/ - Feature tests (74 tests passing)
```

## Testing

```bash
php artisan test --compact
# Result: 74/74 PASS ✅
```

## Development

```bash
npm run dev      # Hot reload
npm run build    # Production build
```

## Admin Dashboard

- **/admin/users** - Manage system users
- **/admin/cards** - Create/edit business cards
- **/admin/analytics** - View engagement metrics

## Configuration

Edit `.env` for database, app URL, and mail settings.

## Security

✅ CSRF protection
✅ SQL injection prevention (Eloquent ORM)
✅ XSS protection (React escaping)
✅ Password hashing with bcrypt
✅ Design field protection (5-layer security)

## Status

✅ **Production Ready**

All features implemented and tested:
- User management ✅
- Business card CRUD ✅
- Theme system with visual selection ✅
- Analytics tracking ✅
- Public card display ✅
- Admin dashboard ✅

## Documentation

- **DEPLOYMENT_GUIDE.md** - Production deployment
- **API_DOCUMENTATION.md** - REST API reference
- **ProjectPlan.md** - Original requirements

## License

MIT License - see LICENSE file
