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

async function fetchAllAlbums() {
  const id = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;
  const graphQLClient = new GraphQLClient(id);
  const query = gql`
    {
      featureLists(stage: PUBLISHED, orderBy: date_ASC) {
        title
        link
        date
        author
        coverPhoto {
          url
        }
      }
      photographyLists(stage: PUBLISHED, first: 100, orderBy: priority_ASC) {
        id
        images(first: 1) {
          height
          width
          fileName
          url
        }
        priority
        title
        type
        highlight
      }
      modellingLists(stage: PUBLISHED) {
        id
        images {
          height
          width
          fileName
          url
        }
        title
        type
        highlight
      }
      portraitLists(stage: PUBLISHED) {
        image {
          height
          width
          id
          url
        }
        title
      }
    }
  `;

  try {
    const data = await graphQLClient.request(query);
    return data;
  } catch (error) {
    console.error("GraphQL request failed:", error);
    throw error;
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await fetchAllAlbums();
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
