import { useHeaderSlicers } from "../Slicers";

export const useHeader = () => {
  const search = useHeaderSlicers((state: any) => state.search);
  const setSearch = useHeaderSlicers((state: any) => state.setSearch);

  return { search, setSearch };
};
