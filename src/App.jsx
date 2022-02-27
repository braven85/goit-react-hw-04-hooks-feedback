import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./components/Feedback.module.css";
import { FeedbackOptions } from "./components/FeedbackOptions";
import { Statistics } from "./components/Statistics";
import { Section } from "./components/Section";
import { Notification } from "./components/Notification";
import HorizontalLine from "./components/HorizontalLine";
import { Repository } from "./components/Repository";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function addGoodOpinion() {
    setGood(good + 1);
  }

  function addNeutralOpinion() {
    setNeutral(neutral + 1);
  }

  function addBadOpinion() {
    setBad(bad + 1);
  }

  function countTotalFeedback() {
    return good + neutral + bad;
  }

  function countPositiveFeedbackPercentage() {
    const total = good + neutral + bad;
    if (total === 0) {
      return 0 + "%";
    } else {
      return Math.round((good / total) * 100) + "%";
    }
  }

  const totalCount = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <div className={styles.feedback__container}>
      <Repository />

      <HorizontalLine />

      <Section title="Please leave feedback">
        <div className={styles.buttons__container}>
          <FeedbackOptions options={addGoodOpinion} onLeaveFeedback="Good" />
          <FeedbackOptions
            options={addNeutralOpinion}
            onLeaveFeedback="Neutral"
          />
          <FeedbackOptions options={addBadOpinion} onLeaveFeedback="Bad" />
        </div>
      </Section>

      <HorizontalLine />

      <Section title="Statistics">
        {totalCount === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalCount}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </div>
  );
}

App.propTypes = {
  good: PropTypes.number,
  neutral: PropTypes.number,
  bad: PropTypes.number,
};

export default App;
