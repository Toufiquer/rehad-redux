import React from "react";
import Loading from "../../../components/Loading/Loading";
import TableRow from "./TableRow";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useGetAssignmentsQuery } from "../../../redux/features/assignment/assignmentApi";

const AdminAssignment = () => {
  const { isError, error, isLoading, data } = useGetAssignmentsQuery();

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
              <th className="table-th"> Title</th>
              <th className="table-th">Video Title</th>
              <th className="table-th">Mark</th>
              <th className="table-th">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-600/50">
            {data.map((v) => (
              <TableRow key={v.id} data={v} />
            ))}
          </tbody>
        </table>
      </>
    );
  }
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <Link to="/admin/assignments/add " className={`  ml-auto`}>
                <button className="btn ">Add Assignment</button>
              </Link>
            </div>
            <div className="overflow-x-auto mt-4">{content}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminAssignment;
