import { lorem, name, random } from "faker/locale/ru";
import BreedGenerator from "./generators/breed";
import ColorGenerator from "./generators/color";
import SexGenerator from "./generators/sex";
import { length } from "./utils/length";
import PetBuilder, { Pet } from "./models/Pet";

interface Response {
  pets: Pet[];
}

const MAX_PET_AGE = 20;

const MIN_PETS = 50;
const MAX_PETS = 100;

export = () => {
  const data: Response = {
    pets: [],
  };

  const breeds = BreedGenerator.generate();
  const colors = ColorGenerator.generate();
  const sexes = SexGenerator.generate();

  const lengths = {
    breeds: length(breeds),
    colors: length(colors),
    sexes: length(sexes),
  };

  for (let i = 0; i < random.number({ min: MIN_PETS, max: MAX_PETS }); i++) {
    const breed = breeds[random.number(lengths.breeds - 1)];
    const color = colors[random.number(lengths.colors - 1)];
    const sex = sexes[random.number(lengths.sexes - 1)];

    const pet = PetBuilder.prop("id", i)
      .prop("age", random.number(MAX_PET_AGE))
      .prop("breed", breed)
      .prop("color", color)
      .prop("sex", sex)
      .prop("name", name.findName())
      .prop("description", lorem.paragraph())
      .prop("special", random.boolean())
      .build();

    data.pets.push(pet);
  }

  return data;
};


