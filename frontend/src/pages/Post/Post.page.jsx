import { Suspense } from 'react';
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container } from "@mantine/core";
import { useLoaderData, Await, defer, useAsyncValue } from "react-router-dom";
import Loader from "../../components/misc/Loader";

export const PostPage = () => {
  const posts = useLoaderData();

  return (
    
      <Container>
          <SimpleGrid cols={3}>
            <Suspense fallback={<Loader />}>
              <Await
                resolve={posts.list}
                errorElement={<p>Error loading the posts!</p>}
              >
                <ListPosts />
              </Await>
            </Suspense>
          </SimpleGrid>
      </Container>
  );
};

const ListPosts = ()=> {
  const list = useAsyncValue();
  return (
    list.data.map((post) => (
      <ArticleCardImage key={post.title} {...post} />
    ))
  )
}

export const postsLoader = async () => {
 
      const res = axios.get(`${DOMAIN}/api/posts`);

      return defer({list: res});
      //return res.data;
};
