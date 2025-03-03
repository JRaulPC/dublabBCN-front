import {
  ApiBsidesList,
  ApiProfile,
  ApiProfilesList,
  Bside,
  LatestShowsData,
  RadioShow,
} from "@/app/types";
import axios from "axios";

const profileDataUrl = "http://109.69.8.21:8000/api/profiles/";
const bsideDataUrl = "http://109.69.8.21:8000/api/b-sides/";
const archivedProfileData = "http://109.69.8.21:8000/api/archived/";
const profileListUrl = "http://109.69.8.21:8000/api/profiles/?page=";
const bsidesListUrl = "http://109.69.8.21:8000/api/b-sides/?page=";
const latestShowsData = "http://109.69.8.21:8000/api/shows/?page=";
const showData = "http://109.69.8.21:8000/api/shows/";
const archivedProfilesList = "http://109.69.8.21:8000/api/archived/?page=";

const useDublabApi = () => {
  const getProfiles = async (page: string | number) => {
    const { data: profiles } = await axios.get<ApiProfilesList>(
      `${profileListUrl}${page}`,
    );
    return profiles;
  };

  const getArchivedProfiles = async (page: string | number) => {
    const { data: archivedProfiles } = await axios.get<ApiProfilesList>(
      `${archivedProfilesList}${page}`,
    );
    return archivedProfiles;
  };

  const getProfileData = async (showName: string) => {
    try {
      const trimmedName = showName.toLowerCase().replace(/\s+$/, "");
      const formatedShowName = trimmedName.replace(/\s+/g, "-");

      let finalShowName = formatedShowName;

      if (showName === "br") {
        finalShowName = "please-come-to-brasil";
      }
      if (showName === "When...Plants...Sing") {
        finalShowName = "whenplantssing";
      }
      if (showName === "@cero.en.conducta") {
        finalShowName = "cero-en-conducta";
      }
      if (showName === "MacGuffin 2.0") {
        finalShowName = "macguffin-20";
      }

      const { data: profile } = await axios.get<ApiProfile>(
        `${profileDataUrl}${finalShowName}`,
      );

      return profile;
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(`Error fetching profile for show "${showName}":`, error);

      return null;
    }
  };

  const getArchivedProfileData = async (showName: string) => {
    try {
      const trimmedName = showName.toLowerCase().replace(/\s+$/, "");
      let formatedShowName = trimmedName.replace(/\s+/g, "-");

      if (formatedShowName === "MacGuffin 2.0") {
        formatedShowName = "macguffin-20";
      }

      const { data: profile } = await axios.get<ApiProfile>(
        `${archivedProfileData}${formatedShowName}`,
      );

      return profile;
    } catch (error: unknown) {
      const message = "profile is not currently online";
      throw new Error(message);
    }
  };

  const getSingleShowData = async (slug: string) => {
    const { data: show } = await axios.get<RadioShow>(`${showData}${slug}`);

    return show;
  };

  const getLatestsShowsData = async (page: number) => {
    const { data: latestShows } = await axios.get<LatestShowsData>(
      `${latestShowsData}${page}`,
    );
    return latestShows;
  };

  const getBsides = async (page: string | number) => {
    const { data: bSides } = await axios.get<ApiBsidesList>(
      `${bsidesListUrl}${page}`,
    );
    return bSides;
  };

  const getBsideData = async (bSideSlug: string) => {
    const { data: bSide } = await axios.get<Bside>(
      `${bsideDataUrl}${bSideSlug}`,
    );
    return bSide;
  };

  return {
    getArchivedProfileData,
    getArchivedProfiles,
    getSingleShowData,
    getLatestsShowsData,
    getProfileData,
    getProfiles,
    getBsides,
    getBsideData,
  };
};

export default useDublabApi;
