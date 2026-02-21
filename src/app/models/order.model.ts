export interface Order {
  id: string;
  productIds: string[];
  total: number;
  date: Date;
  status: 'completed' | 'abandoned' | 'pending';
  customerEmail?: string;
}
