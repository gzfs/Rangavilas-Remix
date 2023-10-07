export function symmetricDifferenceByKeywordId(
  arr1: {
    id: string;
    keyword_id: string;
    product_id: string;
  }[],
  arr2: {
    id: string;
    keyword_id: string;
    product_id: string;
  }[]
) {
  // Create a set of keyword_ids from each array
  const set1 = new Set(arr1.map((item) => item.keyword_id));
  const set2 = new Set(arr2.map((item) => item.keyword_id));

  // Calculate the symmetric difference using the spread operator and Set objects
  const symmetricDifferenceSet = new Set(
    [...set1, ...set2].filter(
      (keywordId) => !(set1.has(keywordId) && set2.has(keywordId))
    )
  );

  // Create an array of objects from the symmetric difference set
  const result = [...symmetricDifferenceSet].map((keywordId) => {
    const item1 = arr1.find((item) => item.keyword_id === keywordId);
    const item2 = arr2.find((item) => item.keyword_id === keywordId);

    // Return the item from arr1 if it exists, otherwise, return the item from arr2
    return item1 || item2;
  });

  return result;
}

export function intersection(arr1: Array<any>, arr2: Array<any>) {
  return arr1.filter((item) => arr2.includes(item));
}
