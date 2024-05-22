import { GraphQLClient, gql } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

const apiURL = process.env.NEXT_PUBLIC_API_URL as string;
const token = process.env.NEXT_PUBLIC_API_TOKEN as string;

const client = new GraphQLClient(apiURL, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

const query = gql`
  query ($title: String!) {
    pepsModellingListCollection(where: { title: $title }) {
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  if (!title) {
    return new NextResponse(JSON.stringify({ error: "Title is required" }), {
      status: 400,
    });
  }

  try {
    const data = await client.request(query, { title });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
