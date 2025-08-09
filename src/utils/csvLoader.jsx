import Papa from "papaparse";

export async function loadQuestionsFromCSV(path) {
  const response = await fetch(path);
  const text = await response.text();
  return new Promise((resolve) => {
    Papa.parse(text, {
      header: true,
      complete: (result) => {
        const filtered = result.data.filter((q) => q.question);
        resolve(filtered);
      },
    });
  });
}
