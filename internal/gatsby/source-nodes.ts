import type { GatsbyNode, SourceNodesArgs } from "gatsby";
import { createContentDigest } from "gatsby-core-utils";
import { hasNotionCredentials } from "../notion/client";
import { fetchNotionPages } from "../notion/fetch-pages";
import { transformNotionPage } from "../notion/transform";

export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
  actions,
  createNodeId,
  reporter,
}: SourceNodesArgs) => {
  const { createNode } = actions;

  if (!hasNotionCredentials) {
    reporter.warn(
      "Skipping Notion sync because NOTION_API_KEY or NOTION_DATABASE_ID is missing. Add them to .env.development for local Notion testing, and to GitHub Secrets for deploys."
    );
    return;
  }

  reporter.info("🔍 Fetching Notion pages...");

  try {
    const pages = await fetchNotionPages();

    if (pages.length === 0) {
      reporter.warn("⚠️  No pages found in Notion database. Make sure you have published pages.");
      return;
    }

    reporter.info(`📄 Found ${pages.length} pages in Notion database`);

    let successCount = 0;
    let errorCount = 0;

    for (const page of pages) {
      try {
        const { frontmatter, content } = await transformNotionPage(page);

        if (frontmatter.draft) {
          reporter.info(`⏭️  Skipping draft: ${frontmatter.title}`);
          continue;
        }

        // No need to skip pages anymore - we handle missing fields with fallbacks
        // Log info about pages that needed fallback values
        if (!page.properties.Title && !page.properties.Name) {
          reporter.info(`📝 Using generated title for page ${page.id}`);
        }
        if (!page.properties.Slug) {
          reporter.info(`📝 Generated slug for: ${frontmatter.title}`);
        }

        const nodeData = {
          ...frontmatter,
          content,
          notionId: page.id,
          createdTime: page.created_time,
          lastEditedTime: page.last_edited_time,
        };

        createNode({
          ...nodeData,
          id: createNodeId(`NotionPost-${page.id}`),
          parent: null,
          children: [],
          internal: {
            type: "NotionPost",
            contentDigest: createContentDigest(nodeData),
            mediaType: "text/html",
            content: content,
          },
        });

        reporter.info(`✅ Created node: ${frontmatter.title}`);
        successCount++;
      } catch (pageError) {
        errorCount++;
        reporter.error(`❌ Failed to process page ${page.id}:`, pageError as Error);
        // Continue processing other pages
      }
    }

    if (successCount > 0) {
      reporter.success(`🎉 Successfully created ${successCount} NotionPost nodes`);

      if (errorCount > 0) {
        reporter.warn(`⚠️  Failed to process ${errorCount} pages. Check the logs above for details.`);
      }
    } else if (errorCount > 0) {
      reporter.panicOnBuild(
        `❌ Failed to create any nodes. ${errorCount} pages had errors.`
      );
    }
  } catch (error) {
    reporter.panicOnBuild(
      "❌ Failed to source Notion pages",
      error as Error
    );
  }
};
