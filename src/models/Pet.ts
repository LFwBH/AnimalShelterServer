import { Breed } from "./Breed";
import Builder from "../utils/Builder";
import { Color } from "./Color";
import { Sex } from "./Sex";

export interface Pet {
  readonly id: number;
  readonly name: string;
  readonly age: number;
  readonly description: string;
  readonly breed: Breed;
  readonly color: Color;
  readonly sex: Sex;
  readonly special: boolean;
}

const PetBuilder = new Builder<Pet>();

export default PetBuilder;
