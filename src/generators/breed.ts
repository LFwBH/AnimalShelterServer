import BreedBuilder, { Breed } from "../models/Breed";
import { Generator } from "../utils/Generator";

const configs = [
  { name: "Персидская кошка" },
  { name: "Мейн-кун" },
  { name: "Бенгальская кошка" },
  { name: "Сиамская кошка" },
  { name: "Сфинск" },
  { name: "Саванна" },
  { name: "Немецкая овчкарка" },
  { name: "Пудель" },
  { name: "Сибирский хаски" },
  { name: "Такса" },
];

type BreedMap = Record<number, Breed>;

const BreedGenerator: Generator<BreedMap> = {
  generate(): BreedMap {
    return configs.reduce((acc, config, index) => {
      acc[index] = BreedBuilder.prop("id", index)
        .prop("name", config.name)
        .build();
      return acc;
    }, {} as BreedMap);
  },
};

export default BreedGenerator;
