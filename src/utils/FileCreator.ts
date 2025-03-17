import * as fs from "fs";
import * as path from "path";
import { mkdir, writeFile } from "fs/promises";
import { FileTypes } from "../types";
import { FileTypeOptionsMap, tplsMap } from "./config";

type CreateFolderParams = {
  folderName: string;
  rootPath: string;
};

type FileCreatorConstructorParams = {
  rootPath: string;
  tmpFolderPath: string;
  componentName: string;
};

type CreateFileParams = {
  rootPath: string;
  fileName: string;
  fileContent: string;
};

export class FileCreator {
  componentName: string;
  rootPath: string;
  tmpFolderPath: string;
  constructor({
    rootPath,
    componentName,
    tmpFolderPath,
  }: FileCreatorConstructorParams) {
    this.rootPath = rootPath;
    this.tmpFolderPath = tmpFolderPath;
    this.componentName = componentName;
  }
  public async createComponent() {
    const rootPath = await FileCreator.createFolder({
      rootPath: this.rootPath,
      folderName: this.componentName,
    });
    if (rootPath) {
      (["component", "index", "styles"] as FileTypes[]).forEach((type) => {
        FileCreator.createFile({
          rootPath,
          fileContent: this.extractFileContent(type),
          fileName: FileTypeOptionsMap[type].getFileName(this.componentName),
        });
      });
    }
  }

  static async createFolder({ folderName, rootPath }: CreateFolderParams) {
    return mkdir(path.join(rootPath, folderName), {
      recursive: true,
    });
  }

  static async createFile({
    rootPath,
    fileName,
    fileContent,
  }: CreateFileParams) {
    await writeFile(path.join(rootPath, fileName), fileContent);
  }

  private extractFileContent(type: FileTypes) {
    return tplsMap[type](this.componentName);
  }
}
