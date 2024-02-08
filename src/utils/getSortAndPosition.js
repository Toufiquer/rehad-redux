// 3. sort the array by using grandTotalMarks. if the marks is smaller then the position will be same.
export const sortAndPosition = (arr) => {
  const grandTotal = [...arr];
  // Sort the array in descending order based on grandTotalMarks
  grandTotal.sort((a, b) => b.grandTotalMarks - a.grandTotalMarks);

  // Add position key to each object by their position
  let position = 1;
  for (let i = 0; i < grandTotal.length; i++) {
    if (
      i > 0 &&
      grandTotal[i].grandTotalMarks < grandTotal[i - 1].grandTotalMarks
    ) {
      position++;
    }

    grandTotal[i].position = position;
  }
  return grandTotal;
};
