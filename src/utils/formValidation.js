import * as Yup from "yup";

// form validation for user input 
export const validationSchema = Yup.object({
  firstName: Yup.string().min(2, "First name must be at least 2 characters").max(50, "First name must be 50 characters or less").required("First name is required"),
  lastName: Yup.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be 50 characters or less").required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string().matches(/^\d{10}$/, "Phone number must be exactly 10 digits").required("Phone number is required"),
  time: Yup.string().required("Time is required").test("is-between-9am-5pm", "Installation time must be between 9 AM and 5 PM", (value) => {
    if (!value) return false;
    const [hours, minutes] = value.split(":").map(Number);
    const timeInMinutes = hours * 60 + minutes;
    const minTime = 9 * 60;
    const maxTime = 17 * 60;
    return timeInMinutes >= minTime && timeInMinutes <= maxTime;
  }),
});
