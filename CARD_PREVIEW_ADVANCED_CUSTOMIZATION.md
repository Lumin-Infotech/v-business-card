# CardPreviewEditor: Advanced Customization Guide

## Extended Features (Optional Implementations)

### 1. Image Preview Support
To display profile/cover images in the preview:

```typescript
// Modify CardPreviewEditor to include images
// Add image display to CardPreview renders
{props.profilePhoto && (
    <img 
        src={props.profilePhoto} 
        alt="Profile" 
        className="w-12 h-12 rounded-full object-cover"
    />
)}
```

### 2. Print Functionality
Add print button to preview:

```typescript
const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow?.document.write(previewHTML);
    printWindow?.print();
};

<Button onClick={handlePrint} variant="outline">
    <Printer className="w-4 h-4" />
    Print Preview
</Button>
```

### 3. Export as Image
Capture preview as PNG:

```typescript
import html2canvas from 'html2canvas';

const handleExport = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element);
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'card-preview.png';
    link.click();
};
```

### 4. Copy Color Values
Add click-to-copy color displays:

```typescript
<div 
    className="w-6 h-6 rounded cursor-pointer hover:ring-2"
    style={{ backgroundColor: props.primaryColor }}
    onClick={() => {
        navigator.clipboard.writeText(props.primaryColor);
        toast.success('Color copied!');
    }}
/>
```

### 5. Download as vCard
Integrate with existing vCard export:

```typescript
<Button onClick={() => window.location.href = `/cards/${cardId}/download-vcard`}>
    <Download className="w-4 h-4" />
    Export vCard
</Button>
```

### 6. Zoom Control
Add preview zoom controls:

```typescript
const [zoom, setZoom] = useState(100);

<div className="flex gap-2 items-center">
    <Button size="sm" onClick={() => setZoom(z => z - 10)}>−</Button>
    <span className="text-sm w-12 text-center">{zoom}%</span>
    <Button size="sm" onClick={() => setZoom(z => z + 10)}>+</Button>
</div>

<div style={{ transform: `scale(${zoom / 100})` }}>
    <CardPreview {...previewProps} />
</div>
```

### 7. Color Suggestion Helper
Add color harmony suggestions:

```typescript
const suggestComplement = (color: string) => {
    // Calculate complementary color
    return calculateComplement(color);
};

<Button 
    size="sm" 
    variant="outline"
    onClick={() => setData('secondary_color', suggestComplement(data.primary_color))}
>
    Suggest Color
</Button>
```

### 8. Template Gallery
Show multiple theme previews at once:

```typescript
const allThemes = ['corporate', 'gradient', 'minimal', 'dark', 'bold'];

<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {allThemes.map(theme => (
        <div 
            key={theme}
            onClick={() => setData('theme', theme)}
            className="cursor-pointer border-2 rounded p-2"
        >
            <CardPreview {...previewProps} theme={theme} />
        </div>
    ))}
</div>
```

### 9. Live Text Editing
Edit fields directly in preview:

```typescript
const [editMode, setEditMode] = useState(false);

{editMode && (
    <input 
        type="text"
        value={data.full_name}
        onChange={(e) => setData('full_name', e.target.value)}
        className="w-full border rounded px-2 py-1"
    />
)}
```

### 10. Share Preview Link
Generate shareable preview URLs:

```typescript
const shareURL = `/preview/${data.slug}?theme=${data.theme}&color=${data.primary_color}`;

const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.origin + shareURL);
    toast.success('Preview link copied!');
};

<Button onClick={copyToClipboard} size="sm" variant="outline">
    <Share2 className="w-4 h-4" />
    Share
</Button>
```

## Configuration Options

### Custom Breakpoints
Modify responsive behavior:
```typescript
// Instead of lg: breakpoint
<div className="grid grid-cols-1 md:grid-cols-3">  // Show preview on tablets
```

### Custom Sizing
Adjust preview dimensions:
```typescript
// Mobile: 320px instead of 375px
width: isMobileView ? '320px' : '100%'

// Desktop: with max-width
maxWidth: isMobileView ? '375px' : '1200px'
```

### Custom Colors
Add theme presets:
```typescript
const colorPresets = {
    professional: { primary: '#1F2937', secondary: '#3B82F6' },
    creative: { primary: '#DC2626', secondary: '#F59E0B' },
    tech: { primary: '#0F172A', secondary: '#06B6D4' },
};
```

### Animation Customization
Adjust transition speed:
```typescript
// Current: duration-300 (300ms)
// Options: duration-150 (fast), duration-500 (slower), duration-700 (smooth)
className="transition-all duration-500"
```

## Performance Optimizations

### Memoization
```typescript
import { memo } from 'react';

export const CardPreviewEditor = memo(function CardPreviewEditor(props) {
    // Component code
});
```

### Debounced Updates
```typescript
const debouncedUpdate = useCallback(
    debounce((value) => setData('full_name', value), 300),
    []
);
```

## Accessibility Enhancements

### ARIA Labels
```typescript
<Button 
    aria-label="Switch to desktop view"
    aria-pressed={!isMobileView}
>
    Desktop
</Button>
```

### Keyboard Navigation
```typescript
const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'd') setIsMobileView(false);
    if (e.key === 'm') setIsMobileView(true);
};
```

## Testing Integration

### Unit Tests
```typescript
describe('CardPreviewEditor', () => {
    it('updates preview when fullName changes', () => {
        // Test code
    });
    
    it('toggles between mobile and desktop view', () => {
        // Test code
    });
});
```

## Documentation
For additional customization ideas, refer to:
- `CARD_PREVIEW_EDITOR_INTEGRATION.md` - Integration patterns
- `CARD_PREVIEW_EDITOR_FEATURE_SUMMARY.md` - Complete features list
- `QUICK_START_CARD_PREVIEW.md` - Quick setup guide
