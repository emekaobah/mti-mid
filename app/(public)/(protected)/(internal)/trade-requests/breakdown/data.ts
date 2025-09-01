export interface TradeData {
  organizationType: string;
  country: string;
  productName: string;
  hsCode: string;
  quantity: number;
  unit: string;
  frequency: string;
}

export const dummyTradeData: TradeData[] = [
  {
    organizationType: "Government",
    country: "Nigeria",
    productName: "Rice",
    hsCode: "1006.30",
    quantity: 50000,
    unit: "kg",
    frequency: "Monthly",
  },
  {
    organizationType: "Business Owner",
    country: "Tanzania",
    productName: "Coffee Beans",
    hsCode: "0901.11",
    quantity: 25000,
    unit: "kg",
    frequency: "Quarterly",
  },
  {
    organizationType: "Association",
    country: "Cameroon",
    productName: "Cocoa Beans",
    hsCode: "1801.00",
    quantity: 75000,
    unit: "kg",
    frequency: "Bi-annually",
  },
];
