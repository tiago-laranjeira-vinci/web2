import { Router } from "express";
import { films } from "../types";

const films: films[] = [
    {
     id : 1,
     title : "Inception",
     director : "Christopher Nolan",
     duration : 148,
    },
    {
     id : 2,
     title : "The Matrix",
     director : "The Wachowskis",
     duration : 136,
    },
    {
     id : 3,
     title : "Interstellar",
     director : "Christopher Nolan",
     duration : 169,
    },
];

const router = Router();
router.get("/", (_req, res) => {
  return res.json(films);
});
export default router;