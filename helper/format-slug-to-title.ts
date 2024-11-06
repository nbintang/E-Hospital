export const formatSlugToTitle = (slug: string) => {
    return slug
      .split("-")                        // Split the slug into words based on hyphens
      .map((word) =>                     // Capitalize the first letter of each word
        word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");                        // Join the words back with spaces
  };