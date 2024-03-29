const path = require("path");
require("dotenv").config({
	path: `.env.${process.env.NODE_ENV}`
});

const slugify = (str) => {
	str = str || "";
	str = str.replace("home", "");
	if (!str.startsWith("/")) {
		str = `/${str}`;
	}
	str = str.toLowerCase().replace(/ /g, "-");
	return str;
};

exports.createPages = async ({ actions, graphql }) => {
	const { createPage } = actions;

	const createPages = (pages, template) => {
		for (let page of pages) {
			let templateToUse = template;
			switch (page.slug) {
				case "contact":
					templateToUse = "ContactPage";
					break;
				default:
					templateToUse = template;
					break;
			}
			createPage({
				component: path.resolve(`src/templates/${templateToUse}.js`),
				context: {
					slug: page.slug,
					id: page.id,
					page
				},
				path: slugify(page.slug)
			});
		}
	};

	const teamMembers = await graphql(`
		{
			team: allGraphCmsTeamMember {
				nodes {
					id
					slug
				}
			}
		}
	`);

	const portfolioItems = await graphql(`
		{
			portfolio: allGraphCmsPortfolio {
				nodes {
					id
					slug
				}
			}
		}
	`);

	const pageItems = await graphql(`
		{
			page: allGraphCmsPage {
				nodes {
					id
					slug
				}
			}
		}
	`);

	createPages(teamMembers.data.team.nodes, "TeamMemberPage");
	createPages(portfolioItems.data.portfolio.nodes, "PortfolioPage");
	createPages(pageItems.data.page.nodes, "DefaultPage");
};
