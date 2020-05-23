interface MinMax <T>{
  min?: T;
  max?:T;

  [index: string]: T;
}

export default MinMax;
