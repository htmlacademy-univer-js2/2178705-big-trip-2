const getRandomNum = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomElementsArray = (arr, count) => {
  const copiedArray = arr.slice();
  const newArray = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = getRandomNum(0, copiedArray.length - 1);
    newArray.push(copiedArray[randomIndex]);
    copiedArray.splice(randomIndex, 1);
  }

  return newArray;
};

console.log(getRandomElementsArray([1, 2, 3], 1));

export { getRandomNum, getRandomElementsArray };
