import { graphql } from "gatsby";

export const query = graphql`fragment image on GraphCMS_Asset {
  localFile {
    childImageSharp {
      gatsbyImageData(width: 400, layout: CONSTRAINED, placeholder: BLURRED)
    }
  }
}

fragment imageWide on GraphCMS_Asset {
  localFile {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
    }
  }
}
`;
