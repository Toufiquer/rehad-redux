import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetVideosQuery } from "../../../redux/features/videos/videosApi";
import { useAddQuizMutation } from "../../../redux/features/quizzes/quizzesApi";
const initialState = { isCorrect: false, option: "" };
const AddQuiz = () => {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState(initialState);
  const [option2, setOption2] = useState(initialState);
  const [option3, setOption3] = useState(initialState);
  const [option4, setOption4] = useState(initialState);
  const [videoTitleId, setVideoTitleId] = useState({
    video_title: "",
    video_id: "",
  });
  const [error, setError] = useState("");
  const [
    addQuiz,
    {
      isSuccess,
      isError: addIsError,
      error: addError,
      isLoading: addIsLoading,
    },
  ] = useAddQuizMutation();
  const clearForm = () => {
    setQuestion("");
    setOption1(initialState);
    setOption2(initialState);
    setOption3(initialState);
    setOption4(initialState);
    setVideoTitleId({ video_title: "", video_id: "" });
    setError("");
  };
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isError,
    error: getVideosError,
  } = useGetVideosQuery();
  if (!addIsLoading && addIsError) {
    setError(addError.error);
  }
  useEffect(() => {
    if (isSuccess) {
      clearForm();
      toast.success("Add successfully", {
        toastId: (Math.random() * 1000).toFixed(0),
      });
      navigate("/admin/quizzes");
    }
  }, [isSuccess, navigate]);
  useEffect(() => {
    error && toast.error(error, { toastId: (Math.random() * 1000).toFixed(0) });
  }, [error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      question,
      options: [
        {
          id: 1,
          option: option1.option,
          isCorrect: option1.isCorrect,
        },
        {
          id: 2,
          option: option2.option,
          isCorrect: option2.isCorrect,
        },
        {
          id: 3,
          option: option3.option,
          isCorrect: option3.isCorrect,
        },
        {
          id: 4,
          option: option4.option,
          isCorrect: option4.isCorrect,
        },
      ],
      video_id: videoTitleId.video_id,
      video_title: videoTitleId.video_title,
    };
    addQuiz(data);
    // console.log(currQuiz, " => Line No: 71");
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
                Add a new Quiz
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                {/* Question */}
                <div>
                  <label htmlFor="question" className="sr-only">
                    Quiz Question
                  </label>
                  <input
                    id="question"
                    name="question"
                    type="question"
                    autoComplete="true"
                    required
                    className="login-input rounded-t-md text-white"
                    placeholder="Quiz Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>
                {/* Option 1 */}
                <div>
                  <label htmlFor="option1" className="sr-only">
                    Option 1
                  </label>
                  {/* Option 1 Answer Input */}
                  <input
                    id="option1"
                    name="option1"
                    type="option1"
                    autoComplete="true"
                    required
                    className="login-input rounded-t-md text-white"
                    placeholder=" Option 1 (Answer)"
                    value={option1.option}
                    onChange={(e) =>
                      setOption1({ ...option1, option: e.target.value })
                    }
                  />
                  {/* // Selected Option true or false Option 1 */}
                  <div className="relative w-full  flex">
                    <label
                      htmlFor="option1"
                      className="login-input rounded-t-md text-white"
                    >
                      Answer is: (For Option 1)
                    </label>
                    <div className="inline ml-auto w-1/2">
                      <select
                        value={option1.isCorrect}
                        onChange={(e) =>
                          setOption1({ ...option1, isCorrect: e.target.value })
                        }
                        className="inline appearance-none bg-gray-700 text-white w-full px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* Option 2 */}
                <div>
                  <label htmlFor="option2" className="sr-only">
                    Option 2
                  </label>
                  <input
                    id="option2"
                    name="option2"
                    type="option2"
                    autoComplete="true"
                    required
                    className="login-input rounded-t-md text-white"
                    placeholder=" Option 2 (Answer)"
                    value={option2.option}
                    onChange={(e) =>
                      setOption2({ ...option2, option: e.target.value })
                    }
                  />
                  {/* // Selected Option true or false Option 2*/}
                  <div className="relative w-full  flex">
                    <label
                      htmlFor="option2"
                      className="login-input rounded-t-md text-white"
                    >
                      Answer is: (For Option 2)
                    </label>
                    <div className="inline ml-auto w-1/2">
                      <select
                        value={option2.isCorrect}
                        onChange={(e) =>
                          setOption2({ ...option2, isCorrect: e.target.value })
                        }
                        className="inline appearance-none bg-gray-700 text-white w-full px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* Option 3 */}
                <div>
                  <label htmlFor="option3" className="sr-only">
                    Option 3
                  </label>
                  <input
                    id="option3"
                    name="option3"
                    type="option3"
                    autoComplete="true"
                    required
                    className="login-input rounded-t-md text-white"
                    placeholder=" Option 3 (Answer)"
                    value={option3.option}
                    onChange={(e) =>
                      setOption3({ ...option3, option: e.target.value })
                    }
                  />
                  {/* // Selected Option true or false Option 2*/}
                  <div className="relative w-full  flex">
                    <label
                      htmlFor="option3"
                      className="login-input rounded-t-md text-white"
                    >
                      Answer is: (For Option 3)
                    </label>
                    <div className="inline ml-auto w-1/2">
                      <select
                        value={option3.isCorrect}
                        onChange={(e) =>
                          setOption3({ ...option3, isCorrect: e.target.value })
                        }
                        className="inline appearance-none bg-gray-700 text-white w-full px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* Option 4 */}
                <div>
                  <label htmlFor="option4" className="sr-only">
                    Option 4
                  </label>
                  <input
                    id="option4"
                    name="option4"
                    type="option4"
                    autoComplete="true"
                    required
                    className="login-input rounded-t-md text-white"
                    placeholder=" Option 4 (Answer)"
                    value={option4.option}
                    onChange={(e) =>
                      setOption4({ ...option4, option: e.target.value })
                    }
                  />
                  {/* // Selected Option true or false Option 2*/}
                  <div className="relative w-full  flex">
                    <label
                      htmlFor="option4"
                      className="login-input rounded-t-md text-white"
                    >
                      Answer is: (For Option 4)
                    </label>
                    <div className="inline ml-auto w-1/2">
                      <select
                        value={option4.isCorrect}
                        onChange={(e) =>
                          setOption4({ ...option4, isCorrect: e.target.value })
                        }
                        className="inline appearance-none bg-gray-700 text-white w-full px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
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

              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                  Add Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddQuiz;
