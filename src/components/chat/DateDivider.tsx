import { Divider } from "../ui/Divider";
import { formatDate } from "../../utils/formatDate";

export interface DateDividerProps {
    date: string;
}

export function DateDivider({ date }: DateDividerProps) {
    const formattedDate = formatDate(date);

    return <Divider label={ formattedDate } className="date-divider" />;
}