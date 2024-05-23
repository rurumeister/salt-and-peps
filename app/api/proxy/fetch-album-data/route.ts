// pages/api/proxy/fetchAlbumData.ts

import { GraphQLClient, gql } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

interface output {
  photographyLists?: {
    id: string;
    images: {
      fileName: string;
      url: string;
    }[];
    title: string;
    type: string;
  }[];
}

async function fetchAlbumData(title: string) {
  const id = process.env.HYGRAPH_ENDPOINT as string;
  const graphQLClient = new GraphQLClient(id);
  const query = gql`
    {
      photographyLists(stage: PUBLISHED, where: { title: "${title}" }) {
        id
        images {
          fileName
          url
        }
        title
        type
      }
    }
  `;

  try {
    const output = (await graphQLClient.request(query)) as output;
    const data = output?.photographyLists?.[0];
    return data;
  } catch (error) {
    console.error("GraphQL request failed:", error);
    throw error;
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  if (!title) {
    return new NextResponse(JSON.stringify({ error: "Title is required" }), {
      status: 400,
    });
  }
  try {
    const data = await fetchAlbumData(title);
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}
