import React, { useState } from 'react';

function Survey() {
  const [answers, setAnswers] = useState({
    question1: null,
    question2: null,
    question3: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAnswers({ ...answers, [name]: value });
  };

  return (
    <div>
      <h1>Survey</h1>
      <form>
        <div>
          <label>1. Is Gnosis the most Decentralized Chain?</label>
          <div>
            <input
              type="radio"
              name="question1"
              value="true"
              onChange={handleInputChange}
            />
            <label>True</label>
            <input
              type="radio"
              name="question1"
              value="false"
              onChange={handleInputChange}
            />
            <label>False</label>
          </div>
        </div>

        <div>
          <label>2. How secure is POAP Protocol?</label>
          <div>
            <select
              name="question2"
              onChange={handleInputChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select security level
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>

        <div>
          <label>3. Describe in your own words how is Gnosis the best</label>
          <div>
            <textarea
              name="question3"
              value={answers.question3}
              onChange={handleInputChange}
              rows="4"
              cols="50"
              placeholder="Type your answer here"
            />
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Survey;