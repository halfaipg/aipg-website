import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";

// export const sanity_client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   apiVersion: "2022-03-25",
//   dataset: "production",
//   useCdn: true,
// });

export const sanity_client = createClient({
  projectId: "2rmanep2",
  apiVersion: "2022-03-25",
  dataset: "production",
  useCdn: true,
});

const builder = ImageUrlBuilder(sanity_client);

export function urlFor(source) {
  return builder.image(source);
}
