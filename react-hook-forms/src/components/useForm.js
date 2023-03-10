import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import '../css/useForm.css';

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log(data); // Handle form submission data
    setIsSubmitted(true); // Set isSubmitted to true when the form is submitted
  };

  useEffect(() => {
    let timeoutId;
    if (isSubmitted) {
      timeoutId = setTimeout(() => {
        setIsSubmitted(false);
      }, 2000); // Hide message after 2 seconds
    }
    return () => clearTimeout(timeoutId);
  }, [isSubmitted]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} id='form'>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            {...register("firstName", { required: true })}
         placeholder="enter your first name" />
          {errors.firstName && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            {...register("lastName", { required: true })}
          placeholder="enter your last name"/>
          {errors.lastName && <span>This field is required</span>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          placeholder="enter a valid email"/>
          {errors.email && errors.email.type === "required" && (
            <span>This field is required</span>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <span>Please enter a valid email address</span>
          )}
        </div>

        
        <div>
  <label for="password">Password</label>
  <input
    type="password"
    id="password"
    {...register("password", { required: true, minLength: 8, maxLength: 15 })}
    placeholder="Enter a valid password"
  />
  {errors.password && errors.password.type === "required" && (
    <span>This field is required</span>
  )}
  {errors.password && errors.password.type === "minLength" && (
    <span>The password should be at least 8 characters</span>
  )}
  {errors.password && errors.password.type === "maxLength" && (
    <span>The password should be at most 15 characters</span>
  )}
</div>

        <button type="submit">Submit</button>
      </form>
      {/* Conditionally render a message if the form has been successfully submitted */}
      {isSubmitted && <p id='successful'>Registration successful!</p>}
    </div>
  );
}

export default Form;
