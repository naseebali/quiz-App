async function getApiData(totalQuestion: number, levvel: string) {
  const res = await fetch(
    `https://opentdb.com/api.php?amount=${totalQuestion}&difficulty=${levvel}&type=multiple`
  );
}
