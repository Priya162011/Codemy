import * as Yup from 'yup';

export const MarksSchema = Yup.object().shape({
    exam: Yup.string().required("Exam ID is required"), 
    student: Yup.string().required("Student ID is required"),
    marks: Yup.number()
        .min(0, "Marks cannot be negative")
        .required("Marks are required")
});
