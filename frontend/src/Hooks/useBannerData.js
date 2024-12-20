import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const useBannerData = (type) => {
  const { data: subCategories } = useFetch("/sub-categories?populate=*");
  const { data: metaCategories } = useFetch("/meta-categories?populate=*");
  const [bannerData, setBannerData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (subCategories && metaCategories && type) {
      const lowerType = type.toLowerCase();

      const subMatch = subCategories.find(
        (sub) => sub?.attributes?.title?.toLowerCase() === lowerType
      );

      if (subMatch) {
        setBannerData({
          type: "subCategory",
          attributes: subMatch.attributes,
        });
        setError(false);
        return;
      }

      const metaMatch = metaCategories.find(
        (meta) => meta?.attributes?.title?.toLowerCase() === lowerType
      );

      if (metaMatch) {
        setBannerData({
          type: "metaCategory",
          attributes: metaMatch.attributes,
        });
        setError(false);
        return;
      }

      setBannerData(null);
      setError(true);
    }
  }, [subCategories, metaCategories, type]);

  return { bannerData, error };
};

export default useBannerData;
