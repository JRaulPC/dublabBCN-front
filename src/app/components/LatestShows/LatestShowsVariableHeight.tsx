import React from "react";
import fakeShows from "../../../../fakeData";
import ShowCard from "./ShowCard";
import { getLatestShowsData } from "@/app/lib/radioDataFetching";

const LatestShowsVariableHeight = async () => {
  const { results } = await getLatestShowsData();

  const heights = ["small", "medium", "large"];

  const getRandomHeight = () => {
    const randomIndex = Math.floor(Math.random() * heights.length);
    return heights[randomIndex];
  };

  return (
    <section className="py-[65px] px-[31px]">
      <ul className="grid grid-cols-4 gap-x-3 gap-y-14 pt-[206px] ">
        {results.map((show) => (
          <li key={show.slug}>
            <ShowCard show={show} height={getRandomHeight()} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LatestShowsVariableHeight;