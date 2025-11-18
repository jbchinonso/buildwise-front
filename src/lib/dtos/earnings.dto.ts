import { IEarningsChartData, IEarningsResponse } from "../type";
import { getMonth } from "../utils";

export function convertToChartData(
  data: IEarningsResponse
): IEarningsChartData[] {
  // Use a Map to group and merge commissions by month
  const mergedData = new Map<string | number, IEarningsChartData>();

  // 1. Process salesCommissions
  for (const item of data.salesCommissions) {
    const monthKey = getMonth(item.month);
    if (monthKey) {
      const existing = mergedData.get(monthKey) || { month: String(monthKey) };

      existing.salesCommission = item.amount;

      // Initialize amount if it doesn't exist, then add the new commission
      existing.amount = (existing.amount || 0) + item.amount;

      mergedData.set(monthKey, existing);
    }
  }

  // 2. Process subTitanCommissions
  for (const item of data.subTitanCommissions) {
    const monthKey = getMonth(item.month);
    if (monthKey) {
      const existing = mergedData.get(monthKey) || { month: String(monthKey) };

      existing.subTitanCommission = item.amount;

      // Initialize amount if it doesn't exist, then add the new commission
      // This is important for months only present in subTitanCommissions
      existing.amount = (existing.amount || 0) + item.amount;

      mergedData.set(monthKey, existing);
    }
  }

  // 3. Convert the Map values back to an array
  return Array.from(mergedData.values()) || [];
}
