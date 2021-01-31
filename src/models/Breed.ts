import Builder from "../utils/Builder";

export interface Breed {
  readonly id: number;
  readonly name: string;
}

const BreedBuilder = new Builder<Breed>();

export default BreedBuilder;
