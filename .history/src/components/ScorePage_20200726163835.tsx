import React from "react";
import App from "../App";
import styled from "styled-components";
const ScorePage = (props: any) => {
  const [state, setState] = React.useState<boolean>(false);
  console.log("props at score apge", props);
  if (state === true) return <App />;
  else
    return (
      <div className="score--page">
        <div>
          <h2>
            Your Score is {props.score} out of {props.totalNumber}
          </h2>
        </div>
        <button onClick={() => setState(true)}>Back to home</button>
      </div>
    );
};

export default ScorePage;
