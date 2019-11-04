export interface HistoricalCurrency {
  success: boolean;
  timestamp: number;
  historical: boolean;
  base: string;
  date: Date;
  rates: { [key: string]: number };
}
