import { GatsbyImage } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import React from "react";
import { graphql } from "gatsby";

const PortfolioPage = ({ pageContext, data: { page, bannerImage } }) => {
	return (
        <Layout title={page.title || false}>
			<main>
				<PageHeader
					title={page.title}
					pageContext={pageContext}
					backgroundImage={bannerImage?.image?.localFile}
					small
				/>
				<section className="section">
					<div className="container">
						<div className="grid grid-cols-5 gap-12">
							<div className="col-span-5 lg:col-span-3">
								<div className="body-content"
									dangerouslySetInnerHTML={{
										__html: page.content?.html
									}}
								></div>
							</div>
							{page.image && (
								<div className="col-span-5 lg:col-span-2">
									<GatsbyImage image={page.image.localFile.childImageSharp.gatsbyImageData} />
								</div>
							)}
						</div>
					</div>
				</section>
			</main>
		</Layout>
    );
};
export default PortfolioPage;

export const pageQuery = graphql`query PortfolioPage($id: String!) {
  bannerImage: graphCmsPortfolio(id: {eq: $id}) {
    image {
      localFile {
        childImageSharp {
          gatsbyImageData(
            width: 960
            height: 125
            quality: 40
            transformOptions: {duotone: {highlight: "#FFFFFF", shadow: "#283e21", opacity: 100}, cropFocus: CENTER}
            layout: CONSTRAINED
          )
        }
      }
    }
  }
  page: graphCmsPortfolio(id: {eq: $id}) {
    id
    title
    slug
    categories {
      slug
      title
    }
    content {
      html
    }
    image {
      localFile {
        childImageSharp {
          gatsbyImageData(width: 400, layout: CONSTRAINED)
        }
      }
    }
  }
}
`;
