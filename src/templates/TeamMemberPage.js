import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";

const TeamMemberPage = ({ pageContext, data: { page, images } }) => {
	const bannerImage = {
		childImageSharp:
			images.nodes[Math.floor(Math.random() * images.nodes.length)]
	};
	return (
		<Layout meta={false} title={page.title || false}>
			<main>
				<PageHeader
					title={page.title}
					subtitle={page.subtitle}
					pageContext={pageContext}
					backgroundImage={bannerImage}
					breadcrumbs
					small
				/>
				<section className="section">
					<div className="container">
						<div className="grid grid-cols-4 gap-12">
							{page.image && (
								<div className="col-span-4 sm:col-span-2 lg:col-span-1">
									<GatsbyImage
										image={
											page.image.localFile.childImageSharp
												.gatsbyImageData
										}
										alt={page.title}
									/>
								</div>
							)}
							<div className="col-span-4 sm:col-span-2 lg:col-span-3">
								<div
									dangerouslySetInnerHTML={{
										__html: page.content?.html
									}}
								></div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</Layout>
	);
};
export default TeamMemberPage;

export const pageQuery = graphql`
	query TeamMemberPage($id: String!) {
		images: allImageSharp(
			filter: {
				fluid: { src: { glob: "**/*.jpg" }, aspectRatio: { gt: 3 } }
			} # banner images by aspect
		) {
			nodes {
				gatsbyImageData(
					width: 960
					transformOptions: {
						duotone: { highlight: "#FFFFFF", shadow: "#3C5E31" }
					}
				)
			}
		}
		page: graphCmsTeamMember(id: { eq: $id }) {
			title
			subtitle
			content {
				html
			}
			image {
				...image
			}
		}
	}
`;
