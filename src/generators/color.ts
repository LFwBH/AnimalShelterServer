import ColorBuilder, { Color } from "../models/Color";
import { Generator } from "../utils/Generator";

const configs = [
  { name: "Чёрный" },
  { name: "Белый" },
  { name: "Коричневый" },
  { name: "Серый" },
  { name: "Рыжий" },
  { name: "Кремовый" },
];

type ColorMap = Record<number, Color>;

const ColorGenerator: Generator<ColorMap> = {
  generate(): ColorMap {
    return configs.reduce((acc, config, index) => {
      acc[index] = ColorBuilder.prop("id", index).prop("name", config.name).build();
      return acc;
    }, {} as ColorMap);
  },
};

export default ColorGenerator;
