import { useGetUsersQuery } from "../redux/features/users/usersApi";
import { useGetVideosQuery } from "../redux/features/videos/videosApi";

const useFirstLoad = () => {
  useGetUsersQuery();
  useGetVideosQuery();
};

export default useFirstLoad;
