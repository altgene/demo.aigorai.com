interface BudgetLevel {
  role: string;
  laptopBudget: number;
  phoneBudget: number;
  tabletBudget: number;
}

const budgetLevels: BudgetLevel[] = [
  { role: 'Intern', laptopBudget: 800, phoneBudget: 300, tabletBudget: 400 },
  { role: 'Junior', laptopBudget: 1000, phoneBudget: 500, tabletBudget: 600 },
  { role: 'Mid-level', laptopBudget: 1200, phoneBudget: 800, tabletBudget: 900 },
  { role: 'Senior', laptopBudget: 1500, phoneBudget: 1000, tabletBudget: 1200 },
  { role: 'Manager', laptopBudget: 2000, phoneBudget: 1200, tabletBudget: 1500 },
];

export function getUserBudget(userRole: string): BudgetLevel | undefined {
  return budgetLevels.find(level => level.role.toLowerCase() === userRole.toLowerCase());
}

export function isWithinBudget(userRole: string, itemType: 'laptop' | 'phone' | 'tablet', price: number): boolean {
  const budget = getUserBudget(userRole);
  if (!budget) return false;

  switch (itemType) {
    case 'laptop':
      return price <= budget.laptopBudget;
    case 'phone':
      return price <= budget.phoneBudget;
    case 'tablet':
      return price <= budget.tabletBudget;
    default:
      return false;
  }
}

