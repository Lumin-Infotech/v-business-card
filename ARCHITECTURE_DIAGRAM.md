# Theme Selection Architecture

## Component Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    User Browser                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React Component (create.tsx / edit.tsx)            │  │
│  │  ────────────────────────────────────────────────────│  │
│  │                                                      │  │
│  │  const [data, setData] = useForm({                 │  │
│  │    theme: 'corporate',                             │  │
│  │    ...other fields...                              │  │
│  │  })                                                 │  │
│  │                                                      │  │
│  │  ┌──────────────────────────────────────────┐      │  │
│  │  │ Theme Selection Cards Grid (5 cards)    │      │  │
│  │  │ ────────────────────────────────────────│      │  │
│  │  │ [Corporate] [Gradient] [Minimal] ...   │      │  │
│  │  │  ■ ■ ■      ■ ■ ■      ■ ■ ■         │      │  │
│  │  │ onClick={() => setData('theme', id)}  │      │  │
│  │  └──────────────────────────────────────────┘      │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                     ↓ Form Submit                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  POST /cards or PUT /cards/{id}                      │  │
│  │  Payload: { theme: "gradient", ...others }          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                          ↓
                       NETWORK
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                    Laravel Server                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ BusinessCardController@store/update()               │  │
│  │ ──────────────────────────────────────────────────   │  │
│  │ Receives: { theme: "gradient", ...others }          │  │
│  └──────────────────────────────────────────────────────┘  │
│                     ↓                                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ StoreBusinessCardRequest Validation                 │  │
│  │ ──────────────────────────────────────────────────   │  │
│  │ theme: 'required|string|in:corporate,gradient,...'  │  │
│  │ ✓ "gradient" is valid                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                     ↓                                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Get Theme Configuration                             │  │
│  │ ──────────────────────────────────────────────────   │  │
│  │ $themeConfig = config('themes.themes.gradient')    │  │
│  │                                                      │  │
│  │ Returns:                                            │  │
│  │ {                                                   │  │
│  │   name: "Modern Gradient",                         │  │
│  │   primary_color: "#3B82F6",                        │  │
│  │   secondary_color: "#8B5CF6",                      │  │
│  │   accent_color: "#EC4899",                         │  │
│  │   background_color: "#FFFFFF",                     │  │
│  │   font_family: "sans"                              │  │
│  │ }                                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                     ↓                                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Override All Design Fields with Config              │  │
│  │ ──────────────────────────────────────────────────   │  │
│  │ $data['theme'] = "gradient"                         │  │
│  │ $data['primary_color'] = "#3B82F6"                 │  │
│  │ $data['secondary_color'] = "#8B5CF6"               │  │
│  │ $data['accent_color'] = "#EC4899"                  │  │
│  │ $data['background_color'] = "#FFFFFF"              │  │
│  │ $data['font_family'] = "sans"                       │  │
│  │                                                      │  │
│  │ ⚠️  User-supplied values completely ignored!       │  │
│  └──────────────────────────────────────────────────────┘  │
│                     ↓                                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ BusinessCard::create() / update()                   │  │
│  │ ──────────────────────────────────────────────────   │  │
│  │ Save to database with locked design fields         │  │
│  └──────────────────────────────────────────────────────┘  │
│                     ↓                                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Database                                             │  │
│  │ ──────────────────────────────────────────────────   │  │
│  │ business_cards table:                               │  │
│  │ - theme: "gradient"                                 │  │
│  │ - primary_color: "#3B82F6"                          │  │
│  │ - secondary_color: "#8B5CF6"                        │  │
│  │ - accent_color: "#EC4899"                           │  │
│  │ - background_color: "#FFFFFF"                       │  │
│  │ - font_family: "sans"                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Security Layers

```
┌──────────────────────────────────────────────────┐
│  User tries to submit custom colors              │
│  { theme: "corporate", primary_color: "#FF0000"}│
└──────────────────┬───────────────────────────────┘
                   ↓
        Layer 1: Form Validation
    "primary_color" has no validation rule
              ↓ Ignored
        Layer 2: Controller
    Gets theme config, overwrites all colors
              ↓ Colors replaced
        Layer 3: Model $fillable
    Design fields not in $fillable array
              ↓ Cannot assign directly
        Layer 4: Frontend Removal
    No color picker UI - can't even try
              ↓
        RESULT: Colors are locked ✓
```

## Data State at Each Step

```
1. User Selects Theme
   data.theme = "gradient"

2. Form Submission
   POST { theme: "gradient", full_name: "...", ... }

3. Backend Validates
   ✓ theme is in allowed list
   ✓ Request validated

4. Get Theme Config
   config.themes.gradient = {
     primary_color: "#3B82F6",
     ...
   }

5. Override Data
   data.primary_color = "#3B82F6"  (from config)
   data.secondary_color = "#8B5CF6" (from config)
   ...

6. Save to Database
   INSERT/UPDATE with config values

7. Display to User
   Card renders with locked colors
```

## Theme Configuration Lookup

```
config/themes.php
│
├─ 'default' => 'corporate'
│
└─ 'themes' => [
     'corporate' => [
       'name' => 'Corporate Classic',
       'primary_color' => '#1F2937',
       'secondary_color' => '#3B82F6',
       'accent_color' => '#10B981',
       'background_color' => '#FFFFFF',
       'font_family' => 'sans'
     ],
     'gradient' => [ ... ],
     'minimal' => [ ... ],
     'dark' => [ ... ],
     'bold' => [ ... ]
   ]
```

## API Endpoint Flow

```
                CREATE CARD
                    │
        ┌───────────┼───────────┐
        │           │           │
        ↓           ↓           ↓
    Request    Validation   Controller
    {theme}    (theme OK)    (apply config)
                                │
                            Database
                                │
                            Response
                            (redirect)

                 EDIT CARD
                    │
        ┌───────────┼───────────┐
        │           │           │
        ↓           ↓           ↓
    Request    Validation   Controller
    {theme}    (theme OK)    (apply config)
                                │
                            Database
                                │
                            Response
                            (redirect)
```

## Component Responsibilities

### React Component (create.tsx / edit.tsx)
- ✅ Display theme selection cards
- ✅ Handle click selection
- ✅ Show visual feedback
- ✅ Submit form to server
- ❌ Never submit color values

### Form Request (Validation)
- ✅ Validate theme value
- ✅ Validate other fields
- ❌ Never validate color fields

### Controller (BusinessCardController)
- ✅ Receive validated data
- ✅ Get theme config from server
- ✅ Override all design fields
- ✅ Save to database

### Database
- ✅ Store theme identifier
- ✅ Store locked colors
- ✅ Maintain consistency

### Config (themes.php)
- ✅ Single source of truth
- ✅ All theme definitions
- ✅ All color values

## Summary

The architecture ensures:
1. **User Selection** - Theme selected in UI
2. **Validation** - Theme validated on server
3. **Config Lookup** - Colors fetched from config
4. **Override** - All colors replaced with config
5. **Security** - User input for colors ignored
6. **Storage** - Locked colors saved
7. **Display** - Professional appearance guaranteed
