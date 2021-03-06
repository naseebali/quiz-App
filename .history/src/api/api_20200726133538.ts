import { OverallQuiz, SingleQuestion } from "../Types/quiz_types";
export const shuffleArray = (array: any[]) => {
  [...array].sort(() => Math.random() - 0.5);
};

export const getApiData = async (
  totalQuestion: string,
  catagory: string,
  levvel: string
): Promise<SingleQuestion[]> => {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${totalQuestion}&category=${catagory}&difficulty=${levvel}&type=multiple`
  );
  console.log(res);
  let { results } = await res.json();
  const quiz: SingleQuestion[] = results.map((questionObj: OverallQuiz) => {
    return {
      question: questionObj.question,
      answer: questionObj.correct_answer,
      option: questionObj.incorrect_answers.concat(questionObj.correct_answer),
    };
  });
  return quiz;
};

export const getCatories = async () => {
  const res = await fetch(`https://opentdb.com/api_category.php`);
  const { trivia_categories } = await res.json();
  return trivia_categories;
};
