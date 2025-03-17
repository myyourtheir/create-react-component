import { FileCreator } from "../utils/FileCreator";
import * as path from "path";
import * as fs from "fs";
import { window, workspace, type ExtensionContext } from "vscode";
import { isUserStructure } from "../typeGuards";
import { UserStructure } from "../types";

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
      const userStructure = workspace
        .getConfiguration("c-r-c")
        .get("structure");

      if (
        !userStructure ||
        (Array.isArray(userStructure) && userStructure.length === 0)
      ) {
        const fileCreator = new FileCreator({
          componentName,
          rootPath: path.join(contextMenuSourcePath),
          tmpFolderPath: path.join(context.extensionPath, "src", "templates"),
        });
        fileCreator.createComponent();
        return;
      }
      if (!isUserStructure(userStructure)) {
        window.showErrorMessage("Invalid structure");
        return;
      }
      userStructureTraverse({
        componentName,
        data: userStructure,
        rootPath: path.join(contextMenuSourcePath),
      });
    });
};

type UserStructureTraverseParams = {
  data: UserStructure;
  rootPath: string;
  componentName: string;
};

const userStructureTraverse = ({
  componentName,
  data,
  rootPath,
}: UserStructureTraverseParams) => {
  if (!rootPath) return;
  data.forEach((item) => {
    if (item.type === "folder") {
      FileCreator.createFolder({
        folderName: replaceComponentName(item.title, componentName),
        rootPath,
      }).then((newRoot) => {
        if (item.children && newRoot) {
          userStructureTraverse({
            data: item.children,
            rootPath: newRoot,
            componentName,
          });
        }
      });
    } else {
      FileCreator.createFile({
        rootPath,
        fileName: replaceComponentName(item.title, componentName),
        fileContent: replaceComponentName(item.content ?? "", componentName),
      });
    }
  });
};

const replaceComponentName = (data: string, componentName: string) => {
  return data.replace(/{componentName}/g, componentName);
};
