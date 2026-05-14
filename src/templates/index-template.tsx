import React, { type FC } from "react";

import { graphql, Link } from "gatsby";

import { Feed } from "@/components/feed";
import { Meta } from "@/components/meta";
import { Page } from "@/components/page";
import { Layout } from "@/components/layout";
import { Sidebar } from "@/components/sidebar";
import { Pagination } from "@/components/pagination";
import { useSiteMetadata } from "@/hooks/use-site-metadata";
import { affiliations, allAffiliationsPath } from "@/constants/affiliations";
import type { PageContext } from "@/types/page-context";

interface IndexTemplateProps {
  data: {
    allNotionPost: {
      edges: Array<{
        node: {
          fields: {
            categorySlug: string;
            slug: string;
          };
          slug: string;
          title: string;
          date: string;
          description: string;
          category: string;
          affiliation?: string;
        };
      }>;
    };
  };
  pageContext: PageContext;
}

const IndexTemplate: FC<IndexTemplateProps> = ({ data, pageContext }) => {
  const { affiliation, pagination } = pageContext;
  const { limit = 4, offset = 0 } = pageContext as PageContext & {
    limit?: number;
    offset?: number;
  };
  const { hasNextPage, hasPrevPage, prevPagePath, nextPagePath } = pagination;
  const filteredEdges = affiliation
    ? data.allNotionPost.edges.filter(
        (edge) => edge.node.affiliation === affiliation
      )
    : data.allNotionPost.edges;
  const pagedEdges = filteredEdges.slice(offset, offset + limit);

  // Transform NotionPost data to match Feed component format
  const edges = pagedEdges.map(edge => ({
    node: {
      fields: {
        categorySlug: edge.node.fields?.categorySlug || '/category/uncategorized',
        slug: edge.node.fields?.slug || edge.node.slug
      },
      frontmatter: {
        title: edge.node.title,
        date: edge.node.date,
        description: edge.node.description,
        category: edge.node.category,
        affiliation: edge.node.affiliation,
        slug: edge.node.slug
      }
    }
  }));

  return (
    <Layout>
      <Sidebar isHome />
      <Page>
        <nav className="affiliationTabs" aria-label="소속 필터">
          <Link
            className={!affiliation ? "affiliationTab active" : "affiliationTab"}
            to={allAffiliationsPath}
          >
            전체
          </Link>
          {affiliations.map((item) => (
            <Link
              className={
                affiliation === item.label
                  ? "affiliationTab active"
                  : "affiliationTab"
              }
              key={item.label}
              to={item.path}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query IndexTemplate {
    allNotionPost(
      sort: { date: DESC }
      filter: { template: { eq: "post" }, draft: { ne: true } }
    ) {
      edges {
        node {
          fields {
            categorySlug
            slug
          }
          slug
          title
          date
          description
          category
          affiliation
          template
        }
      }
    }
  }
`;

export const Head: FC<IndexTemplateProps> = ({ pageContext }) => {
  const { title, description } = useSiteMetadata();
  const {
    pagination: { currentPage: page },
  } = pageContext;
  const pageTitle = page > 0 ? `Posts - Page ${page} - ${title}` : title;

  return <Meta title={pageTitle} description={description} />;
};

export default IndexTemplate;
