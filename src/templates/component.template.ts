export const getComponentTpl = (componentName: string) => {
  return `import styles from "./${componentName}.module.scss";

type ${componentName}Props = {}

export const ${componentName} = ({}: ${componentName}Props)=>{
	return <div></div>
}`;
};
