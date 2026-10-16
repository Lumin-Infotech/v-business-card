# CardPreviewEditor Component - Visual Reference Guide

## Component Layout

### Desktop View
```
┌────────────────────────────────────────────────────────┐
│  Live Preview                    [Desktop] [Mobile]    │
├────────────────────────────────────────────────────────┤
│                                                         │
│   ┌──────────────────────────────────────────────┐    │
│   │                                              │    │
│   │  ┌────────────────────────────────────────┐  │    │
│   │  │   Your Name                            │  │    │
│   │  │   Job Title                            │  │    │
│   │  │   Company Name                         │  │    │
│   │  │                                        │  │    │
│   │  │   📧 email@example.com                │  │    │
│   │  │   📞 +1 (555) 123-4567               │  │    │
│   │  └────────────────────────────────────────┘  │    │
│   │                                              │    │
│   └──────────────────────────────────────────────┘    │
│   Desktop Preview • Updates in real-time as you       │
│   fill the form                                       │
│                                                         │
├────────────────────────────────────────────────────────┤
│ ℹ️  Preview Status: Displaying your information with  │
│    the corporate theme.                               │
└────────────────────────────────────────────────────────┘
```

### Mobile View
```
┌────────────────────────────────────────────────────────┐
│  Live Preview                    [Desktop] [Mobile]    │
├────────────────────────────────────────────────────────┤
│                                                         │
│   ┌──────────────────┐                                │
│   │ ●●●●●●●●●●●●●  │  <- Notch                     │
│   │ ─────────────────│                                │
│   │ │                │                                │
│   │ │  Your Name     │                                │
│   │ │  Job Title     │  <- 375px width                │
│   │ │                │                                │
│   │ │  📧 email@...  │                                │
│   │ │  📞 +1 555...  │                                │
│   │ │                │                                │
│   │ └────────────────┘                                │
│   │ ● ────────── ●     <- Phone button area           │
│                                                         │
│   Mobile Preview • Updates in real-time as you       │
│   fill the form                                       │
│                                                         │
├────────────────────────────────────────────────────────┤
│ ℹ️  Preview Status: Displaying your information with  │
│    the gradient theme.                                │
└────────────────────────────────────────────────────────┘
```

## Theme Examples

### Corporate Theme
```
┌─────────────────────┐
│ John Doe            │
│ Senior Designer     │
│ Creative Studio Inc │
│                     │
│ 📧 john@example.com │
│ 📞 +1 (555) 123-456 │
└─────────────────────┘
(White background, colored text)
```

### Gradient Theme
```
┌─────────────────────┐
│ John Doe            │ ← Gradient background
│ Senior Designer     │   (Primary to Secondary)
│ Creative Studio Inc │
│                     │
│ john@example.com    │ ← White text
│ +1 (555) 123-456    │
└─────────────────────┘
```

### Minimal Theme
```
┌─────────────────────┐
│ John Doe            │ ← Light, elegant
│ SENIOR DESIGNER     │   text
│ Creative Studio Inc │
│                     │
│ john@example.com    │
│ +1 (555) 123-456    │
└─────────────────────┘
(White with border)
```

### Dark Theme
```
┌─────────────────────┐
│ John Doe            │ ← Colored text
│ Senior Designer     │   on dark background
│ Creative Studio Inc │
│                     │
│ john@example.com    │ ← Muted gray text
│ +1 (555) 123-456    │
└─────────────────────┘
(Dark gray/black background)
```

### Bold Theme
```
┌─────────────────────┐
│ JOHN DOE            │ ← Bold white text
│ SENIOR DESIGNER     │   on colored background
│ STUDIO              │
│                     │
│ john@example.com    │
│ +1 (555) 123-456    │
└─────────────────────┘
(Primary color background)
```

## Form Integration

### Side-by-Side Layout
```
┌──────────────────────────────────────────────────────┐
│ Create New Business Card                            │
├───────────────────────────────┬──────────────────────┤
│ Personal Information           │ Live Preview         │
│ ─────────────────────────────  │ [D] [M] buttons     │
│ Name: [________________]       │                      │
│ Full Name: [______________]    │ ┌──────────────┐    │
│ Job Title: [______________]    │ │  Card Preview│    │
│ Department: [____________]     │ │  (Updated in │    │
│ Short Bio: [______________]    │ │   real-time) │    │
│                                │ └──────────────┘    │
│ Company Information            │                      │
│ ─────────────────────────────  │ Preview Status      │
│ Company: [________________]    │ ────────────────    │
│ Website: [_________________]   │                      │
│                                │ (Sticky on desktop) │
│ Contact Information            │                      │
│ ─────────────────────────────  │                      │
│ Email: [___________________]   │                      │
│ Phone: [___________________]   │                      │
│                                │                      │
└───────────────────────────────┴──────────────────────┘
```

### Below Form Layout
```
┌──────────────────────────────────────┐
│ Create New Business Card             │
├──────────────────────────────────────┤
│     Personal Information             │
│     Company Information              │
│     Contact Information              │
│     Address Information              │
│     Social Media                     │
│     Design & Theme                   │
│     Publishing                       │
├──────────────────────────────────────┤
│          Live Preview                │
│     [Desktop] [Mobile] buttons       │
│     ┌────────────────────────────┐  │
│     │    Card Preview Display    │  │
│     └────────────────────────────┘  │
│     Preview Status Info Box         │
└──────────────────────────────────────┘
```

## Color Application

### Primary Color
- Heading text in most themes
- Card title/name
- Accent in corporate theme

### Secondary Color
- Gradient background (gradient theme)
- Accent color (bold theme)
- Supporting colors

### Accent Color
- Email/phone icons
- Detail colors
- Supporting elements

### Background Color
- Custom card background
- Optional, overrides defaults

## State Indicators

### When fullName is filled
```
ℹ️ Preview Status: Displaying your information 
   with the corporate theme.
```

### When fullName is empty
```
ℹ️ Preview Status: Displaying placeholder content 
   with the corporate theme.
```

## Responsive Behavior

### Mobile Device
```
┌─────────────────────────────┐
│  Form (Full width)          │
│                             │
│  [Live Preview stacked]     │
│  ┌─────────────────────┐    │
│  │   Card Preview      │    │
│  │   (375px frame)     │    │
│  └─────────────────────┘    │
└─────────────────────────────┘
```

### Tablet Device
```
┌──────────────────────────────────────────┐
│  Form (Adjusted)   │  Preview (Adjusted) │
│                    │                     │
│                    │  ┌──────────────┐  │
│                    │  │  Card Preview│  │
│                    │  │  (Flexible)  │  │
│                    │  └──────────────┘  │
└──────────────────────────────────────────┘
```

### Desktop Device
```
┌────────────────────────────────────────────────────┐
│ Form (2 columns)      │  Preview (Sticky) │
│                       │                   │
│ [Input fields]        │  ┌───────────┐    │
│ [Input fields]        │  │  Preview  │    │
│ [Input fields]        │  │  (Sticky) │    │
│ [Input fields]        │  │  (Always  │    │
│                       │  │   visible)│    │
│                       │  └───────────┘    │
│                       │                   │
└────────────────────────────────────────────────────┘
```

## Field Visibility Rules

### Always Visible
- Full Name (shows "Your Name" if empty)

### Conditionally Visible (Hidden if empty)
- Job Title
- Company Name
- Email Address
- Phone Number

### Auto-hidden when empty
- Address
- City
- Short Bio
- Website

This ensures clean preview without empty sections.
