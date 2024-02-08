import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteQuizMutation } from "../../../redux/features/quizzes/quizzesApi";
import { toast } from "react-toastify";

const TableRow = ({ data }) => {
  const [toggle, setToggle] = useState(false);
  const { question, video_title, id } = data || {};
  const [deleteQuiz, { isLoading }] = useDeleteQuizMutation();
  const handleDelete = () => {
    deleteQuiz(id);
    toast.success("Delete Successful", {
      toastId: (Math.random() * 1000).toFixed(0),
    });
  };
  const handleModal = (e) => {
    e.stopPropagation();
    setToggle((pre) => !pre);
  };
  return (
    <>
      <tr>
        <td title={question} className="table-td">
          Question {id}
          {": "}
          {question?.length > 30
            ? question.slice(0, 30).concat("...")
            : question}
        </td>
        <td title={video_title} className="table-td">
          {video_title?.length > 30
            ? video_title.slice(0, 30).concat("...")
            : video_title}
        </td>
        <td className="table-td flex gap-x-2">
          {/* Delete */}
          <svg
            onClick={handleModal}
            aria-disabled={isLoading}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:text-red-500 cursor-pointer transition-all"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
          {toggle && (
            <div
              onClick={handleModal}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
              <div className="relative bg-gray-600 rounded-lg shadow-lg p-6 text-white">
                <h2 className="text-lg font-medium mb-4">
                  Are You sure You want to Delete.
                </h2>
                <div className="flex justify-end">
                  <button
                    onClick={handleModal}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-blue-100 hover:bg-blue-200 text-white font-medium py-2 px-4 rounded"
                  >
                    <div className="text-red-500 font-semibold">Delete</div>
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Edit */}
          <Link to={`/admin/quizzes/update/${id}`}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
