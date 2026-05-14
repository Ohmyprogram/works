import { type CreatePagesArgs } from "gatsby";

interface NotionPostsQueryResult {
  allNotionPost: {
    edges?: Array<{
      node: {
        slug: string;
        affiliation?: string;
        template?: string;
        fields?: {
          slug: string;
        };
      };
    }>;
  };
}

const notionPostsQuery = async (graphql: CreatePagesArgs["graphql"]) => {
  const result = await graphql<NotionPostsQueryResult>(`
    {
      allNotionPost(
        filter: {
          draft: { ne: true }
        }
      ) {
        edges {
          node {
            slug
            affiliation
            template
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  return result?.data?.allNotionPost;
};

export { notionPostsQuery };
