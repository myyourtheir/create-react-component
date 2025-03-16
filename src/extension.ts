import { commands, type ExtensionContext } from "vscode";
import { EXTENSION_NAME } from "./constants";

import { createComponent } from "./commands/create-component";

export function activate(context: ExtensionContext) {
  const disposable = commands.registerCommand(
    `${EXTENSION_NAME}:create-component`,
    (uri) => {
      return createComponent(uri, context);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
