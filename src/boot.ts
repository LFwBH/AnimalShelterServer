import { lorem, name, random } from "faker/locale/ru";
import BreedGenerator from "./generators/breed";
import ColorGenerator from "./generators/color";
import SexGenerator from "./generators/sex";
import { length } from "./utils/length";
import PetBuilder, { Pet, Image } from "./models/Pet";
import fs from "fs";
import path from "path";

interface Response {
  pets: Pet[];
}

const MAX_PET_AGE = 20;

const MIN_PETS = 50;
const MAX_PETS = 100;

const PLACEHOLDER: Image = {
  url: "https://placeimg.com/640/480/animals",
  thumb: "https://placeimg.com/160/120/animals",
};

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
    .prop("image", PLACEHOLDER)
    .build();

  data.pets.push(pet);
}

fs.writeFileSync(path.join(__dirname, "db.json"), JSON.stringify(data));
