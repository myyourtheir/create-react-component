import * as fs from "fs";
import * as path from "path";
import { mkdir, writeFile } from "fs/promises";
import { ExtensionContext } from "vscode";
import { FileTypes } from "../types";
import { FileTypeOptionsMap } from "./config";

type FileCreatorConstructorParams = {
  componenFolderPath: string;
  tmpFolderPath: string;
  componentName: string;
};

export class FileCreator {
  componentName: string;
  componenFolderPath: string;
  tmpFolderPath: string;
  constructor({
    componenFolderPath,
    componentName,
    tmpFolderPath,
  }: FileCreatorConstructorParams) {
    this.componenFolderPath = componenFolderPath;
    this.tmpFolderPath = tmpFolderPath;
    this.componentName = componentName;
  }
  public async createComponent() {
    mkdir(this.componenFolderPath, { recursive: true }).then(() => {
      this.createFile("component");
      this.createFile("index");
      this.createFile("styles");
    });
  }

  private async createFile(type: FileTypes) {
    const fileContent = this.extractFileContent(type);
    await writeFile(
      path.join(
        this.componenFolderPath,
        FileTypeOptionsMap[type].getFileName(this.componentName)
      ),
      fileContent
    );
  }

  private extractFileContent(type: FileTypes) {
    return fs
      .readFileSync(
        path.join(this.tmpFolderPath, FileTypeOptionsMap[type].relativeTplPath)
      )
      .toString()
      .replace(/{componentName}/g, this.componentName);
  }
}
