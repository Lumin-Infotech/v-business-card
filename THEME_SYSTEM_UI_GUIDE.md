# Theme System - UI & UX Guide

## Create Business Card Form

### Design & Theme Section

```
┌─────────────────────────────────────────────────────────┐
│ Design & Theme                                          │
│ Select a professional theme. Colors and fonts are      │
│ predefined for each theme.                             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Theme *                                                 │
│ [▼ Corporate Classic ________________] [✓]             │
│                                                         │
│ Options:                                                │
│  • Corporate Classic (selected)                         │
│  • Modern Gradient                                      │
│  • Minimal Light                                        │
│  • Dark Executive                                       │
│  • Creative Bold                                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Theme Preview:                                          │
│                                                         │
│ Corporate Classic Theme                                │
│ Professional and clean design for corporate            │
│ professionals                                           │
│                                                         │
│ ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│ │          │  │          │  │          │              │
│ │          │  │          │  │          │              │
│ │ #1F2937  │  │ #3B82F6  │  │ #10B981  │              │
│ │ Primary  │  │Secondary │  │ Accent   │              │
│ └──────────┘  └──────────┘  └──────────┘              │
│                                                         │
│ Colors and fonts are locked to each theme. You        │
│ cannot customize individual colors.                    │
└─────────────────────────────────────────────────────────┘
```

## Edit Business Card Form

### Design & Theme Section (LOCKED)

```
┌─────────────────────────────────────────────────────────┐
│ Design & Theme                                          │
│ Theme selection is locked. Colors and fonts cannot     │
│ be customized.                                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Corporate Theme Read-Only View                          │
│                                                         │
│ Corporate Classic Theme                                │
│ Professional and clean design for corporate            │
│ professionals                                           │
│                                                         │
│ ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│ │          │  │          │  │          │              │
│ │          │  │          │  │          │              │
│ │ #1F2937  │  │ #3B82F6  │  │ #10B981  │              │
│ │ Primary  │  │Secondary │  │ Accent   │              │
│ └──────────┘  └──────────┘  └──────────┘              │
│                                                         │
│ Theme and colors are locked and cannot be changed      │
│ after card creation.                                    │
└─────────────────────────────────────────────────────────┘
```

## Theme Options Visual Reference

### Theme 1: Corporate Classic
- **Primary**: #1F2937 (Dark Gray)
- **Secondary**: #3B82F6 (Blue)
- **Accent**: #10B981 (Green)
- **Description**: Professional and clean design for corporate professionals

### Theme 2: Modern Gradient
- **Primary**: #3B82F6 (Blue)
- **Secondary**: #8B5CF6 (Purple)
- **Accent**: #EC4899 (Pink)
- **Description**: Contemporary design with vibrant gradients

### Theme 3: Minimal Light
- **Primary**: #1F2937 (Dark Gray)
- **Secondary**: #6B7280 (Gray)
- **Accent**: #9333EA (Purple)
- **Description**: Elegant and minimalist with plenty of whitespace

### Theme 4: Dark Executive
- **Primary**: #0F172A (Deep Navy)
- **Secondary**: #1E293B (Navy)
- **Accent**: #F59E0B (Amber)
- **Description**: Premium dark theme for senior professionals

### Theme 5: Creative Bold
- **Primary**: #DC2626 (Red)
- **Secondary**: #F59E0B (Amber)
- **Accent**: #059669 (Emerald)
- **Description**: Expressive and bold for creative professionals

## User Journey

```
┌──────────────────┐
│ Create New Card  │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│ Fill Personal Information    │
│ - Name, Email, Phone, etc.   │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ SELECT THEME from dropdown   │
│ - 5 professional options     │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ View Theme Preview           │
│ - See colors automatically   │
│ - Cannot customize           │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Submit & Create Card         │
│ - Theme + colors locked      │
└──────────────────────────────┘

         │
         ├─────────────────────┐
         ▼                     ▼
┌──────────────────┐  ┌──────────────────┐
│ View Public Card │  │ Edit Card        │
│ Uses theme       │  │ Theme is LOCKED  │
│ Can see colors   │  │ Cannot change    │
└──────────────────┘  └──────────────────┘
```

## Interactive Elements

### Theme Dropdown
- Shows 5 options with theme names
- Default: "Corporate Classic"
- Updates preview in real-time
- Only available on create, locked on edit

### Color Swatches
- 3 colors per theme (Primary, Secondary, Accent)
- Visual color blocks with hex values
- Responsive grid layout
- View only (no color picker)

### Helpful Text
- **Create**: "Colors and fonts are locked to each theme"
- **Edit**: "Theme and colors are locked after creation"
- Clear, user-friendly messaging

## Responsive Design

All theme elements are responsive:
- Desktop: 3-column color grid
- Tablet: Adjust layout as needed
- Mobile: Stack vertically if needed

Color swatches always show:
- Visual color block
- Color name (Primary/Secondary/Accent)
- Hex value in monospace font
