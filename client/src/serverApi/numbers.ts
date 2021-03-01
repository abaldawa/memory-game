const GET_RANDOM_NUMBERS = "/numbers/random";

const getUniqueRandomNumbers = async <T>(
  start: number,
  end: number,
  size: number
): Promise<T> => {
  const res = await fetch(
    `${GET_RANDOM_NUMBERS}?start=${start}&end=${end}&size=${size}`
  );
  return res.json();
};

export { getUniqueRandomNumbers };
