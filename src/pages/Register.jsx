/* import '../../assets/auth.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [passwordsAreNotEqual, setPasswordsNotEqual] = useState ();
    const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    if (data.password != data.confirmPassword){
      setPasswordsNotEqual(true);
    }
    const user = {
      email: data.email,
      password: data.password,
      firstName: data['first-name'],
      lastName: data['last-name'],
      role: data.role,
      termsAccepted: data.terms === 'on',
    }
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)})
      navigate("/", { state: {message: "Usuario registado"} });
    
  }
  return (
      <form onSubmit={handleSubmit}>
        <h2>Welcome on board!</h2>
        <p>We just need a little bit of data from you to get you started 🚀</p>
  
        <div className="control">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </div>
  
        <div className="control-row">
          <div className="control">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" required/>
          </div>
  
          <div className="control">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              name="confirmPassword"
            />
        {passwordsAreNotEqual && 
            <div>Passwords must match</div>}

          </div>
        </div>
  
        <hr />
  
        <div className="control-row">
          <div className="control">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" name="first-name" required />
          </div>
  
          <div className="control">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" name="last-name" required />
          </div>
        </div>
  
        <div className="control">
          <label htmlFor="phone">What best describes your role?</label>
          <select id="role" name="role">
            <option value="student">Gestor</option>
            <option value="teacher">Teacher</option>
            <option value="employee">Employee</option>
            <option value="founder">Founder</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="control">
          <label htmlFor="terms-and-conditions">
            <input type="checkbox" id="terms-and-conditions" name="terms" required/>I
            agree to the terms and conditions
          </label>
        </div>
  
        <p className="form-actions">
          <button type="submit" className="button">
            Sign up
          </button>
        </p>
      </form>
    );
  } */