import { RadioApiShow } from "../types";

export const formatSlugToGetShowName = (slug: string): string => {
  if (slug.substring(0, 4) === "6474") {
    const showIsNumeric = "6474";
    return showIsNumeric;
  }

  if (slug.substring(0, 8) === "5wuguan5") {
    const showIs5wuguan5 = "5wuguan5";
    return showIs5wuguan5;
  }

  const showName = slug.replace(/-/g, " ").replace(/\d/g, "");
  return showName;
};

export const extractDatesForShowList = (slug: string): string => {
  const dates = slug.match(/\d+/g);
  return dates ? dates.join(".") : "";
};

export const extractDatesForUrl = (slug: string): string => {
  const dates = slug.match(/\d+/g);
  return dates ? dates.join("-") : "";
};

export const extractDatesForCard = (slug: string): string => {
  const dates = slug.match(/\d+/g);
  return dates ? dates.join("/") : "";
};

export const formatRelatedShowsInfo = (shows: RadioApiShow[]) =>
  shows.map(({ slug, tags }) => {
    const showName = formatSlugToGetShowName(slug);
    const showDateForShowList = extractDatesForShowList(slug);
    const showDateForUrl = extractDatesForUrl(slug);
    const showDateForList = extractDatesForCard(slug);
    const showTags = tags;

    return {
      showName,
      showDateForShowList,
      showTags,
      showDateForUrl,
      showDateForList,
    };
  });
