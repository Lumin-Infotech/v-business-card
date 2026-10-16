import { Mail, MapPin, Phone } from 'lucide-react';

interface CardPreviewProps {
    theme: string;
    fullName: string;
    jobTitle?: string;
    company?: string;
    email?: string;
    phone?: string;
    address?: string;
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    fontFamily?: string;
}

const themes = {
    corporate: (props: CardPreviewProps) => (
        <div
            className="w-full h-64 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between"
            style={{ fontFamily: props.fontFamily === 'mono' ? 'monospace' : 'sans-serif' }}
        >
            <div>
                <h2 className="text-2xl font-bold" style={{ color: props.primaryColor }}>
                    {props.fullName || 'Your Name'}
                </h2>
                {props.jobTitle && <p className="text-sm text-gray-600 mt-1">{props.jobTitle}</p>}
                {props.company && <p className="text-sm font-semibold mt-1">{props.company}</p>}
            </div>
            <div className="space-y-2 text-sm">
                {props.email && (
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" style={{ color: props.accentColor }} />
                        <span>{props.email}</span>
                    </div>
                )}
                {props.phone && (
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" style={{ color: props.accentColor }} />
                        <span>{props.phone}</span>
                    </div>
                )}
            </div>
        </div>
    ),

    gradient: (props: CardPreviewProps) => (
        <div
            className="w-full h-64 rounded-lg shadow-lg p-6 flex flex-col justify-between text-white"
            style={{
                backgroundImage: `linear-gradient(135deg, ${props.primaryColor} 0%, ${props.secondaryColor} 100%)`,
                fontFamily: props.fontFamily === 'mono' ? 'monospace' : 'sans-serif',
            }}
        >
            <div>
                <h2 className="text-2xl font-bold">{props.fullName || 'Your Name'}</h2>
                {props.jobTitle && <p className="text-sm mt-1 opacity-90">{props.jobTitle}</p>}
                {props.company && <p className="text-sm font-semibold mt-1">{props.company}</p>}
            </div>
            <div className="space-y-2 text-sm">
                {props.email && <div>{props.email}</div>}
                {props.phone && <div>{props.phone}</div>}
            </div>
        </div>
    ),

    minimal: (props: CardPreviewProps) => (
        <div
            className="w-full h-64 bg-white border border-gray-300 rounded-lg p-6 flex flex-col justify-between"
            style={{ fontFamily: props.fontFamily === 'mono' ? 'monospace' : 'sans-serif' }}
        >
            <div>
                <h2 className="text-2xl font-light tracking-wider" style={{ color: props.primaryColor }}>
                    {props.fullName || 'Your Name'}
                </h2>
                {props.jobTitle && <p className="text-xs tracking-widest text-gray-500 mt-2 uppercase">{props.jobTitle}</p>}
                {props.company && <p className="text-xs tracking-widest text-gray-600 mt-1">{props.company}</p>}
            </div>
            <div className="space-y-2 text-xs text-gray-600">
                {props.email && <div>{props.email}</div>}
                {props.phone && <div>{props.phone}</div>}
            </div>
        </div>
    ),

    dark: (props: CardPreviewProps) => (
        <div
            className="w-full h-64 bg-gray-900 rounded-lg shadow-2xl p-6 flex flex-col justify-between text-white"
            style={{ fontFamily: props.fontFamily === 'mono' ? 'monospace' : 'sans-serif' }}
        >
            <div>
                <h2 className="text-2xl font-bold" style={{ color: props.primaryColor || '#FCD34D' }}>
                    {props.fullName || 'Your Name'}
                </h2>
                {props.jobTitle && <p className="text-sm mt-2 text-gray-400">{props.jobTitle}</p>}
                {props.company && <p className="text-sm font-semibold mt-1 text-gray-300">{props.company}</p>}
            </div>
            <div className="space-y-2 text-sm text-gray-400">
                {props.email && <div>{props.email}</div>}
                {props.phone && <div>{props.phone}</div>}
            </div>
        </div>
    ),

    bold: (props: CardPreviewProps) => (
        <div
            className="w-full h-64 rounded-lg shadow-lg p-6 flex flex-col justify-between text-white overflow-hidden"
            style={{ backgroundColor: props.primaryColor, fontFamily: props.fontFamily === 'mono' ? 'monospace' : 'sans-serif' }}
        >
            <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
                style={{ backgroundColor: props.secondaryColor }}
            />
            <div className="relative z-10">
                <h2 className="text-2xl font-black">{props.fullName || 'Your Name'}</h2>
                {props.jobTitle && <p className="text-sm mt-2 font-bold">{props.jobTitle}</p>}
                {props.company && <p className="text-sm font-semibold mt-1">{props.company}</p>}
            </div>
            <div className="space-y-2 text-sm font-semibold">
                {props.email && <div>{props.email}</div>}
                {props.phone && <div>{props.phone}</div>}
            </div>
        </div>
    ),
};

export function CardPreview(props: CardPreviewProps) {
    const themeRenderer = themes[props.theme as keyof typeof themes] || themes.corporate;
    return themeRenderer(props);
}
