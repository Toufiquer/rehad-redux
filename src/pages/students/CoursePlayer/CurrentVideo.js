import React from "react";
import Assignment from "../../../components/Assignment/Assignment";
import Quiz from "../../../components/Quiz/Quiz";
import { useGetVideoQuery } from "../../../redux/features/videos/videosApi";
import Loading from "../../../components/Loading/Loading";
import { toast } from "react-toastify";
import moment from "moment/moment";

const CurrentVideo = ({ id }) => {
  const { data, isLoading, isError, error } = useGetVideoQuery(id);
  const { createdAt, description, title, url } = data || {};
  let content;
  if (isLoading && !isError) {
    content = <Loading />;
  }
  if (!isLoading && isError) {
    toast.error(error.message, { toastId: (Math.random() * 1000).toFixed(0) });
  }
  if (!isLoading && !isError && data?.id === undefined) {
    content = <h2>Ops! Nothing was Found.</h2>;
  }
  if (!isLoading && !isError && data?.id) {
    const calculateTime = (arrTime) => {
      const timeString = arrTime; //"2023-02-24T17:59:00.000Z";
      const date = new Date(timeString);
      const timeInMilliseconds = date.getTime();
      const fromNow = moment(timeInMilliseconds).fromNow();
      return fromNow;
    };
    content = (
      <div className="col-span-full w-full space-y-8 lg:col-span-2">
        <iframe
          width="100%"
          className="aspect-video"
          src={url}
          title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-100">
            {title}
          </h1>
          <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
            {calculateTime(createdAt)}
          </h2>

          <div className="flex gap-4">
            <Assignment id={id} />
            <Quiz id={id} />
          </div>
          <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
        </div>
      </div>
    );
  }
  return <>{content}</>;
};

export default CurrentVideo;
