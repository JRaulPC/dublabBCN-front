/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import extractUrlForEmbedPlayer from "@/app/lib/extractUrlForEmbedPlayer";
import { RadioApiShow } from "@/app/types";
import Image from "next/image";
import React from "react";
import Button from "../Button";
import processSlug from "@/app/lib/processSlug";

interface ShowCardProps {
  show: RadioApiShow;
  listPosition?: number;
  height: string;
  onClickPlayback: (show: string) => void;
}

const ShowCard = ({
  show: { slug, mixcloud_url, tags, host, profile_picture },
  onClickPlayback,
}: ShowCardProps): React.ReactElement => {
  const { showName, showDateforCard } = processSlug(slug);

  const showUrl = extractUrlForEmbedPlayer(mixcloud_url);

  const handleShowPlayback = () => {
    onClickPlayback(showUrl!);
  };

  return (
    <article
      className={`w-[353px] h-[385px] relative overflow-hidden leading-[120%]`}
    >
      <div>
        <Image
          src={`https://api.dublab.es${profile_picture}`}
          alt={`Imatge del programa ${showName}`}
          height={353}
          width={353}
          className="overflow-hidden h-[353px] w-[353px] relative "
        />
        <Button
          className="absolute bottom-52 left-50 text-zinc-200"
          actionOnClick={handleShowPlayback}
        >
          {`https://api.mixcloud.com/${showUrl}embed-html/ `}
        </Button>
      </div>
      <ul className="flex flex-col absolute p-4 bottom-6 text-white">
        <li className="mb-3 h-[14px]">
          <time className="text-[12px]">{showDateforCard}</time>
        </li>
        <li>
          <h2 className="text-[1.375rem] h-5">{showName}</h2>
        </li>
        <li className="h-[17px]">
          <span className="text-sm ">Hosted by {host}</span>
        </li>
      </ul>
      <ul className="h-4 flex gap-[10px] text-[11px] flex-row p-4 absolute text">
        <li>{tags[0]} ///</li>
        <li>{tags[1]} ///</li>
        <li>{tags[2]} </li>
      </ul>
    </article>
  );
};

export default ShowCard;
