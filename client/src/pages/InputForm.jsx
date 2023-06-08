import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (formData.name === "") {
      newErrors.name = "Name is required.";
      valid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should not contain special characters.";
      valid = false;
    }

    if (formData.email === "") {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
      valid = false;
    }

    if (formData.address === "") {
      newErrors.address = "Address is required.";
      valid = false;
    }

    if (formData.phone === "") {
      newErrors.phone = "Phone number is required.";
      valid = false;
    } else if (formData.phone.length !== 10 || formData.phone[0] === "0") {
      newErrors.phone = "Invalid phone number.";
      valid = false;
    }

    if (formData.dob === "") {
      newErrors.dob = "Date of birth is required.";
      valid = false;
    } else if (!/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/.test(formData.dob)) {
      newErrors.dob = "Invalid date of birth format (DD-MM-YYYY).";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, submit data
      axios
        .post("http://localhost:3333", formData)
        .then((response) => {
          alert("SUCCESS!");
          console.log("Data saved successfully:", response.data);
          // Perform any additional actions after successful submission
        })
        .catch((error) => {
          alert(error.response.data.error);
          console.error(error.response.data.error);
          // Handle errors if the submission fails
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form className="bg-yellow-300 p-3 rounded-lg" onSubmit={handleSubmit}>
      <div>
        <label className="text-black mr-3">Name:</label>
        <input
          type="text"
          name="name"
          className="bg-white text-black"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <span className="error">{errors.address}</span>}
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>
      <div>
        <label>DOB:</label>
        <input
          type="text"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        {errors.dob && <span className="error">{errors.dob}</span>}
      </div>
      <button type="submit" className="bg-cyan-800 w-full">
        Submit
      </button>
    </form>
  );
};

export default Form;
