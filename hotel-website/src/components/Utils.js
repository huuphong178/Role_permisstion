const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};
const newPerson = (index) => {
  const statusChance = Math.random();
  return {
    index:index+1,
    wallet: Math.floor(Math.random()*13 + 902332111),
    walletid: Math.random() + 101231232320,
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 200),
    progress: Math.floor(Math.random() * 500),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
        ? "complicated"
        : "single"
  };
};

export function makeData(len = 5553) {
  return range(len).map((d,index) => {
    return {
      ...newPerson(index),
      children: range(10).map(newPerson)
    };
  });
}
