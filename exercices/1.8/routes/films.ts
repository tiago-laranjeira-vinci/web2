import { Router } from "express";

import { Film, NewFilm } from "../types";

import { containsOnlyExpectedKeys } from "../utils/validate";

import {
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
  readAllFilms,
  readOneFilm,
} from "../services/films";

const router = Router();

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

const expectedKeys = [
  "title",
  "director",
  "duration",
  "budget",
  "description",
  "imageUrl",
];

// Read all films, filtered by minimum-duration if the query param exists
router.get("/", (req, res) => {
  const duration = Number(req.query["duration"]);
  const films = readAllFilms(duration);
  return res.json(films);
});

// Read a film by id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const films = readOneFilm(id);
  if (!films) {
    return res.status(404);
  }
  return res.json(films);
});

// Create a new film
router.post("/", (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0 ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
  ) {
    return res.sendStatus(400);
  }
  // Challenge of ex1.4 : To be complete, we should check that the keys of the body object are only the ones we expect
  if (!containsOnlyExpectedKeys(body, expectedKeys)) {
    return res.sendStatus(400);
  }
  // End of challenge

  const { title, director, duration, budget, description, imageUrl } =
    body as NewFilm;
  const newFilm = createOneFilm({
    title,
    director,
    duration,
    budget,
    description,
    imageUrl,
  });
  return res.json(newFilm);
});

// Delete a film by id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const deletedFilm = deleteOneFilm(id);
  if (!deletedFilm) {
    return res.sendStatus(409);
  }
  return res.json(deletedFilm);
});

// Update on or multiple props of a film
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);

  const body: unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    Object.keys(body).length === 0 ||
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("director" in body &&
      (typeof body.director !== "string" || !body.director.trim())) ||
    ("duration" in body &&
      (typeof body.duration !== "number" || body.duration <= 0)) ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
  ) {
    return res.sendStatus(400);
  }

  // Challenge of ex1.6 : To be complete, we should check that the keys of the body object are only the ones we expect
  if (!containsOnlyExpectedKeys(body, expectedKeys)) {
    return res.sendStatus(400);
  }
  // End of challenge

  const {
    title,
    duration,
    description,
    budget,
    director,
    imageUrl,
  }: Partial<NewFilm> = body;
  const updatedFilm = updateOneFilm(id, {
    title,
    duration,
    description,
    budget,
    director,
    imageUrl,
  });
  if (!updatedFilm) {
    return res.sendStatus(404);
  }
  return res.json(updatedFilm);
});

// Update a film only if all properties are given or create it if it does not exist and the id is not existant
router.put("/:id", (req, res) => {
  const body: unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0 ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
  ) {
    return res.sendStatus(400);
  }

  // Challenge of ex1.6 : To be complete, we should check that the keys of the body object are only the ones we expect
  if (!containsOnlyExpectedKeys(body, expectedKeys)) {
    return res.sendStatus(400);
  }

  const id = Number(req.params.id);

  const indexOfFilmToUpdate = defaultFilms.findIndex((film) => film.id === id);
  // Deal with the film creation if it does not exist
  if (indexOfFilmToUpdate < 0) {
    const newFilm = body as NewFilm;

    // Challenge of ex1.6 : To be complete, check that the film does not already exist
    const existingFilm = defaultFilms.find(
      (film) =>
        film.title.toLowerCase() === newFilm.title.toLowerCase() &&
        film.director.toLowerCase() === newFilm.director.toLowerCase()
    );

    if (existingFilm) {
      return res.sendStatus(409);
    }

    
  }
  const { title, duration, description, budget, director, imageUrl } =
      body as NewFilm;
    const updatedFilm = updateOneFilm(id, {
      title,
      duration,
      description,
      budget,
      director,
      imageUrl,
    });
    if (!updatedFilm) {
      return res.sendStatus(404);
    }

    return res.send(updatedFilm);
});

export default router;
