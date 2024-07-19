export let name:string = 'Horacio';
export const age:number = 27;
export const isValid:boolean = true;

name = 'Melissa';


export const templateString = `Esto es un 
string multilinea
que puede tener " o '
tambien expresiones => ${ 1 == 1}
numero => ${age}
booleans => ${isValid}
`;

console.log(templateString);
