import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<{
  spec: any;
}>(import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
    const desc = `
**O**pen **S**ource **P**erceptual **I**mage **H**ashing **A**PI.

<br />

The idea was to create an open-source API public to the world that can provide the following features:

- Send an image and it will return the block hash perceptual image hashing string.

- Send 2 images and it will return the Hamming Distance between their hashing so you can have a % of how similar they are.

<br />

This will be an open-source project so it will be free forever, we are going to provide ways for people to donate to help keep the servers running and also to get better servers.

This source code will be used to create a web and mobile app for finding island information in the game Sea of Thieves.
    `
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'OSPIHA DOCS',
        version: '1.0',
        description: desc.toString()
      },
    },
    apiFolder: 'pages/api'
  });

  return {
    props: {
      spec
    }
  };
};

export default ApiDoc;
