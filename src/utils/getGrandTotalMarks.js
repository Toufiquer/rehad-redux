// combine two arrays. which have all of keys, but don't have multiple student with same student id. and add a new key called grandTotalMarks, which calculates total number of totalQuizMark and totalAssignmentMark.
// Remove key => mark quiz_id totalCorrect totalMark totalQuiz totalWrong video_id video_title
// It received two arrays as arguments
export const grandTotalMarks = (arr1, arr2) => {
  const combinedArray = [...arr1, ...arr2];
  const result = [];

  combinedArray.forEach((item) => {
    const index = result.findIndex((i) => i.student_id === item.student_id);
    if (index === -1) {
      const newItem = { ...item };
      newItem.grandTotalMarks = parseInt(item.totalQuizMark)
        ? parseInt(item.totalQuizMark)
        : parseInt(item.totalAssignmentMark) || 0;
      delete newItem.mark;
      delete newItem.quiz_id;
      delete newItem.totalCorrect;
      delete newItem.totalMark;
      delete newItem.totalQuiz;
      delete newItem.totalWrong;
      delete newItem.video_id;
      delete newItem.video_title;
      result.push(newItem);
    } else {
      result[index].grandTotalMarks += parseInt(item.totalQuizMark)
        ? parseInt(item.totalQuizMark)
        : parseInt(item.totalAssignmentMark);
      if (item.totalAssignmentMark) {
        result[index].totalAssignmentMark = parseInt(item.totalAssignmentMark);
      }
    }
  });

  return result;
};
