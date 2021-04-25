export interface IData {
  id: string;
  company: string;
  createdAt: string;
  dueDate: string;
  amount: {
    sum: number;
    currencyName: string;
    currencySymbol: string;
    currencyCode: string;
  }
  completed?: boolean;
  status?: string;
  index?: string;
  isChecked?: boolean;
};
