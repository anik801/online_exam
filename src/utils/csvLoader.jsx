import Papa from "papaparse";

export async function loadQuestionsFromCSV(path) {
  const response = await fetch(path);
  if (!response.ok) {
    console.error(`Failed to fetch CSV at ${path}:`, response.status);
    return [];
  }
  const text = await response.text();
  console.log('CSV text:', text.slice(0, 20)); // log first 200 chars

  return new Promise((resolve) => {
    Papa.parse(text, {
      header: true,
      complete: (result) => {
        // console.log('Parsed CSV data:', result.data);
        const filtered = result.data.filter((q) => q.question);
        // console.log('Filtered questions:', filtered);
        resolve(filtered);
      },
    });
  });
}
