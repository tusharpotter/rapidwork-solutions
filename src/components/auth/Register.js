import React, { useState, useEffect } from "react";
import styles from "./Register.module.scss";

import { useHistory } from "react-router-dom";
import { postRequest } from "utils/api";

import Checkbox from "rc-checkbox";
import "rc-checkbox/assets/index.css";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const history = useHistory();

  function handleFormChange(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      let data = { ...formData };
      data.skills = selectedSkills;
      delete data.confirmPassword;
      postRequest("/register/freelancer", data)
        .then((res) => {
          console.log(res);
          history.push("/assignments/biddings");
        })
        .catch((err) => console.log(err));
    }
  }

  function handleSkillChange(e) {
    let updateSkills = [...selectedSkills];
    updateSkills.push(e.target.name);
    console.log(updateSkills);
    setSelectedSkills(updateSkills);
  }

  useEffect(() => {
    setSkills([
      "MBA",
      "Engineering",
      "History",
      "Science",
      "Coding",
      "Legal",
      "Writing",
      "Calligraphy",
      "Geography",
      "Politics",
    ]);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <div className={styles.title}>New here? Resgister Now!</div>
        <form id="freelancer" onChange={handleFormChange} onSubmit={handleFormSubmit}>
          <label>Name</label>
          <input type="text" name="name" required />
          <label>Email</label>
          <input type="email" name="email" required />
          <label>Phone</label>
          <input type="number" name="phone" required />
          <label>Password</label>
          <input type="password" name="password" required />
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" required />
        </form>
        <div className={styles.skillsSelection}>
          {skills.map((skill) => (
            <div className={styles.skill}>
              <Checkbox name={`${skill}`} onChange={handleSkillChange} />
              <p>{skill}</p>
            </div>
          ))}
        </div>
        <button type="submit" form="freelancer">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
