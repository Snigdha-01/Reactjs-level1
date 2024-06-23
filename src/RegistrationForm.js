import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [attendingWithGuest, setAttendingWithGuest] = useState('no');
  const [guestName, setGuestName] = useState('');
  const [showGuestNameField, setShowGuestNameField] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Track form submission

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation
    if (!name || !email || !age || (attendingWithGuest === 'yes' && !guestName)) {
      alert('Please fill in all required fields.');
      return;
    }

    // Display summary
    setSubmitted(true);
  };

  const handleAttendingWithGuestChange = (event) => {
    const value = event.target.value;
    setAttendingWithGuest(value);
    if (value === 'yes') {
      setShowGuestNameField(true);
    } else {
      setShowGuestNameField(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setAge('');
    setAttendingWithGuest('no');
    setGuestName('');
    setShowGuestNameField(false);
    setSubmitted(false);
  };

  return (
    <div className="container">
      <div className="left-side">
        <img src="https://picsum.photos/1125/365?random=1" alt="Event" />
      </div>
      <div className="right-side">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="registration-form">
            <h1>Registration Form</h1>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
              required
              pattern="[a-zA-Z]+"
              title="Please enter only alphabets (a-z, A-Z)"
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              pattern="\d*"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="1"
            />

            <fieldset>
              <legend>Are you attending with a guest?</legend>
              <label>
                <input
                  type="radio"
                  name="attendingWithGuest"
                  value="yes"
                  checked={attendingWithGuest === 'yes'}
                  onChange={handleAttendingWithGuestChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="attendingWithGuest"
                  value="no"
                  checked={attendingWithGuest === 'no'}
                  onChange={handleAttendingWithGuestChange}
                />
                No
              </label>
            </fieldset>

            {showGuestNameField && (
              <div>
                <label htmlFor="guestName">Guest Name:</label>
                <input
                  type="text"
                  id="guestName"
                  value={guestName}
                  pattern="[a-zA-Z]+"
                  title="Please enter only alphabets (a-z, A-Z)"
                  onChange={(e) => setGuestName(e.target.value)}
                  required={attendingWithGuest === 'yes'}
                />
              </div>
            )}

            <button type="submit">Submit</button>
          </form>
        ) : (
          <>
            <div className="alert alert-success" role="alert">
              <h4 className="alert-heading">Well done!</h4>
              <p>You have successfully submitted the registration form. Here is your summary:</p>
              <hr />
              <p className="mb-0">Check the summary below.</p>
            </div>
            <div className="summary">
              <h2>Registration Summary</h2>
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Age:</strong> {age}</p>
              {attendingWithGuest === 'yes' && <p><strong>Guest Name:</strong> {guestName}</p>}
              <button onClick={resetForm}>Reset Form</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;

