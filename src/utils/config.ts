import { getComponentTpl, getIndexTpl, getStylesTpl } from "../templates";
import { FileTypes } from "../types";

export const FileTypeOptionsMap: Record<
  FileTypes,
  { relativeTplPath: string; getFileName: (componentName: string) => string }
> = {
  component: {
    relativeTplPath: "/component.template",
    getFileName: (componentName) => `${componentName}.tsx`,
  },
  index: {
    relativeTplPath: "/index.template",
    getFileName: (componentName) => `index.ts`,
  },
  styles: {
    relativeTplPath: "/styles.template",
    getFileName: (componentName) => `${componentName}.module.scss`,
  },
};

export const tplsMap: Record<FileTypes, (componentName: string) => string> = {
  component: getComponentTpl,
  index: getIndexTpl,
  styles: getStylesTpl,
};
