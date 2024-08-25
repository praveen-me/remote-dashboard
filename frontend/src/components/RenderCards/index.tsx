import ProfileCard from "@/components/ProfileCard";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import React, { memo, useCallback } from "react";

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

  return (
    <>
      {userIds.map((user, index) =>
        index === userIds.length - 1 ? (
          <ProfileCard ref={loadMoreUsersRef} key={index} user={user} />
        ) : (
          <ProfileCard key={index} user={user} />
        )
      )}
    </>
  );
});

RenderCards.displayName = "RenderCards";
