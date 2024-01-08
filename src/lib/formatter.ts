import * as prettier from "prettier";
import xmlFormat from "xml-formatter";

const TYPE_XML = "xml";

const formatXml = async (content: string) => {
  let result = "";
  try {
    result = xmlFormat(content);
  } catch (err) {
    console.error(err);
  }
  return result;
};

const formatContent = async (content: string, type: string) => {
  let data = "";
  if (type === TYPE_XML) {
    return formatXml(content);
  }
  try {
    data = await prettier.format(content, {
      parser: type,
    });
  } catch (err) {
    console.error("some errors here");
  }
  return data;
};

export default formatContent;
