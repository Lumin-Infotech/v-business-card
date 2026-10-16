# Quick Start: CardPreviewEditor Component

## 3-Minute Setup

### Step 1: Import the Component
```typescript
// In create.tsx or edit.tsx
import { CardPreviewEditor } from '@/components/card-preview-editor';
```

### Step 2: Update Container Width
```typescript
// Line ~155 in create.tsx
<div className="max-w-7xl mx-auto">  {/* Changed from max-w-5xl */}
```

### Step 3: Add the Component
Inside your form layout, add:
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

### Step 4: Layout (Optional)
For side-by-side layout:
```typescript
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2">
        {/* Your form here */}
    </div>
    <div className="lg:col-span-1">
        <div className="sticky top-8">
            <CardPreviewEditor {...props} />
        </div>
    </div>
</div>
```

## What You Get

✅ Real-time preview  
✅ Mobile/Desktop toggle  
✅ All 5 themes supported  
✅ Dark mode included  
✅ No additional styling needed  
✅ No external dependencies  
✅ TypeScript ready  

## Component Anatomy
```
CardPreviewEditor
├── Header
│   ├── "Live Preview" title
│   └── Toggle buttons
│       ├── Desktop button
│       └── Mobile button
├── Preview Frame
│   ├── Desktop view (100% width)
│   └── Mobile view (375px, phone frame)
└── Status Info
    └── Preview state message
```

## Form Data Mapping
```
Form Field          → Component Prop
data.full_name      → fullName
data.job_title      → jobTitle
data.company_name   → company
data.email          → email
data.phone          → phone
data.address        → address
data.city           → city
data.website        → website
data.short_bio      → shortBio
data.theme          → theme
data.primary_color      → primaryColor
data.secondary_color    → secondaryColor
data.accent_color       → accentColor
data.background_color   → backgroundColor
data.font_family    → fontFamily
```

## Common Layouts

### Layout 1: Sidebar (Recommended)
```
┌─────────────────────────────────────┐
│ Create New Business Card            │
├────────────────────┬────────────────┤
│                    │                │
│   Form Fields      │   Live Preview │
│   (2 columns)      │   (Sticky)     │
│                    │                │
│                    │                │
└────────────────────┴────────────────┘
```

### Layout 2: Below Form
```
┌──────────────────────────────────────┐
│ Create New Business Card             │
├──────────────────────────────────────┤
│         Form Sections                │
├──────────────────────────────────────┤
│         Live Preview                 │
│    (Mobile/Desktop Toggle)           │
└──────────────────────────────────────┘
```

## Testing Checklist
- [ ] Component renders without errors
- [ ] Live preview updates as you type
- [ ] Desktop view shows full width
- [ ] Mobile view shows 375px frame
- [ ] Theme changes apply instantly
- [ ] Color changes update preview
- [ ] Empty fields don't cause errors
- [ ] Dark mode works
- [ ] Responsive on mobile devices

## Pro Tips
1. Use sticky positioning for sidebar layout
2. Test on real mobile devices
3. Check dark mode appearance
4. Verify all 5 themes look good
5. Test with long names/addresses
6. Use max-width: 7xl for main container

## File Reference
- **Component**: `resources/js/components/card-preview-editor.tsx`
- **Guides**: See `CARD_PREVIEW_EDITOR_INTEGRATION.md`
- **Full Details**: See `CARD_PREVIEW_EDITOR_FEATURE_SUMMARY.md`
- **Code Example**: See `INTEGRATION_EXAMPLE_CREATE_PAGE.md`

## Need Help?
- Check the integration guides in the docs folder
- Review the component props interface
- Look at the CardPreview component for reference
- Test with sample data first
