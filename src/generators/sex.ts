import SexBuilder, { Sex } from "../models/Sex";
import { Generator } from "../utils/Generator";

const configs = [{ name: "Мальчик" }, { name: "Девочка" }];

type SexMap = Record<number, Sex>;

const sexes: Generator<SexMap> = {
  generate(): SexMap {
    return configs.reduce((acc, config, index) => {
      acc[index] = SexBuilder.prop("id", index).prop("name", config.name).build();
      return acc;
    }, {} as SexMap);
  },
};

export default sexes;
