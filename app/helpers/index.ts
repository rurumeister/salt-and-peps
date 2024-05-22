export const transformSlugToTitle = (slug: string) => {
  return slug
    .split("-")
    .map((word) => word.replace(/^./, (match) => match.toUpperCase()))
    .join(" ")
    .replace(/ & /g, " & ");
};
