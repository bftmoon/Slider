import Model from "./Model";
import MinMaxPosition from "../types/MinMaxPosition";

interface ValidModel extends Model {
  setValidCurrent(current: any, position: MinMaxPosition): void;
  setValidCurrents(currentMin: any, currentMax: any): void;
  setValidStep(step: any): void;
  setValidBorder(value: any, position: MinMaxPosition): void;
  setValidBorders(borderMin: any, borderMax: any): void;
}

export default ValidModel;
