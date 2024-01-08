type AppType = {
  id: string;
  name: string;
  short: string;
  desc: string;
};

const appInfo = {
  apps: [
    {
      id: "0001",
      name: "UNIX Time Converter",
      short: "timestamp",
      desc: "Easy UNIX timestamp converter for developers",
    },
    {
      id: "0002",
      name: "Prettier Formatter",
      short: "format",
      desc: "Use prettier to format your HTML / JSON etc. files",
    },
    {
      id: "0003",
      name: "Data Converter",
      short: "convert",
      desc: "Data converter supports converting JSON / YAML / TOML etc",
    },
    {
      id: "0004",
      name: "Base64 Converter",
      short: "base64",
      desc: "Base64 text / file converter",
    },
    {
      id: "0005",
      name: "Data Generator",
      short: "generator",
      desc: "Mock data generator for conveniently developing",
    },
    {
      id: "0006",
      name: "Snippet Manager",
      short: "snippet",
      desc: "Manage all your code snippets",
    },
  ],
};

export type { AppType };
export default appInfo;
