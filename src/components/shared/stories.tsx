"use client";

import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { IStory } from "@/services/stories";
import { ArrowUpDown, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Container } from "./container";
import ReactStories from "react-insta-stories";

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<IStory>();

  useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <Container
      className={cn("flex items-center justify-between gap-2 my-10", className)}
    >
      {stories.length === 0 &&
        [...Array(6)].map((_, index) => (
          <div
            className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
            key={index}
          />
        ))}

      {stories.map((story) => (
        <img
          className="w-[200px] h-[250px] rounded-md cursor-pointer"
          key={story.id}
          src={story.previewImageUrl}
          onClick={() => onClickStory(story)}
        />
      ))}

      {open && (
        <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
          <div className="relative w-[520px]">
            <button
              className="absolute -right-10 -top-5 z-31"
              onClick={() => setOpen(false)}
            >
              <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
            </button>
            <ReactStories
              width={520}
              height={800}
              onAllStoriesEnd={() => setOpen(false)}
              stories={
                selectedStory?.items.map((item) => ({ url: item.sourceUrl })) ||
                []
              }
              defaultInterval={3000}
            />
          </div>
        </div>
      )}
    </Container>
  );
};
