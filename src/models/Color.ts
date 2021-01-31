import Builder from "../utils/Builder";

export interface Color {
  readonly id: number;
  readonly name: string;
}

const ColorBuilder = new Builder<Color>();

export default ColorBuilder;
