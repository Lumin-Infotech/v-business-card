# Theme Selection UI Walkthrough

## Create Business Card Form - Theme Section

### Visual Grid of Selectable Theme Cards

```
┌─────────────────────────────────────────────────────────────────┐
│ Design & Theme                                                  │
│ Select a professional theme. Colors and fonts are predefined   │
│ for each theme.                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Corporate Clas. │  │ Modern Gradient │  │ Minimal Light   │
│ Professional    │  │ Contemp. vibrant│  │ Elegant minimalist
│ and clean       │  │                 │  │                 │
│  ■  ■  ■       │  │  ■  ■  ■       │  │  ■  ■  ■       │
│ #1F #3B #10    │  │ #3B #8B #EC    │  │ #1F #6B #93    │
│ (Selected)      │  │                 │  │                 │
│ ✓ ← Blue border │  │                 │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘

┌─────────────────┐  ┌─────────────────┐
│ Dark Executive  │  │ Creative Bold   │
│ Premium dark    │  │ Expressive bold │
│ theme           │  │                 │
│  ■  ■  ■       │  │  ■  ■  ■       │
│ #0F #1E #F5    │  │ #DC #F5 #05    │
│                 │  │                 │
│                 │  │                 │
└─────────────────┘  └─────────────────┘
```

### Selected Theme Details Box Below

```
┌─────────────────────────────────────────────────────────────┐
│ Professional and clean design for corporate professionals  │
│ Colors and fonts are locked to each theme. You cannot     │
│ customize individual colors.                               │
└─────────────────────────────────────────────────────────────┘
```

## Edit Business Card Form - Theme Section

**Same visual layout as create**, but with an important difference:

✅ Users **CAN** click a different theme card to change it  
❌ Users **CANNOT** customize individual colors

### Changing Theme on Edit

```
Current theme (Corporate) - Blue border + checkmark

Step 1: User clicks "Modern Gradient" card
Step 2: Border moves to that card
Step 3: Description updates to "Contemporary design..."
Step 4: Colors update (if visible in preview section)
Step 5: Submit form → Theme + new colors saved
```

## Color Swatch Design

Each card shows 3 color swatches in a horizontal row:

```
┌─────────────────────┐
│                     │ ← Primary color box (1/3 width)
├─────────────────────┤
│                     │ ← Secondary color box (1/3 width)
├─────────────────────┤
│                     │ ← Accent color box (1/3 width)
└─────────────────────┘
```

All 3 colors shown simultaneously for quick visual comparison.

## Responsive Layout

### Desktop (lg: >= 1024px)
- 3-column grid
- All 5 theme cards visible
- Compact, easy to scan

### Tablet (md: >= 768px)  
- 2-column grid
- 3 cards in first row, 2 in second
- Good space utilization

### Mobile (< 768px)
- 1-column grid
- Full-width cards
- Vertical stacking
- Still shows all theme options

## Interactive Behavior

### Hover State
- Border color changes from gray to light gray
- Subtle visual feedback (not selected)
- Cursor changes to pointer

### Selected State
- Blue border (border-blue-500)
- Light blue background (bg-blue-50)
- White checkmark icon (top-right corner)
- Visual confirmation of selection

### Deselected State (after changing)
- Gray border
- No background color
- No checkmark
- Back to neutral appearance

## Theme Names & Descriptions

### Corporate Classic
```
Name: Corporate Classic
Description: Professional and clean design for corporate professionals
Primary: #1F2937 (Dark Gray)
Secondary: #3B82F6 (Blue)
Accent: #10B981 (Green)
```

### Modern Gradient
```
Name: Modern Gradient
Description: Contemporary design with vibrant gradients
Primary: #3B82F6 (Blue)
Secondary: #8B5CF6 (Purple)
Accent: #EC4899 (Pink)
```

### Minimal Light
```
Name: Minimal Light
Description: Elegant and minimalist with plenty of whitespace
Primary: #1F2937 (Dark Gray)
Secondary: #6B7280 (Gray)
Accent: #9333EA (Purple)
```

### Dark Executive
```
Name: Dark Executive
Description: Premium dark theme for senior professionals
Primary: #0F172A (Deep Navy)
Secondary: #1E293B (Navy)
Accent: #F59E0B (Amber)
```

### Creative Bold
```
Name: Creative Bold
Description: Expressive and bold for creative professionals
Primary: #DC2626 (Red)
Secondary: #F59E0B (Amber)
Accent: #059669 (Emerald)
```

## User Actions

### On Create Card Form
1. User scrolls to "Design & Theme" section
2. Sees 5 theme options as cards
3. Hovers over a card → Border gets lighter
4. Clicks a card → Border turns blue, checkmark appears
5. Description updates below
6. Submits form → Theme + colors applied

### On Edit Card Form
1. User scrolls to "Design & Theme" section
2. Sees 5 theme options as cards
3. Current theme highlighted with blue border
4. **Can click a different theme to change**
5. New theme gets selected (blue border moves)
6. Submits form → New theme + new colors applied

## Key UX Features

✅ **Visual Discovery** - All themes visible at once  
✅ **Color Preview** - See actual colors before selecting  
✅ **Clear Selection** - Blue border + checkmark unmistakable  
✅ **Responsive Design** - Works on mobile, tablet, desktop  
✅ **Intuitive** - Click to select, visual feedback  
✅ **Professional** - Polished, modern appearance  
✅ **Accessible** - Sufficient contrast, clear labels  

## No Color Customization

⚠️ Important: No color picker shown anywhere
- Users see colors but cannot edit them
- Prevents color inconsistency
- Maintains design system integrity
- All colors locked to theme selection

## Dark Mode Support

Theme cards work in both light and dark modes:
- Borders adapt (gray in light, lighter gray in dark)
- Background (light blue in light mode, dark blue in dark mode)
- Text contrast maintained
- Colors display correctly in both modes
