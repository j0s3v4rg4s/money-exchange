export interface LatestConvert {
  success: boolean;
  timestamp: number;
  base: string;
  date: Date | string;
  rates: { [key: string]: number };
}
