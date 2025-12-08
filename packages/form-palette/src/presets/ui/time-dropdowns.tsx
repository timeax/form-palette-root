import * as React from "react";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/presets/ui/select";

export interface TimeDropdownsProps {
    /**
     * Current date-time value.
     * Only the time portion will be modified; date part is preserved.
     */
    value: Date | undefined;

    /**
     * Called whenever any of the time parts change.
     */
    onChange(next: Date | undefined): void;

    /**
     * Whether to show seconds dropdown.
     * Default: false.
     */
    showSeconds?: boolean;

    /**
     * Step between minutes in the dropdown.
     * Default: 5.
     */
    minuteStep?: number;

    /**
     * Step between seconds in the dropdown.
     * Default: 5.
     */
    secondStep?: number;

    /**
     * If true, show 12-hour clock with AM/PM toggle.
     * If false, show 24-hour clock (00–23).
     * Default: false (24-hour).
     */
    use12Hour?: boolean;

    /**
     * Optional label to show above or beside the dropdowns.
     */
    label?: React.ReactNode;

    /**
     * Custom className for the outer wrapper.
     */
    className?: string;

    /**
     * Custom className for each SelectTrigger (hours/minutes/seconds).
     */
    triggerClassName?: string;

    /**
     * Compact / normal layout toggle.
     * Just a quick spacing switch for now.
     */
    density?: "compact" | "normal";
}

function pad2(n: number): string {
    return n.toString().padStart(2, "0");
}

function buildMinuteOptions(step: number): string[] {
    const items: string[] = [];
    for (let m = 0; m < 60; m += step) {
        items.push(pad2(m));
    }
    return items;
}

function buildSecondOptions(step: number): string[] {
    const items: string[] = [];
    for (let s = 0; s < 60; s += step) {
        items.push(pad2(s));
    }
    return items;
}

function buildHourOptions24(): string[] {
    const items: string[] = [];
    for (let h = 0; h < 24; h++) {
        items.push(pad2(h));
    }
    return items;
}

function buildHourOptions12(): string[] {
    const items: string[] = [];
    for (let h = 1; h <= 12; h++) {
        items.push(h.toString());
    }
    return items;
}

/**
 * Safely create a new Date instance with updated time parts,
 * preserving the original date portion when possible.
 */
function withTime(
    base: Date | undefined,
    opts: { hours?: number; minutes?: number; seconds?: number },
): Date {
    const src = base ? new Date(base.getTime()) : new Date();
    const h = opts.hours ?? src.getHours();
    const m = opts.minutes ?? src.getMinutes();
    const s = opts.seconds ?? src.getSeconds();
    src.setHours(h, m, s, 0);
    return src;
}

/**
 * Drop-in time dropdown cluster for use in the date popover.
 *
 * Renders hour / minute (and optionally second) Selects plus
 * an AM/PM toggle when `use12Hour` is true.
 */
export const TimeDropdowns: React.FC<TimeDropdownsProps> = (props) => {
    const {
        value,
        onChange,
        showSeconds = false,
        minuteStep = 5,
        secondStep = 5,
        use12Hour = false,
        label,
        className,
        triggerClassName,
        density = "normal",
    } = props;

    const minuteOptions = React.useMemo(
        () => buildMinuteOptions(minuteStep),
        [minuteStep],
    );
    const secondOptions = React.useMemo(
        () => buildSecondOptions(secondStep),
        [secondStep],
    );

    const hourOptions = React.useMemo(
        () => (use12Hour ? buildHourOptions12() : buildHourOptions24()),
        [use12Hour],
    );

    // Derive current parts from value.
    let hours24 = value ? value.getHours() : 0;
    let minutes = value ? value.getMinutes() : 0;
    let seconds = value ? value.getSeconds() : 0;

    let hourDisplay: string;
    let period: "am" | "pm" | null = null;

    if (use12Hour) {
        period = hours24 >= 12 ? "pm" : "am";
        let h12 = hours24 % 12;
        if (h12 === 0) h12 = 12;
        hourDisplay = h12.toString();
    } else {
        hourDisplay = pad2(hours24);
    }

    const minuteDisplay = pad2(minutes);
    const secondDisplay = pad2(seconds);

    const baseTriggerClasses = cn(
        "h-8 w-[4.2rem] px-2 py-0 text-xs",
        "whitespace-nowrap",
        "border-input bg-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    );

    const triggerClasses = cn(
        baseTriggerClasses,
        triggerClassName,
        density === "compact" && "h-7 text-[0.7rem] px-1.5",
    );

    const gapClass = density === "compact" ? "gap-1" : "gap-2";

    const handleHourChange = (hStr: string) => {
        let nextHours24: number;

        if (use12Hour) {
            const h12 = parseInt(hStr, 10) || 0;
            if (!period) {
                // fallback: assume AM
                nextHours24 = h12 % 12;
            } else {
                if (period === "am") {
                    nextHours24 = h12 % 12; // 12am → 0
                } else {
                    nextHours24 = h12 % 12 + 12; // 12pm → 12, 1pm → 13
                }
            }
        } else {
            nextHours24 = parseInt(hStr, 10) || 0;
        }

        const nextDate = withTime(value, { hours: nextHours24 });
        onChange(nextDate);
    };

    const handleMinuteChange = (mStr: string) => {
        const m = parseInt(mStr, 10) || 0;
        const nextDate = withTime(value, { minutes: m });
        onChange(nextDate);
    };

    const handleSecondChange = (sStr: string) => {
        const s = parseInt(sStr, 10) || 0;
        const nextDate = withTime(value, { seconds: s });
        onChange(nextDate);
    };

    const handlePeriodChange = (p: string) => {
        if (!use12Hour) return;
        const nextPeriod = p === "pm" ? "pm" : "am";

        // Convert from current hours24 + new period.
        let h12 = hours24 % 12;
        if (h12 === 0) h12 = 12;

        let nextHours24: number;
        if (nextPeriod === "am") {
            nextHours24 = h12 % 12; // 12am → 0
        } else {
            nextHours24 = h12 % 12 + 12; // 12pm → 12, etc.
        }

        const nextDate = withTime(value, { hours: nextHours24 });
        onChange(nextDate);
    };

    return (
        <div
            className={cn(
                "flex w-full flex-col gap-2",
                density === "compact" && "gap-1",
                className,
            )}
            data-slot="time-dropdowns"
        >
            {label && (
                <div className="text-xs font-medium text-muted-foreground">
                    {label}
                </div>
            )}

            <div
                className={cn(
                    "flex w-full items-center",
                    gapClass,
                )}
                data-slot="time-dropdowns-row"
            >
                {/* Hour */}
                <Select value={hourDisplay} onValueChange={handleHourChange}>
                    <SelectTrigger
                        className={triggerClasses}
                        data-slot="time-hour"
                    >
                        <SelectValue placeholder="HH" />
                    </SelectTrigger>
                    <SelectContent>
                        {hourOptions.map((h) => (
                            <SelectItem key={h} value={h}>
                                {use12Hour ? h.padStart(2, " ") : pad2(Number(h))}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Minute */}
                <Select
                    value={minuteDisplay}
                    onValueChange={handleMinuteChange}
                >
                    <SelectTrigger
                        className={triggerClasses}
                        data-slot="time-minute"
                    >
                        <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                        {minuteOptions.map((m) => (
                            <SelectItem key={m} value={m}>
                                {m}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Second (optional) */}
                {showSeconds && (
                    <Select
                        value={secondDisplay}
                        onValueChange={handleSecondChange}
                    >
                        <SelectTrigger
                            className={triggerClasses}
                            data-slot="time-second"
                        >
                            <SelectValue placeholder="SS" />
                        </SelectTrigger>
                        <SelectContent>
                            {secondOptions.map((s) => (
                                <SelectItem key={s} value={s}>
                                    {s}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {/* AM/PM (optional) */}
                {use12Hour && (
                    <Select
                        value={period ?? "am"}
                        onValueChange={handlePeriodChange}
                    >
                        <SelectTrigger
                            className={cn(
                                triggerClasses,
                                "w-[3.8rem]",
                            )}
                            data-slot="time-period"
                        >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="am">AM</SelectItem>
                            <SelectItem value="pm">PM</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            </div>
        </div>
    );
};