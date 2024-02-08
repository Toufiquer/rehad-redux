import React, { useEffect, useState } from "react";
import StudentsTable from "./StudentsTable";
import SingleTable from "./SingleTable";
import { combinedArray } from "../../../utils/getCombinedArray";
import { grandTotalMarks } from "../../../utils/getGrandTotalMarks";
import { sortAndPosition } from "../../../utils/getSortAndPosition";
import { useSelector } from "react-redux";
import { useGetAssignmentMarksQuery } from "../../../redux/features/assignmentMark/assignmentMarkApi";
import { useGetQuizzesMarksQuery } from "../../../redux/features/quizzesMarks/quizzesMarksApi";

const LeaderBoard = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState({});
  const { data: submittedAssignmentsMarks } = useGetAssignmentMarksQuery();
  const { data: submittedQuizzesMarks } = useGetQuizzesMarksQuery();
  const studentAuth = useSelector((state) => state.studentAuth);
  useEffect(() => {
    if (
      submittedAssignmentsMarks?.length > 0 &&
      submittedQuizzesMarks?.length > 0
    ) {
      const combinedQuiz = combinedArray(
        submittedAssignmentsMarks,
        "totalQuizMark"
      );
      const combinedAssignment = combinedArray(
        submittedQuizzesMarks,
        "totalAssignmentMark"
      );
      // debugger;
      const totalMarks = grandTotalMarks(combinedQuiz, combinedAssignment);
      const result = sortAndPosition(totalMarks);
      // if find the student id then filter and set value
      const currentStudent_id = studentAuth?.data?.id;
      const otherStudents = [];
      const currentStudent = [];
      result.forEach((curr) => {
        if (curr.student_id === currentStudent_id) {
          currentStudent.push(curr);
        } else {
          otherStudents.push(curr);
        }
      });
      otherStudents.length = process.env.REACT_APP_MAX_STUDENT_IN_LEADER_BOARD;
      setAllStudents(otherStudents);
      setCurrentStudent(currentStudent[0]);
    }
  }, [studentAuth, submittedQuizzesMarks, submittedAssignmentsMarks]);
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
            {currentStudent?.id && <SingleTable data={currentStudent} />}
          </div>

          <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            {allStudents?.length > 0 && <StudentsTable data={allStudents} />}
          </div>
        </div>
      </section>
    </>
  );
};

export default LeaderBoard;
