import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import SingleQuiz from "./SingleQuiz";
import CustomButton from "../CustomButton/CustomButton";
import { useGetQuizzesQuery } from "../../redux/features/quizzes/quizzesApi";

const Quiz = ({ id }) => {
  const [submittedQuiz, setSubmittedQuiz] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [quiz, setQuiz] = useState([{ id: 1 }]);
  const [currentQuiz, setCurrentQuiz] = useState(quiz[0]);
  const { data } = useGetQuizzesQuery();
  const findQuizzesByVideoId = (quizzes, video_id) => {
    if (quizzes?.length > 0) {
      return quizzes.filter(
        (quiz) => parseInt(quiz.video_id) === parseInt(video_id)
      );
    }
  };

  useEffect(() => {
    // First Load Quizzes
    if (data?.length > 0) {
      const isExist = findQuizzesByVideoId(data, parseInt(id));
      if (isExist) {
        setCurrentQuiz(isExist[0]);
        setQuiz(isExist);
      }
    }
  }, [data, id]);
  const modal = () => {
    setToggle((preState) => !preState);
  };
  //   First hit the assignment button
  const onClick = () => {
    modal();
  };
  //   To Close the modal
  const onClose = () => {
    modal();
  };
  //   if the user clicks submit, close the modal
  const handleSubmit = (event) => {
    event?.preventDefault();
    setSubmittedQuiz(selectedOptions);
    setSelectedOptions([]);
    modal();
  };
  //   Find next quiz and set it to currentQuiz
  const handleNext = (id) => {
    const findNextQuiz = quiz.find((quiz) => quiz?.id === id + 1);
    if (findNextQuiz?.id) {
      setCurrentQuiz(findNextQuiz);
      setSubmittedQuiz(selectedOptions);
      setSelectedOptions([]);
    }
  };
  const handlePrevious = (id) => {
    const findNextQuiz = quiz.find((quiz) => quiz?.id === id - 1);
    if (findNextQuiz?.id) {
      setCurrentQuiz(findNextQuiz);
      setSubmittedQuiz(selectedOptions);
      setSelectedOptions([]);
    }
  };
  return (
    data?.length > 0 && (
      <>
        <button
          onClick={onClick}
          className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
        >
          কুইজে অংশগ্রহণ করুন
        </button>
        <>
          <Modal
            //  dismissible={true}
            show={toggle}
            onClose={onClose}
            size="max-w-7xl"
          >
            {/* Question */}
            {/* <Modal.Body> */}
            <form onSubmit={handleSubmit}>
              <section className="p-6 bg-primary">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold">
                      Quizzes for "Debounce Function in JavaScript - JavaScript
                      Job Interview question"
                    </h1>
                    <p className="text-sm text-slate-200">
                      Each question contains 5 Mark
                    </p>
                  </div>
                  <div className="space-y-8 ">
                    <SingleQuiz
                      quiz={currentQuiz}
                      setSubmittedQuiz={setSubmittedQuiz}
                      selectedOptions={selectedOptions}
                      setSelectedOptions={setSelectedOptions}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    {/* Close Button always show */}
                    <CustomButton handler={onClose} type="close">
                      Close
                    </CustomButton>
                    {/* Close Button */}
                    <div className="flex ml-auto gap-2" type="close">
                      {/* Previous Button if current quiz is first quiz then  render it otherwise don't  render it.*/}
                      {quiz[0]?.id !== currentQuiz?.id && (
                        <CustomButton
                          handler={handlePrevious}
                          id={currentQuiz?.id}
                        >
                          Previous
                        </CustomButton>
                      )}
                      {/* // Previous Button */}
                      {/* Next Button if current quiz is first quiz then don't render otherwise it's render */}
                      {quiz[quiz.length - 1]?.id !== currentQuiz?.id ? (
                        <CustomButton handler={handleNext} id={currentQuiz?.id}>
                          Next
                        </CustomButton>
                      ) : (
                        // Submit Button if current quiz is last quiz then render it.
                        <CustomButton handler={handleSubmit} type="submit">
                          Submit
                        </CustomButton>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </Modal>
        </>
      </>
    )
  );
};

export default Quiz;
