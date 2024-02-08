import React from "react";

const TableRow = ({ data }) => {
  // console.log(, ' => Line No: 4');
  const {
    grandTotalMarks = 0,
    id,
    position,
    student_id,
    student_name = 0,
    totalAssignmentMark = 0,
    totalQuizMark = 0,
  } = data || {};
  return (
    <>
      <tr className="border-b border-slate-600/50">
        <td className="table-td text-center">{position}</td>
        <td className="table-td text-center">{student_name}</td>
        <td className="table-td text-center">{totalQuizMark}</td>
        <td className="table-td text-center">{totalAssignmentMark}</td>
        <td className="table-td text-center">{grandTotalMarks}</td>
      </tr>
    </>
  );
};

export default TableRow;
