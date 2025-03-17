export type FileTypes = "component" | "index" | "styles";


export type FileStructure =  {children?: FileStructure ; type: 'folder'| 'file'; title: string; content:string }[]