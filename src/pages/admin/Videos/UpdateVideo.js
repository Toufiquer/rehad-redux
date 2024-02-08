import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetVideoQuery,
  useUpdateVideoMutation,
} from "../../../redux/features/videos/videosApi";
import Loading from "../../../components/Loading/Loading";

const UpdateVideo = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");

  const {
    isError: isErrorReq,
    error: errorReq,
    isLoading: isLoadingReq,
    data: firstLoad,
  } = useGetVideoQuery(id);
  useEffect(() => {
    const { title, description, url, views, duration } = firstLoad || {};
    setTitle(title);
    setDescription(description);
    setUrl(url);
    setViews(views);
    setDuration(duration);
    setError("");
  }, [firstLoad]);
  const clearForm = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setViews("");
    setDuration("");
    setError("");
  };
  // const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [updateVideo, { isSuccess, isLoading, isError, error: addVideoError }] =
    useUpdateVideoMutation();
  useEffect(() => {
    error && toast.error(error, { toastId: (Math.random() * 1000).toFixed(0) });
  }, [error]);
  useEffect(() => {
    if (isError || isErrorReq) {
      setError(addVideoError?.error || errorReq?.error);
    }
  }, [isError, addVideoError, isErrorReq, errorReq]);
  useEffect(() => {
    if (isSuccess) {
      clearForm();
      toast.success("Video updated successfully", {
        toastId: (Math.random() * 1000).toFixed(0),
      });
      navigate("/admin/videos");
    }
  }, [isSuccess, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const currVideo = {
      title: title,
      description: description,
      url: url,
      views: views,
      duration: duration,
      createdAt: new Date().toISOString(),
    };
    const update = { id, data: { ...currVideo } };
    updateVideo(update);
  };

  // Decide what to render
  let content;
  if (isLoadingReq) {
    content = <Loading />;
  }
  if (firstLoad) {
    content = (
      <>
        <section className="py-6 bg-primary h-screen grid place-items-center">
          <div className="mx-auto w-full px-5 lg:px-0">
            <div className="max-w-lg mx-auto">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
                  Update video
                </h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {/* <input type="hidden" name="remember" value="true" /> */}
                <div className="rounded-md shadow-sm -space-y-px">
                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="sr-only">
                      Video Title
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="title"
                      autoComplete="true"
                      required
                      className="login-input rounded-t-md text-white"
                      placeholder="Video Title"
                      value={title || " "}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="sr-only">
                      Video Description
                    </label>
                    <input
                      id="description"
                      name="description"
                      type="description"
                      autoComplete="true"
                      required
                      className="login-input rounded-t-md text-white"
                      placeholder="Video Description"
                      value={description || ""}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  {/* Url */}
                  <div>
                    <label htmlFor="url" className="sr-only">
                      Video Url
                    </label>
                    <input
                      id="url"
                      name="url"
                      type="url"
                      autoComplete="true"
                      required
                      className="login-input rounded-t-md text-gray-800"
                      placeholder="Video Url"
                      value={url || " "}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                  {/* Views */}
                  <div>
                    <label htmlFor="views" className="sr-only">
                      Video Views
                    </label>
                    <input
                      id="views"
                      name="views"
                      type="views"
                      autoComplete="true"
                      required
                      className="login-input rounded-t-md text-white"
                      placeholder="Video Views"
                      value={views || ""}
                      onChange={(e) => setViews(e.target.value)}
                    />
                  </div>
                  {/* Duration */}
                  <div>
                    <label htmlFor="duration" className="sr-only">
                      Video Duration
                    </label>
                    <input
                      id="duration"
                      name="duration"
                      type="duration"
                      autoComplete="true"
                      required
                      className="login-input rounded-t-md text-white"
                      placeholder="Video Duration"
                      value={duration || " "}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                  >
                    Update Video
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </>
    );
  }
  return content;
};

export default UpdateVideo;
