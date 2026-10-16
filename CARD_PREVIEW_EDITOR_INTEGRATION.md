# Card Preview Editor Component Integration Guide

## Overview
The `CardPreviewEditor` component provides a real-time live preview of the business card that updates instantly as users modify form fields.

## Component Location
- **File:** `resources/js/components/card-preview-editor.tsx`
- **Export:** Named export `CardPreviewEditor`
- **Props Interface:** `CardPreviewEditorProps`

## Features
✅ Real-time updates as form values change  
✅ Mobile/Desktop preview toggle (375px mobile, full-width desktop)  
✅ Support for all 5 themes (corporate, gradient, minimal, dark, bold)  
✅ Dynamic color preview (primary, secondary, accent)  
✅ Font family support (sans, serif, mono)  
✅ Mobile device frame with notch for immersive preview  
✅ Dark mode support  
✅ Graceful empty field handling with placeholder text  
✅ Status indicator showing current preview state  

## Integration Steps

### 1. Import the Component
In `create.tsx` or `edit.tsx`, add to imports:
```typescript
import { CardPreviewEditor } from '@/components/card-preview-editor';
```

### 2. Add to Form Layout
The component works best in a 2-column layout. Restructure the form container:

**Option A: Side-by-Side Layout**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  {/* Form column - takes 2 columns */}
  <div className="lg:col-span-2">
    <form onSubmit={submit} className="space-y-8">
      {/* All existing form sections */}
    </form>
  </div>
  
  {/* Preview column - takes 1 column, sticky on desktop */}
  <div className="lg:col-span-1">
    <div className="sticky top-8">
      <CardPreviewEditor
        fullName={data.full_name}
        jobTitle={data.job_title}
        company={data.company_name}
        email={data.email}
        phone={data.phone}
        address={data.address}
        city={data.city}
        website={data.website}
        shortBio={data.short_bio}
        theme={data.theme}
        primaryColor={data.primary_color}
        secondaryColor={data.secondary_color}
        accentColor={data.accent_color}
        backgroundColor={data.background_color}
        fontFamily={data.font_family}
      />
    </div>
  </div>
</div>
```

**Option B: Below Form**
```tsx
<form onSubmit={submit} className="space-y-8">
  {/* All existing form sections */}
</form>

<div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
  <CardPreviewEditor
    fullName={data.full_name}
    jobTitle={data.job_title}
    company={data.company_name}
    email={data.email}
    phone={data.phone}
    address={data.address}
    city={data.city}
    website={data.website}
    shortBio={data.short_bio}
    theme={data.theme}
    primaryColor={data.primary_color}
    secondaryColor={data.secondary_color}
    accentColor={data.accent_color}
    backgroundColor={data.background_color}
    fontFamily={data.font_family}
  />
</div>
```

### 3. Update Container Width
Change the max-width constraint to accommodate the new layout:
```tsx
// From:
<div className="max-w-5xl mx-auto">

// To (for 2-column layout):
<div className="max-w-7xl mx-auto">
```

## Props Documentation

| Prop | Type | Required | Notes |
|------|------|----------|-------|
| `fullName` | string | ✓ | Display name (shows placeholder if empty) |
| `jobTitle` | string | - | Job position |
| `company` | string | - | Company name |
| `email` | string | - | Email address |
| `phone` | string | - | Phone number |
| `address` | string | - | Street address |
| `city` | string | - | City name |
| `website` | string | - | Website URL |
| `shortBio` | string | - | Biography text |
| `theme` | string | ✓ | One of: corporate, gradient, minimal, dark, bold |
| `primaryColor` | string | ✓ | Hex color code (e.g., #4F46E5) |
| `secondaryColor` | string | ✓ | Hex color code |
| `accentColor` | string | ✓ | Hex color code |
| `backgroundColor` | string | - | Optional background color |
| `fontFamily` | string | ✓ | One of: sans, serif, mono |

## Real-time Updates
The component automatically updates when any prop changes. This means:
- Changes in form fields instantly reflect in the preview
- No debounce or delay needed
- State updates are immediate

## Empty Field Handling
- Empty `fullName` shows "Your Name" placeholder
- Empty contact fields (email, phone) are hidden from preview
- Empty company/job title are hidden
- Partial form submission is previewed as-is

## Mobile Preview Features
- Shows a realistic device frame with notch
- Maintains aspect ratio (375px width)
- Perfect for testing responsive design
- Dark mode colors applied to frame background

## Examples

### Create Card Page
See `create.tsx` for full implementation example

### Edit Card Page
See `edit.tsx` - same props structure, but use existing card data

## Styling Notes
- Uses existing Tailwind/Shadcn classes
- Respects dark mode automatically
- No additional CSS required
- Sticky positioning optional (removes on mobile)

## Performance
- No performance impact (purely presentational)
- Updates via React re-renders only
- No external API calls
- Works with FileReader for image previews (if needed)
