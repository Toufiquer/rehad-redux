import React from "react";
import { useGetVideosQuery } from "../../../redux/features/videos/videosApi";
import Loading from "../../../components/Loading/Loading";
import { toast } from "react-toastify";
import SingleVideo from "./SingleVideo";

const RelatedVideo = ({ id }) => {
  const { data, isLoading, isError, error } = useGetVideosQuery();
  let content;
  if (isLoading && !isError) {
    content = <Loading />;
  }
  if (!isLoading && isError) {
    toast.error(error.message, { toastId: (Math.random() * 1000).toFixed(0) });
  }
  if (!isLoading && !isError && data?.length === 0) {
    content = <h2>Ops! Nothing was Found.</h2>;
  }
  if (!isLoading && !isError && data?.length > 0) {
    content = data
      //   .filter((i) => parseInt(i.id) !== parseInt(id))  If filter without current video
      .map((v) => <SingleVideo key={v.id} data={v} />);
  }
  return <>{content}</>;
};

export default RelatedVideo;
