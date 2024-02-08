import { Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { useGetAssignmentsQuery } from "../../redux/features/assignment/assignmentApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useAddAssignmentMarkMutation,
  useGetAssignmentMarksQuery,
} from "../../redux/features/assignmentMark/assignmentMarkApi";

const Assignment = ({ id }) => {
  const [toggle, setToggle] = useState(false);
  const { data } = useGetAssignmentsQuery();
  const [addAssignment, { isSuccess }] = useAddAssignmentMarkMutation();
  const { data: submittedAssignmentsMarks } = useGetAssignmentMarksQuery();
  const studentAuth = useSelector((state) => state.studentAuth);
  const [submitUrl, setSubmitUrl] = useState("");
  const modal = () => {
    setToggle((preState) => !preState);
  }; // Find the assignment
  const findAssignmentByVideoId = (assignments, video_id) => {
    if (assignments?.length > 0) {
      return assignments.find((assignment) => assignment.video_id === video_id);
    }
  };
  function checkStudentAssignment(arr, studentId, assignmentId) {
    console.log(arr, studentId, assignmentId, " => Line No: 28");
    if (arr?.length > 0 && studentId && assignmentId) {
      for (let i = 0; i < arr.length; i++) {
        if (
          arr[i].student_id === studentId &&
          arr[i].assignment_id === assignmentId
        ) {
          return true;
        }
      }
    }
    return false;
  }

  // Usage example:
  useEffect(() => {
    if (isSuccess) {
      setSubmitUrl();
      toast.success("Assignment have been Submitted", {
        toastId: (Math.random() * 1000).toFixed(0),
      });
    }
  }, [isSuccess]);
  const result = findAssignmentByVideoId(data, parseInt(id));
  const isSubmitted = checkStudentAssignment(
    submittedAssignmentsMarks,
    parseInt(studentAuth?.data?.id),
    parseInt(result?.id)
  );
  // console.log(result2, " => Line No: 36");
  //   First hit the assignment button
  const onClick = () => {
    modal();
  };
  //   To Close the modal
  const onClose = () => {
    modal();
  };
  //   if the user clicks submit, close the modal
  const handleSubmit = () => {
    const addData = {
      student_id: studentAuth.data.id,
      student_name: studentAuth.data.name,
      assignment_id: result.id,
      title: result.title,
      createdAt: new Date().toISOString(),
      totalMark: result.totalMark,
      mark: 0,
      repo_link: submitUrl,
      status: "pending",
    };
    addAssignment(addData);
    modal();
  };

  return result?.id && !isSubmitted ? (
    <>
      <button
        onClick={onClick}
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      >
        এসাইনমেন্ট
      </button>
      <Modal
        //  dismissible={true}
        show={toggle}
        onClose={onClose}
        size="max-w-4xl"
      >
        {/* Question */}
        {/* <Modal.Body> */}
        <section className="p-6 bg-primary">
          <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <div className="space-y-8 ">
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="assignment"
                    value="Submit your Assignment Repo Link"
                    className={` text-white`}
                  />
                </div>
                <TextInput
                  id="assignment"
                  type="your Assignment Repo Link"
                  className={` bg-gray-400`}
                  placeholder="https://www.example.com"
                  required={true}
                  value={submitUrl}
                  onChange={(e) => setSubmitUrl(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              {/* Close Button always show */}
              <CustomButton handler={onClose} type="close">
                Close
              </CustomButton>
              {/* Close Button */}
              <div className="flex ml-auto gap-2" type="close">
                {/* Previous Button if current quiz is first quiz then  render it otherwise don't  render it.*/}
                <CustomButton handler={handleSubmit} type="submit">
                  Submit
                </CustomButton>
              </div>
            </div>
          </div>
        </section>
      </Modal>
    </>
  ) : (
    <>
      <button
        disabled
        className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
      >
        এসাইনমেন্ট Submitted
      </button>{" "}
    </>
  );
};

export default Assignment;
