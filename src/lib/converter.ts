import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import { Parser } from "@json2csv/plainjs";

const uuid = randomUUID();

const execPath = process.env.OS === "linux" ? "bin/convert" : "bin/convert.exe";

const uploadTempFile = (content: string, inputType: string) => {
  const tmpExists = fs.existsSync("tmp");
  if (!tmpExists) {
    fs.mkdirSync("tmp");
  }

  // save the file in temp directory and return the path
  const tempFilePath = "tmp/" + uuid + "." + inputType;

  fs.writeFileSync(tempFilePath, content);

  return tempFilePath;
};

const doConvert = (
  inputText: string,
  inputType: string,
  outputType: string,
) => {
  const tempPath = uploadTempFile(inputText, inputType);
  let result = "Convertion failed!";
  try {
    result = execSync(execPath + " " + tempPath + " " + outputType).toString();
  } catch (error) {
    console.error(error);
  } finally {
    fs.unlinkSync(tempPath);
  }

  return result;
};

const jsonToCsv = (json: any[]): string => {
  try {
    const parser = new Parser();
    const csv = parser.parse(json);
    console.log(csv);
    return csv;
  } catch (error) {
    console.error(error);
    return "error";
  }
};

export { doConvert, jsonToCsv };
