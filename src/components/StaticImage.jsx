import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { BgImage } from "gbimage-bridge";
import React, { useMemo } from "react";

export const StaticImage = ({ src, alt, background, ...props }) => {
	const data = useStaticQuery(graphql`
		query LogoQuery {
			allFile(
				filter: { extension: { in: ["jpg", "jpeg", "png", "webp"] } }
			) {
				nodes {
					relativePath
					childImageSharp {
						gatsbyImageData(
							width: 400
							placeholder: NONE
							layout: CONSTRAINED
						)
					}
				}
			}
		}
	`);

	const match = useMemo(
		() => data.allFile.nodes.find(({ relativePath }) => src === relativePath),
		[data, src]
	);

	if (!match) {
		throw `Image "${src} not found!`;
	}

	if (background) {
		return (
			<BgImage
				style={{
					position: "absolute",
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}}
				image={match.childImageSharp.gatsbyImageData}
			/>
		);
	}

	return (
		<GatsbyImage
			image={match.childImageSharp.gatsbyImageData}
			alt={alt}
			{...props}
		/>
	);
};
