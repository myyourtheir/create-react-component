import { FileCreator } from "../utils/FileCreator";
import * as path from "path";
import * as fs from "fs";
import { window, workspace, type ExtensionContext } from "vscode";

export const createComponent = (uri: any, context: ExtensionContext) => {
  let contextMenuSourcePath;

  if (uri && fs.lstatSync(uri.fsPath).isDirectory()) {
    contextMenuSourcePath = uri.fsPath;
  } else if (uri) {
    contextMenuSourcePath = path.dirname(uri.fsPath);
  } else {
    contextMenuSourcePath = workspace.workspaceFolders?.[0].uri.fsPath;
  }

  window
    .showInputBox({
      prompt: "Please enter component name",
    })
    .then((componentName) => {
      if (!componentName) {
        return;
      }
      const fileCreator = new FileCreator({
        componentName,
        rootPath: path.join(contextMenuSourcePath),
        tmpFolderPath: path.join(context.extensionPath, "src", "templates"),
      });
      fileCreator.createComponent();
    });
};
