import axios from "axios";
import { LatestShowsData } from "../types";

const latestShowsData = "http://127.0.0.1:8000/api/shows/";

export const getLatestShowsData = async () => {
  const { data: latestShows } = await axios.get<LatestShowsData>(
    latestShowsData
  );
  return latestShows;
};
