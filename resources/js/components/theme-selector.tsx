import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle2 } from 'lucide-react';

interface Theme {
    slug: string;
    name: string;
    description: string;
}

interface ThemeSelectorProps {
    themes: Theme[];
    selectedTheme: string;
    onChange: (theme: string) => void;
}

export function ThemeSelector({ themes, selectedTheme, onChange }: ThemeSelectorProps) {
    return (
        <div className="space-y-4">
            <Label className="text-base font-semibold">Select Theme</Label>
            <RadioGroup value={selectedTheme} onValueChange={onChange}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                    {themes.map((theme) => (
                        <div
                            key={theme.slug}
                            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                                selectedTheme === theme.slug
                                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950'
                                    : 'border-border hover:border-blue-400'
                            }`}
                        >
                            <div className="flex items-start gap-3">
                                <RadioGroupItem value={theme.slug} id={theme.slug} className="mt-1" />
                                <div className="flex-1">
                                    <label htmlFor={theme.slug} className="cursor-pointer">
                                        <div className="font-semibold text-sm">{theme.name}</div>
                                        <div className="text-xs text-muted mt-1">{theme.description}</div>
                                    </label>
                                </div>
                                {selectedTheme === theme.slug && (
                                    <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </RadioGroup>
        </div>
    );
}
