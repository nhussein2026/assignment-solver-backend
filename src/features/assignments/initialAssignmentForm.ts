// src/features/assignments/initialAssignmentForm.ts

export const initialAssignmentForm = {
  studentName: "",
  studentId: "",
  doctorName: "",
  course: "",          // will hold course _id
  question: "",
  type: "homework",    // default
  description: "",
  timeToComplete: "",  // in minutes or hours (string then convert)
  status: "in_progress",
  attachments: [],     // array of file URLs
  additionalInfo: "",
  createdBy: "",       // current logged in user _id
};
