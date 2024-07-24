import { Person } from '../interfaces/interfaces';

export default function downloadCsvFile(selectedPeople: Person[]) {
  const content = convertToCsv(selectedPeople);
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  return URL.createObjectURL(blob);
}

function convertToCsv(selectedPeople: Person[]) {
  const headers = Object.keys(selectedPeople[0]);
  const rows = selectedPeople.map((person: Person) =>
    headers.map((header) => person[header as keyof typeof person])
  );
  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}
