import { GraphQLClient, gql } from "graphql-request";
import { NextResponse } from "next/server";

const apiURL = process.env.NEXT_PUBLIC_API_URL as string;
const token = process.env.NEXT_PUBLIC_API_TOKEN as string;

const client = new GraphQLClient(apiURL, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

const query = gql`
  query {
    pepsPhotographListCollection(
      where: { sys: { publishedAt_exists: true }, highlight: true }
    ) {
      items {
        title
        type
        imagesCollection {
          items {
            url
            title
            description
          }
        }
        highlight
      }
    }
  }
`;

export async function GET() {
  try {
    const data = await client.request(query);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
