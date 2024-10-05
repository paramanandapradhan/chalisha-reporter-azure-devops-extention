export function todayStart() {
    let date = new Date();
    date.setHours(0, 0, 0, 0)
    return date;
}

export function todayEnd() {
    let date = new Date();
    date.setHours(23, 59, 59, 999)
    return date;
}

// Get the start of tomorrow
export function tomorrowStart() {
    const date = new Date();
    date.setDate(date.getDate() + 1); // Move to tomorrow
    date.setHours(0, 0, 0, 0); // Set time to 00:00:00
    return date;
}

// Get the end of tomorrow
export function tomorrowEnd() {
    const date = new Date();
    date.setDate(date.getDate() + 1); // Move to tomorrow
    date.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
    return date;
}

// Get the start of yesterday
export function yesterdayStart() {
    const date = new Date();
    date.setDate(date.getDate() - 1); // Move to yesterday
    date.setHours(0, 0, 0, 0); // Set time to 00:00:00
    return date;
}

// Get the end of yesterday
export function yesterdayEnd() {
    const date = new Date();
    date.setDate(date.getDate() - 1); // Move to yesterday
    date.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
    return date;
}

// Get the start of this week (Monday)
export function thisWeekStart() {
    const date = new Date();
    const day = date.getDay() || 7; // Get current day, treat Sunday (0) as 7
    if (day !== 1) date.setHours(-24 * (day - 1)); // Move to Monday
    date.setHours(0, 0, 0, 0); // Set time to 00:00:00
    return date;
}

// Get the end of this week (Sunday)
export function thisWeekEnd() {
    const date = new Date();
    const day = date.getDay();
    const diff = 7 - day;
    date.setDate(date.getDate() + diff); // Move to Sunday
    date.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
    return date;
}

// Get the start of next week (next Monday)
export function nextWeekStart() {
    const date = new Date();
    const day = date.getDay() || 7;
    date.setDate(date.getDate() + (8 - day)); // Move to next Monday
    date.setHours(0, 0, 0, 0); // Set time to 00:00:00
    return date;
}

// Get the end of next week (next Sunday)
export function nextWeekEnd() {
    const date = new Date();
    const day = date.getDay();
    const diff = 14 - day;
    date.setDate(date.getDate() + diff); // Move to next Sunday
    date.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
    return date;
}

// Get the start of this month
export function thisMonthStart() {
    const date = new Date();
    date.setDate(1); // Set day to 1st
    date.setHours(0, 0, 0, 0); // Set time to 00:00:00
    return date;
}

// Get the end of this month
export function thisMonthEnd() {
    const date = new Date();
    date.setMonth(date.getMonth() + 1); // Move to next month
    date.setDate(0); // Set to the last day of previous month (which is the last day of this month)
    date.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
    return date;
}

// Get the start of next month
export function nextMonthStart() {
    const date = new Date();
    date.setMonth(date.getMonth() + 1); // Move to next month
    date.setDate(1); // Set day to 1st
    date.setHours(0, 0, 0, 0); // Set time to 00:00:00
    return date;
}

// Get the end of next month
export function nextMonthEnd() {
    const date = new Date();
    date.setMonth(date.getMonth() + 2); // Move to the month after next
    date.setDate(0); // Set to the last day of previous month (which is the last day of next month)
    date.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
    return date;
}

// Get the start of the previous month
export function prevMonthStart() {
    const date = new Date();
    date.setMonth(date.getMonth() - 1); // Move to the previous month
    date.setDate(1); // Set day to 1st
    date.setHours(0, 0, 0, 0); // Set time to 00:00:00
    return date;
}

// Get the end of the previous month
export function prevMonthEnd() {
    const date = new Date();
    date.setDate(0); // Set to the last day of the previous month
    date.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
    return date;
}


// Get the start of the next 30-day period
export function next30DaysStart() {
    const date = new Date();
    date.setDate(date.getDate()); // Start from tomorrow
    date.setHours(0, 0, 0, 0); // Set time to 00:00:00
    return date;
}

// Get the end of the next 30-day period
export function next30DaysEnd() {
    const date = new Date();
    date.setDate(date.getDate() + 30); // Move to the date 30 days ahead
    date.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
    return date;
}

/**
 * Function to find IDs that are newly added to array2 compared to array1.
 * @param array1 - The original array of IDs.
 * @param array2 - The updated array of IDs.
 * @returns An array of IDs that are present in array2 but not in array1.
 */
export function findAddedItems(array1: string[], array2: string[]): string[] {
  const set1 = new Set(array1);
  return array2.filter(id => !set1.has(id));
}

/**
 * Function to find IDs that have been removed from array1 compared to array2.
 * @param array1 - The original array of IDs.
 * @param array2 - The updated array of IDs.
 * @returns An array of IDs that are present in array1 but not in array2.
 */
export function findRemovedItems(array1: string[], array2: string[]): string[] {
  const set2 = new Set(array2);
  return array1.filter(id => !set2.has(id));
}