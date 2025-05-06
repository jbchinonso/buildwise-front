
export const getTransactions = async (): Promise<User[]> => {
  // const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await fetch("https://dummyjson.com/c/db22-4fc9-4774-8468");

  return data.json();
};


