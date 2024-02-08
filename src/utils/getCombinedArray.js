// modify quiz and assignment mark  as it is a single array of objects. which don't have multiple student with same id. and add a new key called [second argument].
// It receives two arguments first is array and second is object keys
export const combinedArray = (arr, nameOfKye) => {
  const modifiedArr = arr.reduce((acc, curr) => {
    const studentIndex = acc.findIndex(
      (student) => student.student_id === curr.student_id
    );
    if (studentIndex !== -1) {
      acc[studentIndex][nameOfKye] += parseInt(curr.mark);
    } else {
      acc.push({ ...curr, [nameOfKye]: parseInt(curr.mark) });
    }
    return acc;
  }, []);
  return modifiedArr;
};
