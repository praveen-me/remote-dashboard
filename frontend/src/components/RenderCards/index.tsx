import ProfileCard from "@/components/ProfileCard";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import React, { LegacyRef, memo, RefObject, useCallback } from "react";

interface IRenderCardsProps {
  userIds: string[];
  intersectionObserverCb: () => void;
}

export const RenderCards = memo((props: IRenderCardsProps) => {
  const { userIds, intersectionObserverCb } = props;

  const loadMoreUsers = useCallback(() => {
    intersectionObserverCb();
  }, []);

  const loadMoreUsersRef = useIntersectionObserver(loadMoreUsers);

  if (!userIds.length)
    return (
      <div className="h-full">
        <p className="text-center text-gray-500 font-bold mt-10 text-5xl h-full">
          No Users found! 😭
        </p>
      </div>
    );

  return (
    <>
      {userIds.map((user, index) =>
        index === userIds.length - 1 ? (
          <ProfileCard
            ref={loadMoreUsersRef as LegacyRef<RefObject<HTMLDivElement>>}
            key={index}
            user={user}
          />
        ) : (
          <ProfileCard key={index} user={user} />
        )
      )}
    </>
  );
});

RenderCards.displayName = "RenderCards";
