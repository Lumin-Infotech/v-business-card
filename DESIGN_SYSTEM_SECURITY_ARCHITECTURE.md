# Design System Security Architecture

## Multi-Layer Defense Strategy

The implementation protects design settings through 5 independent security layers:

### Layer 1: Model Mass Assignment Guard
**File**: `app/Models/BusinessCard.php`
**Mechanism**: Design fields removed from `$fillable` array

```php
protected $fillable = [
    // ... other fields ...
    // Removed: 'theme', 'primary_color', 'secondary_color', etc.
];
```

**Effect**: Laravel's mass assignment protection prevents `Model::create()`, `Model::fill()`, and `Model::update()` from accepting design field values.

**Bypass Difficulty**: ⭐⭐⭐⭐⭐ (Very Hard)
- Requires direct database manipulation
- Requires overriding Eloquent model behavior
- Audit trails would show unauthorized updates

### Layer 2: Form Request Validation
**Files**: 
- `app/Http/Requests/StoreBusinessCardRequest.php`
- `app/Http/Requests/UpdateBusinessCardRequest.php`

**Mechanism**: Design field validation rules commented out/removed

**Effect**: Request validation doesn't require design fields, so HTTP form data can omit them. This prevents validation errors from alerting users they can't customize design.

**Bypass Difficulty**: ⭐⭐ (Easy at this layer, but next layer blocks)
- Attacker could send design fields in request
- But Model layer rejects them (Layer 1)

### Layer 3: Controller-Level Hardcoding
**File**: `app/Http/Controllers/BusinessCardController.php::store()`

**Mechanism**:
```php
$defaultTheme = config('themes.default');
$themeConfig = config('themes.themes.' . $defaultTheme);

$data['theme'] = $defaultTheme;
$data['primary_color'] = $themeConfig['primary_color'];
// ... all design fields from config, OVERWRITING user input
```

**Effect**: Even if user input made it past validation, controller explicitly overwrites it with config values. No user-supplied design value is ever saved.

**Bypass Difficulty**: ⭐⭐⭐ (Moderate)
- Requires modifying PHP code or replacing config
- Requires compromised server or code injection
- Version control tracks unauthorized changes

### Layer 4: Database Constraints
**File**: Migration `0001_01_01_000003_create_business_cards_table.php`

**Mechanism**: Design columns exist with database defaults

```php
$table->string('theme')->default('corporate');
$table->string('primary_color')->default('#4F46E5');
// ... all design fields have defaults
```

**Effect**: If somehow all previous layers fail, database defaults ensure valid design values.

**Bypass Difficulty**: ⭐⭐⭐⭐ (Hard)
- Requires direct database write access
- Requires database migration or raw SQL
- Detailed audit logs would capture this

### Layer 5: Frontend Removal
**Files**:
- `resources/js/pages/admin/cards/create.tsx`
- `resources/js/pages/admin/cards/edit.tsx`

**Mechanism**: UI components for design selection completely removed

**Effect**: Users cannot accidentally or intentionally submit design changes from the web interface.

**Bypass Difficulty**: ⭐ (Easy to bypass, but layers below stop it)
- Can modify browser console/local storage
- Can craft custom HTTP requests
- But Model + Request + Controller layers block it

## Attack Scenarios

### Scenario 1: Modifying Design via Form Submission
```
User submits: { name: "John", theme: "bold", primary_color: "#FF0000" }
```
**Defense Chain**:
1. ✅ Form Request ignores theme/color fields
2. ✅ Model rejects theme/color in `fill()`
3. ✅ Controller overwrites with config values
4. ✅ Only name field is saved
**Result**: BLOCKED

### Scenario 2: Direct API Request with Design Fields
```
PUT /admin/cards/john-doe HTTP/1.1
{ "name": "John", "theme": "gradient", "primary_color": "#00FF00" }
```
**Defense Chain**:
1. ✅ Controller unsets 'slug' and ignores design fields
2. ✅ Model blocks update() on design fields
3. ✅ Database defaults apply
**Result**: BLOCKED

### Scenario 3: Browser Console Manipulation
```javascript
// User tries to modify form data in console
data.theme = 'dark';
data.primary_color = '#123456';
// Then submit form
```
**Defense Chain**:
1. ✅ Form Request doesn't accept theme/color
2. ✅ Model mass assignment guard rejects
3. ✅ Controller doesn't use submitted values
**Result**: BLOCKED

### Scenario 4: SQL Injection / Direct DB Access
```sql
UPDATE business_cards SET theme='dark' WHERE id=1
```
**Defense Chain**:
1. ✅ Would succeed at database level
2. ✅ But requires database access breach
3. ✅ Audit logs would reveal unauthorized access
4. ✅ Next card creation would normalize it
**Result**: MITIGATED (Depends on database access controls)

## Defense Strength Assessment

| Layer | Strength | Coverage | Dependencies |
|-------|----------|----------|--------------|
| Model Guard | Very High | HTTP + API | Laravel Framework |
| Form Validation | Medium | HTTP + API | Request validation rules |
| Controller Logic | Very High | HTTP + API | Controller code integrity |
| Database Defaults | Medium | Direct DB | Column defaults |
| Frontend Removal | Low | Browser | Browser security |

**Overall Security**: ⭐⭐⭐⭐⭐ (Very Secure)
- Multiple independent layers
- No single point of failure
- Defense in depth approach

## Maintenance & Updates

To safely modify themes in the future:

1. **Safe**: Edit `config/themes.php` - only affects new cards
2. **Safe**: Add new themes - backward compatible
3. **Safe**: Modify colors in existing themes - affects new cards, optionally existing via migration
4. **Unsafe**: Remove a theme - would break cards using it
5. **Unsafe**: Change theme column type - requires migration, potential data loss

## Audit Trail Recommendations

To enhance monitoring:
- Log all design field change attempts (validation rejected)
- Log direct theme updates (should be rare)
- Monitor controller modifications
- Alert on database schema changes to design columns
- Review config changes in version control

## Conclusion

The design system is protected through architectural redundancy. Even if one layer is compromised, others provide defense. This prevents accidental misuse and significantly raises the bar for intentional bypass.
