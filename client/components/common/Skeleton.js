import React from "react";
import {
  SkeletonPage,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText,
  Layout,
  Card
} from "@shopify/polaris";

export default () => {
  return (
    <SkeletonPage>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={9} />
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
};
