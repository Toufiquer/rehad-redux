import React from "react";
import TableRow from "./TableRow";

const StudentsTable = ({ data }) => {
  // decided what to render
  let content;
  if (data.length > 0) {
    content = data.map((curr) => (
      <TableRow key={curr.student_id} data={curr} />
    ));
  }
  return (
    <>
      <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
        <thead>
          <tr className="border-b border-slate-600/50">
            <th className="table-th !text-center">Rank</th>
            <th className="table-th !text-center">Name</th>
            <th className="table-th !text-center">Quiz Mark</th>
            <th className="table-th !text-center">Assignment Mark</th>
            <th className="table-th !text-center">Total</th>
          </tr>
        </thead>

        <tbody>
          {content}

          {/* <tr className="border-slate-600/50">
            <td className="table-td text-center">4</td>
            <td className="table-td text-center">Saad Hasan</td>
            <td className="table-td text-center">50</td>
            <td className="table-td text-center">50</td>
            <td className="table-td text-center">100</td>
          </tr> */}
        </tbody>
      </table>
    </>
  );
};

export default StudentsTable;
