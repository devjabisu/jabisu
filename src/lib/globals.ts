import { AppType } from "@/constants/appInfo";

class Globals {
  private _apps: { [key: string]: AppType } = {};
  private static instance: Globals;

  private constructor() {}

  public static getInstance(): Globals {
    if (!Globals.instance) {
      console.log("create the only singleton instance");
      Globals.instance = new Globals();
    }

    return Globals.instance;
  }

  public get apps() {
    return this._apps;
  }

  public set apps(apps: { [key: string]: AppType }) {
    this._apps = apps;
  }
}

export default Globals;
