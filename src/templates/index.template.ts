export const getIndexTpl = (componentName: string) => {
  return `export {${componentName}} from "./${componentName}";`;
};
