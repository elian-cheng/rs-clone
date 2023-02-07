export const sameDay = (dateJSON: string) => {
  const date = new Date(dateJSON);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth()
  );
};

export const checkIsNaN = (value: number) => (Number.isNaN(value) ? 0 : value);
