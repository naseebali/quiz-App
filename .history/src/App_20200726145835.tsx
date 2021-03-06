import React from "react";
import { getApiData, getCatories } from "./api/api";
import { SingleQuestion } from "./Types/quiz_types";
import Main from "./components/QuizDash";
import styled from "styled-components";
const Container = styled.div`
  background: red;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .inner--wraper {
    max-width: 500px;
    select,
    select:focus,
    input,
    input:focus,
    button {
      width: 100% !important;
      border: 0px;
      padding: 0px;
      height: 30px;
      margin: 5px 0px;
    }
  }
`;

function App() {
  const [quiz, setQuiz] = React.useState<SingleQuestion[]>([]);
  let [catagories, setCatagories] = React.useState<object[]>();
  let [apiParams, setapiParams] = React.useState<{
    questionLength: string;
    level: string;
    catagory: string;
  }>({
    questionLength: "1",
    level: "easy",
    catagory: "9",
  });
  const generateApi = () => {
    const { questionLength, level, catagory } = apiParams;
    console.log("questionLength", questionLength);
    console.log("level", level);
    console.log("catagory", catagory);

    async function fetchData() {
      const questions: SingleQuestion[] = await getApiData(
        catagory,
        questionLength,
        level
      );
      console.log(questions);
      setQuiz(questions);
    }
    fetchData();
  };
  React.useEffect(() => {
    async function fetchCatory() {
      const catories: SingleQuestion[] = await getCatories();

      setCatagories(catories);
    }
    fetchCatory();
  }, []);
  const changeHandler = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setapiParams((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <Container className="app">
      {quiz[0] ? (
        <Main question={quiz} />
      ) : (
        <div className="inner--wraper">
          <select onChange={changeHandler} name="catagory">
            {catagories
              ? catagories.map((data: any, index: number) => (
                  <option value={data.id}>
                    {console.log(data)}
                    {data.name}
                  </option>
                ))
              : []}
          </select>
          <div>
            <input
              type="number"
              name="questionLength"
              id=""
              onChange={changeHandler}
            />
          </div>
          <select onChange={changeHandler} name="level">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button onClick={generateApi}> generate Api</button>
        </div>
      )}
    </Container>
  );
}

export default App;
