Configurable plugin for creating components.

## Configuration

You can define your own structure for the component via `c-r-c.structure` setting.

It's recursive structure, so you can define nested structures.

There is special placeholder `{componentName}` that will be replaced with the component name in title and content fields.

Type of configuration looks like this:

```
type UserStructure = {
  children?: UserStructure;
  type: "folder" | "file";
  title: string;
  content?: string;
}[];
```

## Default configuration looks like this:

```
"c-r-c.structure": [
    {
      "type": "folder",
      "title": "{componentName}",
      "children": [
        {
          "type": "file",
          "title": "{componentName}.tsx",
          "content": "import styles from \"./{componentName}.module.scss\";\n\n type {componentName}Props = {}\n\n export const {componentName} = ({}: {componentName}Props)=>{\n\treturn <div></div>\n };"
        },
        {
          "type": "file",
          "title": "{componentName}.module.scss"
        },
        {
          "type": "file",
          "title": "index.ts",
          "content": "export {{componentName}} from \"./{componentName}\""
        }
      ]
    }
  ]
```
