import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddAssignmentMutation } from "../../../redux/features/assignment/assignmentApi";
import { useGetVideosQuery } from "../../../redux/features/videos/videosApi";
const initialState = {
  video_id: "",
  video_title: "",
};
const AddAssignment = () => {
  const [title, setTitle] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [videoTitleId, setVideoTitleId] = useState(initialState);
  const [error, setError] = useState("");
  const {
    data,
    isLoading: videoIsLoading,
    isError: videoIsError,
    error: getVideosError,
  } = useGetVideosQuery();
  const clearForm = () => {
    setTitle("");
    setTotalMark("");
    setVideoTitleId(initialState);
    setError("");
  };
  // const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [
    addAssignment,
    { isSuccess, isLoading, isError, error: addAssignmentError },
  ] = useAddAssignmentMutation();
  useEffect(() => {
    error && toast.error(error, { toastId: (Math.random() * 1000).toFixed(0) });
  }, [error]);
  useEffect(() => {
    if (isError) {
      setError(addAssignmentError.error);
    }
  }, [isError, addAssignmentError]);
  useEffect(() => {
    if (isSuccess) {
      clearForm();
      toast.success("Assignment Add successfully", {
        toastId: (Math.random() * 1000).toFixed(0),
      });
      navigate("/admin/assignments");
    }
  }, [isSuccess, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const currAssignment = {
      title,
      totalMark,
      video_id: videoTitleId.video_id,
      video_title: videoTitleId.video_title,
    };
    addAssignment(currAssignment);
  };
  const selectVideoTitle = data?.map((item) => {
    const data = { video_title: item.title, video_id: item.id };
    return (
      <option key={data.video_id} value={data.video_id}>
        {data.video_title}
      </option>
    );
  });
  return (
    <>
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto w-full px-5 lg:px-0">
          <div className="max-w-lg mx-auto">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                Add a new Assignment
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="sr-only">
                    Assignment Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="true"
                    required
                    className="login-input rounded-t-md text-white"
                    placeholder="Assignment Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                {/* TotalMark */}
                <div>
                  <label htmlFor="totalMark" className="sr-only">
                    TotalMark
                  </label>
                  <input
                    id="totalMark"
                    name="totalMark"
                    type="totalMark"
                    autoComplete="true"
                    required
                    className="login-input rounded-t-md text-white"
                    placeholder="TotalMark"
                    value={totalMark}
                    onChange={(e) => setTotalMark(e.target.value)}
                  />
                </div>{" "}
                {/* Selected Video Title */}
                <select
                  onChange={(e) => {
                    const selectedOption = data.find(
                      (item) => item.id === parseInt(e.target.value)
                    );
                    setVideoTitleId({
                      ...videoTitleId,
                      video_id: selectedOption.id,
                      video_title: selectedOption.title,
                    });
                  }}
                  className="form-select block w-full mt-1 bg-gray-700 text-white"
                >
                  {selectVideoTitle}
                </select>
              </div>

              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                  Add Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddAssignment;
