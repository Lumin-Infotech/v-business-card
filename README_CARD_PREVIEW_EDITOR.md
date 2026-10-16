# CardPreviewEditor Component - Complete Documentation

## 📋 Overview
A comprehensive, production-ready React component that provides real-time live preview of business cards as users fill out the creation/editing form. Updates instantly with all form changes.

## 📁 File Location
```
resources/js/components/card-preview-editor.tsx
```

## 🚀 Quick Start (3 Steps)

### 1. Import
```typescript
import { CardPreviewEditor } from '@/components/card-preview-editor';
```

### 2. Add to Form
```typescript
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
```

### 3. (Optional) Wrap in Layout
```typescript
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2">Form</div>
    <div className="lg:col-span-1 sticky top-8"><CardPreviewEditor /></div>
</div>
```

## ✨ Key Features
- ✅ Real-time updates (zero delay)
- ✅ Mobile/Desktop toggle (375px vs full-width)
- ✅ All 5 themes supported
- ✅ Dynamic color preview
- ✅ Font family support
- ✅ Dark mode included
- ✅ Graceful empty field handling
- ✅ TypeScript support
- ✅ No external dependencies (beyond existing)
- ✅ Responsive design

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `QUICK_START_CARD_PREVIEW.md` | 3-minute setup guide |
| `CARD_PREVIEW_EDITOR_INTEGRATION.md` | Detailed integration steps |
| `INTEGRATION_EXAMPLE_CREATE_PAGE.md` | Code example for create.tsx |
| `CARD_PREVIEW_EDITOR_FEATURE_SUMMARY.md` | Complete feature list |
| `CARD_PREVIEW_ADVANCED_CUSTOMIZATION.md` | Optional enhancements |
| `README_CARD_PREVIEW_EDITOR.md` | This file |

## 🎨 Features Breakdown

### Real-Time Updates
- Zero delay between form changes and preview
- Reactive props update preview instantly
- Perfect for instant gratification UX

### Dual Preview Modes
- **Desktop**: Full-width card preview
- **Mobile**: Realistic 375px phone frame with notch
- Toggle buttons to switch between views

### Theme Support (All 5)
- Corporate: Professional white card
- Gradient: Modern color gradient background
- Minimal: Elegant whitespace design
- Dark: Premium dark theme
- Bold: Creative expressive design

### Color Customization
- Primary color (headings)
- Secondary color (gradients/accents)
- Accent color (icons/details)
- Background color (optional)
- Real-time color preview

### Font Support
- Sans: Modern sans-serif (default)
- Serif: Traditional serif
- Mono: Monospace font

### Empty Field Handling
- Missing fullName shows "Your Name"
- Optional fields hide when empty
- No errors with incomplete forms
- Shows exactly what will be visible

### Dark Mode
- Automatic light/dark theme support
- Proper color adaptation
- Frame styling respects theme

## 🔧 Props Reference

```typescript
interface CardPreviewEditorProps {
    fullName: string;           // Required
    jobTitle?: string;          // Optional
    company?: string;           // Optional
    email?: string;            // Optional
    phone?: string;            // Optional
    address?: string;          // Optional
    city?: string;             // Optional
    website?: string;          // Optional
    shortBio?: string;         // Optional
    profilePhoto?: string | null; // Optional
    coverImage?: string | null;   // Optional
    theme: string;             // Required
    primaryColor: string;      // Required (hex)
    secondaryColor: string;    // Required (hex)
    accentColor: string;       // Required (hex)
    backgroundColor?: string;  // Optional (hex)
    fontFamily: string;        // Required
}
```

## 🎯 Integration Scenarios

### Scenario 1: Create Card Page
Add CardPreviewEditor to the create form for real-time feedback while filling in details.

### Scenario 2: Edit Card Page
Use existing card data to populate the preview during editing.

### Scenario 3: Responsive Form
Include in 2-column layout with form on left, preview on right (sticky).

## 📊 Component Architecture
```
CardPreviewEditor
├── State: isMobileView (boolean)
├── Header
│   ├── Title
│   └── Toggle buttons (Desktop/Mobile)
├── Preview Container
│   ├── Gradient background
│   ├── Desktop view OR Mobile frame
│   └── CardPreview component
└── Status indicator
```

## 🧪 Testing Checklist
- [ ] Component renders without errors
- [ ] Updates as form changes
- [ ] Desktop view shows full width
- [ ] Mobile view shows 375px frame
- [ ] Theme switching works
- [ ] Color changes apply immediately
- [ ] Dark mode displays correctly
- [ ] Empty fields handled gracefully
- [ ] Responsive on all device sizes

## 🎓 Implementation Order
1. Read QUICK_START_CARD_PREVIEW.md
2. Review INTEGRATION_EXAMPLE_CREATE_PAGE.md
3. Implement in create.tsx
4. Implement in edit.tsx
5. Test thoroughly
6. Deploy

## 📝 Notes
- Component is purely presentational
- No business logic or API calls
- Reuses existing CardPreview component
- No additional dependencies needed
- Works with existing form state management
- Fully TypeScript compatible

## 🤝 Integrations
- Uses: `CardPreview` component
- Uses: Shadcn/ui `Button`
- Uses: Lucide React icons
- Uses: React hooks (useState)
- Uses: Tailwind CSS

## 📱 Responsive Behavior
- Mobile (< lg): Preview below form
- Tablet (md-lg): Adjusted layout
- Desktop (lg+): Sticky sidebar with preview
- All breakpoints work seamlessly

## 🔍 TypeScript Support
- Full type safety with CardPreviewEditorProps
- No `any` types
- Compatible with strict mode
- Proper interface exports

## 📈 Performance
- Lightweight (~130 lines)
- No external API calls
- No computations or heavy processing
- Fast re-renders from state changes
- Minimal bundle impact

## 🎁 What's Included
- ✅ Production-ready component
- ✅ TypeScript interfaces
- ✅ Tailwind styling
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Complete documentation
- ✅ Integration examples
- ✅ Advanced customization guide

## 🚀 Ready to Use
This component is fully featured and ready for immediate integration. No additional setup or dependencies required beyond what's already in the project.

**Start with**: `QUICK_START_CARD_PREVIEW.md`
