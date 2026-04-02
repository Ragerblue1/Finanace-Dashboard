const categories = ["Food", "Salary", "Shopping", "Transport", "Freelance", "Bills"];
const types = ["income", "expense"];
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function generateUserTransactions(userId, count = 30) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const type = getRandom(types);
    data.push({
      id: `${userId}-${i}`,
      userId,
      date: `2026-04-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      amount: Math.floor(Math.random() * 10000) + 500,
      category: getRandom(categories),
      type,
    });
  }
  return data;
}

export const transactionsInitial = [
  ...generateUserTransactions(1),
  ...generateUserTransactions(2),
  ...generateUserTransactions(3),
  ...generateUserTransactions(4),
  ...generateUserTransactions(5),
];