import { useAuthState } from "@/context/auth";
import { Post } from "@/types";
import axios from "axios";
import classNames from "classnames";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface PostCardProps {
  post: Post;
  subMutate?: () => void;
  mutate?: () => void;
}

const PostCard = ({
  post: {
    identifier,
    slug,
    title,
    body,
    subname,
    createdAt,
    voteScore,
    userVote,
    commentCount,
    url,
    username,
    sub,
  },
  mutate,
  subMutate,
}: PostCardProps) => {
  //Vote
  const router = useRouter();
  const { authenticated } = useAuthState();
  const isInSubPage = router.pathname === "/r/[sub]";

  const vote = async (value: number) => {
    if (!authenticated) router.push("/login");

    //이미 클릭한 vote 버튼을 눌렀을 시에는 reset
    if (value === userVote) {
      value = 0;
    }

    try {
      await axios.post("/votes", {
        identifier,
        slug,
        value,
      });
      if (mutate) mutate();
      if (subMutate) subMutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex mb-4 bg-white rounded" id={identifier}>
      {/* Vote */}
      <div className="flex-shrink-0 w-10 py-2 text-center rounded-l">
        {/* 좋아요 */}
        <div
          className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
          onClick={() => vote(1)}
        >
          <i
            className={classNames("fas fa-arrow-up", {
              "text-red-500": userVote === 1,
            })}
          ></i>
        </div>
        {/* VoteScore */}
        <p className="text-xs font-bold">{voteScore}</p>
        {/* 싫어요 */}
        <div
          className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500"
          onClick={() => vote(-1)}
        >
          <i
            className={classNames("fas fa-arrow-down", {
              "text-blue-500": userVote === -1,
            })}
          ></i>
        </div>
      </div>

      {/* 포스트 */}
      <div className="w-full p-2">
        {!isInSubPage && (
          <div className="flex items-center">
            <Link href={`/r/${subname}`}>
              {sub && (
                <Image
                  src={sub.imageUrl}
                  alt="sub"
                  className="rounded-full cursor-pointer"
                  width={12}
                  height={12}
                />
              )}
            </Link>
            <Link href={`/r/${subname}`}>
              <span className="ml-2 text-xs font-bold cursor-pointer hover:underline">
                /r/{subname}
              </span>
            </Link>
            <span className="mx-1 text-xs text-gray-400">·</span>
          </div>
        )}
        <p className="text-xs text-gray-400">
          Posted by
          <Link href={`/r/${username}`}>
            <span className="mx-1 hover:underline">/u/{username}</span>
          </Link>
          <Link href={url}>
            <span className="mx-1 hover:underline">
              {dayjs(createdAt).format("YYYY-MM-DD HH:mm")}
            </span>
          </Link>
        </p>

        <Link href={url}>
          <span className="my-1 text-lg font-medium">{title}</span>
        </Link>
        {body && <p className="my-1 text-sm">{body}</p>}
        <div className="flex">
          <Link href={url}>
            <span>
              <i className="mr-1 fas fa-comment-alt fa-xs"></i>
              <span>{commentCount}</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
