interface IMinMax <T>{
  min?: T;
  max?:T;

  [index: string]: T;
}

export default IMinMax;
