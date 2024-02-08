import React, { useEffect, useState } from "react";
import { useUpdateAssignmentMarkMutation } from "../../../redux/features/assignmentMark/assignmentMarkApi";
import { toast } from "react-toastify";

const RowMarks = ({ data }) => {
  const {
    student_name,
    title,
    createdAt,
    repo_link,
    mark,
    status,
    id,
    totalMark,
  } = data || {};

  const [givenMark, setGivenMark] = useState(0);
  const [updateAssignmentMark, { isLoading, isError, isSuccess, error }] =
    useUpdateAssignmentMarkMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Mark given successfully", {
        toastId: (Math.random() * 1000).toFixed(0),
      });
    }
  }, [isSuccess]);
  if (!isLoading && isError) {
    toast.error(error.message, {
      toastId: (Math.random() * 1000).toFixed(0),
    });
  }
  const handleUpdate = () => {
    if (totalMark >= givenMark) {
      const updateData = { ...data, mark: givenMark, status: "published" };
      updateAssignmentMark({ id, data: updateData });
    } else {
      toast.error(`Max number is ${totalMark}`, {
        toastId: (Math.random() * 1000).toFixed(0),
      });
      setGivenMark(0);
    }
  };
  return (
    <>
      <tr>
        <td className="table-td">{title}</td>
        <td className="table-td">{createdAt}</td>
        <td className="table-td">{student_name}</td>
        <td className="table-td">{repo_link}</td>
        {status === "pending" ? (
          <td className="table-td input-mark">
            <input
              value={givenMark}
              onChange={(e) => setGivenMark(e.target.value)}
              max="100"
            />
            <svg
              onClick={handleUpdate}
              disabled={isLoading}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </td>
        ) : (
          <td className="table-td">{mark}</td>
        )}
      </tr>
    </>
  );
};

export default RowMarks;
