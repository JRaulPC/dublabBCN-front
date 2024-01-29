/* eslint-disable react-hooks/rules-of-hooks */

import { Metadata } from "next";
import ResponsiveProfilesList from "../components/Bsides/ResponsiveProfileList";
import Spinner from "../components/ui/Spinner";
import getProfilesOrBsides from "../lib/getShowsOrBsides";
import useDublabApi from "../lib/hooks/useDublabApi";

export const metadata: Metadata = {
  title: "Programes",
  description:
    "Programes que s'emeten regularment a aquesta temporada de dublab BNC",
};

const ShowProfiles = async () => {
  const { getProfiles } = useDublabApi();

  const onAirProfiles = await getProfilesOrBsides(getProfiles);

  const isAllDataLoaded = onAirProfiles.every((apiProfiles) => apiProfiles);

  if (!isAllDataLoaded) return <Spinner />;

  return (
    <main className="flex flex-col mt-[219px]">
      <ul className="flex flex-row gap-[376px]">
        <li>
          <span className="h-[22px] px-8 ">COMING UP /// TODAY & TOMORROW</span>
        </li>
      </ul>
      <div className="flex text-[32px] sm:text-[72px] gap-[35px] sm:gap-[140px] pt-[62px] ml-8 ">
        <span>AAA</span>
        <h2>SHOWS</h2>
      </div>
      <section>
        {onAirProfiles.map((profiles, index) => (
          <ResponsiveProfilesList key={index} podcastsList={profiles} />
        ))}
      </section>
    </main>
  );
};

export default ShowProfiles;
