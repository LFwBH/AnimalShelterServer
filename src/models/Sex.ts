import Builder from "../utils/Builder";

export interface Sex {
  readonly id: number;
  readonly name: string;
}

const SexBuilder = new Builder<Sex>();

export default SexBuilder;
