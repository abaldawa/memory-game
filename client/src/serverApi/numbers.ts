const GET_RANDOM_NUMBERS = "/numbers/random";

const getUniqueRandomNumbers = async (
  start: number,
  end: number,
  size: number
): Promise<number[]> => {
  const res = await fetch(
    `${GET_RANDOM_NUMBERS}?start=${start}&end=${end}&size=${size}`
  );
  return res.json();
};

export { getUniqueRandomNumbers };
