"use client";
import useDublabApi from "@/app/lib/hooks/useDublabApi";
import { formatAndSortRelatedShowsInfo } from "@/app/lib/processSlug";
/* eslint-disable react/jsx-no-comment-textnodes */
import { ApiProfile, RadioApiShow } from "@/app/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";

interface RelatedShowsProps {
  shows: RadioApiShow[];
}

const RelatedShows = ({ shows }: RelatedShowsProps) => {
  const { getArchivedProfileData } = useDublabApi();

  const pathname = usePathname();
  let dynamicPath: string;

  if (pathname === "/b-sides") {
    dynamicPath = "b-sides";
  } else if (pathname === "/shows") {
    dynamicPath = "shows";
  } else {
    dynamicPath = "arxiu";
  }
  const formattedShows = formatAndSortRelatedShowsInfo(shows);

  const { data: profileData } = useSWR<ApiProfile>(
    formattedShows[0]?.slugToUrl,
    getArchivedProfileData
  );

  if (!formattedShows || formattedShows.length === 0) {
    return <div></div>;
  }

  if (!profileData) return <div>Carregant...</div>;

  const getTitleToShow = (showName: string, showTitle: string | undefined) => {
    if (showTitle !== "") {
      return showTitle;
    } else if (showName === "macGuffin-20") {
      return "Macguffin 2.0";
    } else if (showName === "cero en conducta") {
      return "@cero.en.conducta";
    } else if (showName === "br") {
      return "please come to brasil";
    } else {
      return showName;
    }
  };

  return (
    <section className="pr-2 ">
      {formattedShows.map(
        ({
          showName,
          showDateForList,
          showDateForUrl,
          showTags,
          slugToUrl,
          showTitle,
          showHost,
        }) => {
          const titleToShow = getTitleToShow(showName, showTitle);

          return (
            <article key={showDateForList}>
              <div className="flex gap-8 justify-between mt-[17px]">
                <Link href={`/${dynamicPath}/${slugToUrl}/${showDateForUrl}`}>
                  <span>{titleToShow}</span>
                  {showHost !== null && <span> w/ {showHost}</span>}
                </Link>
                <time>
                  {showDateForList.length === 11
                    ? showDateForList.substring(3)
                    : showDateForList}
                </time>
              </div>
              <ul className="flex text-xs pt-[3px] pb-[17px] ">
                {(showTags || (profileData && profileData.tags)).map(
                  (tag, index, array) => (
                    <>
                      <li key={tag}>{tag}</li>
                      {index !== array.length - 1 && <li>&nbsp;///&nbsp;</li>}
                    </>
                  )
                )}
              </ul>
              <hr className="border-black  w-full  " />
            </article>
          );
        }
      )}
    </section>
  );
};

export default RelatedShows;
