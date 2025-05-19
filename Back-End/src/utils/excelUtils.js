import XLSX from "xlsx";

export const parseExcelSheet = (excelBuffer) => {
  const workbook = XLSX.read(excelBuffer, { type: 'buffer' });
  return XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
};

export const buildImageMap = (imageFiles) => {
  const map = {};
  imageFiles.forEach(file => {
    const id = file.name.split('.')[0];
    map[id] = file['@microsoft.graph.downloadUrl'];
  });
  return map;
};

export const excelDateToJSDate = (serial) => {
  const excelEpoch = new Date(1900, 0, 1);
  const date = new Date(excelEpoch.getTime() + (serial - 2) * 86400000);
  return date.toISOString().split('T')[0];
};

export const writeExcelSheet = (jsonData) => {
  const worksheet = XLSX.utils.json_to_sheet(jsonData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
};
