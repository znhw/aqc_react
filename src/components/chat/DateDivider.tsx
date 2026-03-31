import { Divider } from "../ui/Divider";

export interface DateDividerProps {
    date: string;
}

export function DateDivider({ date }: DateDividerProps) {
    return <Divider label={date} className="date-divider" />;
}