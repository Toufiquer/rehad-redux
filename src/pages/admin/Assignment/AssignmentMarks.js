import React from "react";
import { useGetAssignmentMarksQuery } from "../../../redux/features/assignmentMark/assignmentMarkApi";
import Loading from "../../../components/Loading/Loading";
import { toast } from "react-toastify";
import RowMarks from "./RowMarks";

const AssignmentMarks = () => {
  const { data, isLoading, isError, error } = useGetAssignmentMarksQuery();
  let content;
  if (isLoading && !isError) {
    content = <Loading />;
  }
  if (!isLoading && isError) {
    toast.error(error.message, { toastId: (Math.random() * 1000).toFixed(0) });
  }
  if (!isLoading && !isError && data?.length === 0) {
    content = <h2>Ops! Nothing was Found.</h2>;
  }
  if (!isLoading && !isError && data?.length > 0) {
    content = (
      <>
        <table className="divide-y-1 text-base divide-gray-600 w-full">
          <thead>
            <tr>
              <th className="table-th">Assignment</th>
              <th className="table-th">Date</th>
              <th className="table-th">Student Name</th>
              <th className="table-th">Repo Link</th>
              <th className="table-th">Mark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-600/50">
            {data.map((v) => (
              <RowMarks key={v.id} data={v} />
            ))}
          </tbody>
        </table>
      </>
    );
  }
  const totalStatus = data?.reduce((acc, curr) => {
    if (curr.status === "pending") {
      acc.pending = (acc.pending || 0) + 1;
    } else if (curr.status === "published") {
      acc.published = (acc.published || 0) + 1;
    }
    return acc;
  }, {});
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <ul className="assignment-status">
              <li>
                Total <span>{data?.length}</span>
              </li>
              <li>
                Pending <span>{totalStatus?.pending}</span>
              </li>
              <li>
                Mark Sent <span>{totalStatus?.published}</span>
              </li>
            </ul>
            <div className="overflow-x-auto mt-4">{content}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AssignmentMarks;
