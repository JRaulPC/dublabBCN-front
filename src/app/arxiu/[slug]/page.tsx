import ProfileLinks from "@/app/components/Profiles/ProfileLinks";
import RelatedShows from "@/app/components/Profiles/ProfileRelatedShows";
import Spinner from "@/app/components/ui/Spinner";
import useDublabApi from "@/app/lib/hooks/useDublabApi";
import { Metadata } from "next";
import Image from "next/image";

interface ProfileDetailsProps {
  params: {
    slug: string;
    searchParams: { [slug: string]: string | string[] };
  };
}

export const generateMetadata = ({ params }: ProfileDetailsProps): Metadata => {
  const transformFirstLetter = (firstLetter: string) => {
    return firstLetter.toUpperCase();
  };
  const capitalizeWords = (showName: string) => {
    const formatedShowName = showName.replace(/\b\w/g, transformFirstLetter);

    return formatedShowName;
  };

  const slug = capitalizeWords(params.slug.replace("-", " "));

  return {
    title: `${slug}`,
    description: `Escolta l'arxiu de les retransmisions en directe del programa ${slug}`,
  };
};

const ArchivedProfileDetails = async ({ params }: ProfileDetailsProps) => {
  const { getArchivedProfileData } = useDublabApi();

  const profileData = await getArchivedProfileData(params.slug);

  const profileShowName = params.slug.replace(/-/g, " ");

  if (!profileData) return <Spinner />;

  const defaultImage = profileData.picture
    ? profileData.picture
    : "/assets/arxiu-default-page.jpg";

  return (
    <main className="mt-[219px] gap-[50px] flex sm:flex-row flex-col justify-between  bg-black text-white">
      <Image
        src={defaultImage}
        alt={""}
        width={660}
        height={327}
        className="sm:h-[727px] h-[358px] max-w-[660px] w-auto object-cover sm:p-0 p-4 "
      />
      <section className="md:max-h-[700px] px-4 sm:w-[100vw] md:overflow-y-scroll scrollbar-hide sm:pr-[2rem]">
        <div className="flex justify-between items-end">
          <ul className="flex gap-[10px] pr-4 opacity-100 sm:opacity-70">
            {profileData.tags.map((tag) => (
              <li
                key={tag}
                className={`text-[11px] border rounded-md pt-[6px]  px-2 pb-[3px] text-white `}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-fit">
          <h2 className="text-5xl sm:h-[58px] mt-[56px]">{profileShowName}</h2>
          <ul className="flex gap-9 sm:gap-[194px] text-[32px]  mt-[20px] sm:mt-[50px]">
            <li>With</li>
            <li className="max-w-[304px] sm:max-w-[400px]">
              {profileData.host}
            </li>
          </ul>
        </div>
        <section className="flex flex-col-reverse gap-[35px] sm:gap-[140px] max-w-[700px]">
          <div
            className={`w-fit sm:max-w-none mt-8 ${
              profileData.links ? "md:gap-[5.1rem]" : "sm:gap-[16rem]"
            }  flex flex-row `}
          >
            <ProfileLinks links={profileData.links} />
            <div className="flex items-start">
              <p className="text-sm sm:w-fit sm:pr-0">
                {profileData.description}
              </p>
            </div>
          </div>
        </section>
        <section className="flex-col items-end">
          <div className="text-2xl flex items-end justify-between mt-[58px] gap-16 mb-[17px]">
            <h3 className="h-fit">Shows Relacionats</h3>
          </div>
          <hr className="border-white w-full " />
          <RelatedShows shows={profileData.shows} />
        </section>
      </section>
    </main>
  );
};

export default ArchivedProfileDetails;
