# Integration Example: CardPreviewEditor in Create Page

## Import Statement
Add to the top of `resources/js/pages/admin/cards/create.tsx`:

```typescript
import { CardPreviewEditor } from '@/components/card-preview-editor';
```

## Container Width Update
Change line 155:
```typescript
// From:
<div className="max-w-5xl mx-auto">

// To:
<div className="max-w-7xl mx-auto">
```

## Layout Structure Update
Replace the form container starting at line 166 with this 2-column layout:

```typescript
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Form section - 2 columns on large screens */}
    <div className="lg:col-span-2">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-8">
            <h1 className="text-3xl font-bold mb-8">Create New Business Card</h1>

            <form onSubmit={submit} className="space-y-8">
                {/* All existing form sections go here */}
                {/* Personal Information, Company, Contact, Address, Social Media, Design, Publishing */}
                
                {/* Form Actions */}
                <div className="flex items-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Button type="submit" disabled={processing} className="flex items-center gap-2">
                        {processing && <Loader2 className="w-4 h-4 animate-spin" />}
                        Create Card
                    </Button>
                    <a
                        href="/admin/cards"
                        className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                    >
                        Cancel
                    </a>
                </div>
            </form>
        </div>
    </div>

    {/* Preview section - 1 column on large screens, sticky on desktop */}
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

## Key Changes
1. **Layout**: 3-column grid (2 for form, 1 for preview)
2. **Sticky positioning**: Preview stays visible as user scrolls through form
3. **Responsive**: Stacks on mobile, side-by-side on large screens
4. **Data binding**: All form data passed as props to CardPreviewEditor

## Mobile Behavior
- On screens smaller than `lg` breakpoint, preview appears below the form
- Toggle button lets users switch between mobile/desktop preview
- Perfect for mobile form filling

## Real-time Updates
As the user types:
- Name changes appear instantly
- Color changes update the preview immediately
- Theme changes reflect in real-time
- All optional fields show/hide as needed

## Benefits
✅ Users see exactly how their card will look
✅ Encourages complete form filling
✅ Mobile preview helps optimize for different devices
✅ Real-time feedback improves UX
✅ No performance impact
