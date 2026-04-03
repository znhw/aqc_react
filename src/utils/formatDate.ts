
// export function formatDate(dateString: string): string {
//     const date = new Date(dateString);
//     const today = new Date();
//     const yesterday = new Date();
//     yesterday.setDate(today.getDate() - 1);

//     if (isSameDay(date, today)) return 'Today';
//     if (isSameDay(date, yesterday)) return 'Yesterday';{
    
//         return date.toLocaleDateString('en-US', { 
//             month: 'short', 
//             day: 'numeric', 
//             year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined 
//         });
//     }   

//     function isSameDay(date1: Date, date2: Date): boolean {
//         return (
//             date1.getFullYear() === date2.getFullYear() &&
//             date1.getMonth() === date2.getMonth() &&
//             date1.getDate() === date2.getDate()
//         )
//     }
// }

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const today = new Date();
    
    // Check if the date is valid
    if (isNaN(date.getTime())) return '';

    // Format the time (e.g., "10:30 AM")
    const timeStr = date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
    });

    if (isSameDay(date, today)) {
        return timeStr; // Returns just "10:30 AM"
    }

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (isSameDay(date, yesterday)) {
        return `Yesterday, ${timeStr}`; // Returns "Yesterday, 10:30 AM"
    }

    // For older dates: "Apr 3, 10:30 AM"
    const dateStr = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });

    return `${dateStr}, ${timeStr}`;

    function isSameDay(d1: Date, d2: Date): boolean {
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
        );
    }
}

