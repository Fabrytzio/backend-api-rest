//for each number should be an output similar to this: (1,1),(1,2),(1,3)
export const generateValues = ( id: number, arr: number[] ):string[] => arr.map( x => `(${id}, ${x})` );