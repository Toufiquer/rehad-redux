import React from "react";

const SingleTable = ({ data }) => {
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
      {" "}
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        <thead>
          <tr>
            <th className="table-th !text-center">Rank</th>
            <th className="table-th !text-center">Name</th>
            <th className="table-th !text-center">Quiz Mark</th>
            <th className="table-th !text-center">Assignment Mark</th>
            <th className="table-th !text-center">Total</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-2 border-cyan">
            <td className="table-td text-center font-bold">{position}</td>
            <td className="table-td text-center font-bold">{student_name}</td>
            <td className="table-td text-center font-bold">{totalQuizMark}</td>
            <td className="table-td text-center font-bold">
              {totalAssignmentMark}
            </td>
            <td className="table-td text-center font-bold">
              {grandTotalMarks}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default SingleTable;
