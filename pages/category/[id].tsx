import { useRouter } from "next/router";
import useSWR from "swr";
import DataGrid from "../../components/DataGrid";
import Error from "../../components/Error";
import { FC } from "react";
import Loader from "../../components/Loader";
import { getCategoryInfo } from "../../services/category";

const Category: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { error, data } = useSWR(`category-${id}`, () =>
    getCategoryInfo(id as string)
  );

  if (error) return <Error />;

  if (!data) return <Loader />;

  return (
    <div className="mx-[5vw] mb-5">
      <h1 className="mt-5 mb-3 text-2xl">Category: {data.category.name}</h1>

      <DataGrid
        type="link"
        handler={(id: string) => `/playlist/${id}`}
        data={data.playlists.items
          .filter((playlist) => playlist.name)
          .map((playlist) => ({
            id: playlist.id,
            image: playlist.images?.[0]?.url,
            title: playlist.name,
            description: playlist?.owner?.display_name,
          }))}
      />
    </div>
  );
};

export default Category;
