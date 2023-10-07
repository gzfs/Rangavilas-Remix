type InputElementType = {
  name: string | null;
  description: string | null;
  id: string | null;
  rating: number | null;
  price: number | null;
  is_featured: boolean | null;
  url: string;
  category_name: string | null;
  keyword: string | null;
};

export type OutputElementType = {
  name: string | null;
  description: string | null;
  id: string | null;
  rating: number | null;
  price: number | null;
  is_featured: boolean | null;
  url: string[];
  category_name: string | null;
  keyword: string[];
};

export function mergeUrls(
  inputArray: InputElementType[]
): OutputElementType[] {
  const result: { [id: string]: OutputElementType } = {};

  for (const item of inputArray) {
    if (item.id != null) {
      if (!result[item.id]) {
        // If an item with the same id doesn't exist, create a new entry
        result[item.id] = {
          ...item,
          url: [item.url],
          keyword: item.keyword !== null ? [item.keyword] : [],
        };
      } else {
        // If an item with the same id exists, add the URL and keyword to sets to ensure uniqueness
        result[item.id].url.push(item.url);
        if (item.keyword !== null)
          result[item.id].keyword.push(item.keyword);
      }
    }
  }

  // Convert the result object back to an array and convert URL and keyword sets to arrays
  const outputArray = Object.values(result).map((item) => ({
    ...item,
    url: Array.from(new Set(item.url)),
    keyword: Array.from(new Set(item.keyword)),
  }));

  return outputArray;
}
