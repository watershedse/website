import { graphql, StaticQuery } from "gatsby";
import React, { Fragment } from "react";
import Helmet from "react-helmet";
import Footer from "./Footer";
import "./globalStyles.css";
import Meta from "./Meta";
import Nav from "./Nav";

export default ({ children, meta, title }) => {
	return (
		<StaticQuery
			query={graphql`
				query IndexLayoutQuery {
					settingsYaml {
						siteTitle
						siteDescription
						googleTrackingId
						socialMediaCard {
							image
						}
					}
					services: allGraphCmsPage(
						filter: { slug: { regex: "/services\//" } }
					) {
						nodes {
							title
							slug
							order
						}
					}
				}
			`}
			render={(data) => {
				const { siteTitle, socialMediaCard, googleTrackingId } =
					data.settingsYaml || {};

				const services = data.services.nodes;
				services.sort((a, b) => a.order - b.order);
				const subNav = {
					// eslint-disable-next-line no-prototype-builtins
					services: services
				};

				return (
					<Fragment>
						<Helmet
							defaultTitle={siteTitle}
							titleTemplate={`%s | ${siteTitle}`}
						>
							<title>{title}</title>
							{/* Add font link tags here */}
						</Helmet>

						<Meta
							googleTrackingId={googleTrackingId}
							absoluteImageUrl={
								socialMediaCard &&
								socialMediaCard.image &&
								socialMediaCard.image
							}
							{...meta}
							{...data.settingsYaml}
						/>

						<Nav subNav={subNav} />

						<Fragment>{children}</Fragment>

						<Footer />
					</Fragment>
				);
			}}
		/>
	);
};
