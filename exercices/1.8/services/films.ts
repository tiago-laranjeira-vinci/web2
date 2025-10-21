import { Film, NewFilm } from "../types";

import path from "node:path";

import { parse,serialize } from "../utils/json";

const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultFilms: Film[] = [
  {
    id: 1,
    title: "Shang-Chi and the Legend of the Ten Rings",
    director: "Destin Daniel Cretton",
    duration: 132,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/74/Shang-Chi_and_the_Legend_of_the_Ten_Rings_poster.jpeg",
    description:
      "Shang-Chi, the master of unarmed weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.",
    budget: 150,
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    budget: 63,
  },
  {
    id: 3,
    title: "Summer Wars",
    director: "Mamoru Hosoda",
    duration: 114,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/7d/Summer_Wars_poster.jpg",
    description:
      "A young math genius solves a complex equation and inadvertently puts a virtual world's artificial intelligence in a position to destroy Earth.",
    budget: 18.7,
  },
  {
    id: 4,
    title: "The Meyerowitz Stories",
    director: "Noah Baumbach",
    duration: 112,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/a/af/The_Meyerowitz_Stories.png",
    description:
      "An estranged family gathers together in New York City for an event celebrating the artistic work of their father.",
  },
  {
    id: 5,
    title: "her",
    director: "Spike Jonze",
    duration: 126,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg",
    description:
      "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
    budget: 23,
  },
];

function readAllFilms(duration:number): Film[] {
    const films = parse(jsonDbPath, defaultFilms);
    if (!duration) {
    return films;
  }
  const durationMin = Number(duration);
  const filteredFilms = films.filter((film) => {
  return film.duration <= durationMin;
  });
  return filteredFilms;
}

function readOneFilm(id : number): Film | undefined {
    const films = parse(jsonDbPath,defaultFilms);
    const film = films.find((film) => film.id === id);
    if (!film) {
    return undefined;
    }
    return film;
}

function createOneFilm(newFilm:NewFilm): Film {
    const films = parse(jsonDbPath,defaultFilms);
    const nextId =
    films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;
    const createdFilm = {
        id : nextId,
        ...newFilm,
    };
    films.push(createdFilm);
    serialize(jsonDbPath, films);
    return createdFilm;
}

function deleteOneFilm(filmId: number): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const index = films.findIndex((film) => film.id === filmId);
  if (index === -1) {
    return undefined;
  }
  const deletedElements = films.splice(index, 1);
  serialize(jsonDbPath, films);
  return deletedElements[0];
}

function updateOneFilm( filmId: number, newFilm: Partial<NewFilm>): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const film = films.find((film) => film.id === filmId);
  if (!film) {
    return undefined;
  }
  if (newFilm.title !== undefined) {
    film.title = newFilm.title!; // the router already checks for the presence of title
  }
  if (newFilm.director !== undefined) {
    film.director = newFilm.director!;
  }
  if (newFilm.duration !== undefined) {
    film.duration = newFilm.duration!;
  }
  if (newFilm.imageUrl !== undefined) {
    film.imageUrl = newFilm.imageUrl!;
  }
  if (newFilm.description !== undefined) {
    film.description = newFilm.description!;
  }
  if (newFilm.budget !== undefined) {
    film.budget = newFilm.budget!;
  }
  serialize(jsonDbPath, films);
  return film;
}
export {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
};


