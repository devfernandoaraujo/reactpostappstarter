import { Suspense } from 'react';
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  Container,
  Button,
  rem,
} from '@mantine/core';
import useBoundStore from "../../store/Store";
import { useLoaderData, Link, Await, defer, useAsyncValue } from "react-router-dom";
import classes from "../../css/PostDetails.page.module.css";
import Loader from "../../components/misc/Loader";

function PostDetailsPage() {
  const post = useLoaderData();
 

  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={post.details}
        errorElement={<p>Error loading the posts!</p>}
      >
        <GetPost />
      </Await>
    </Suspense>
  );
}

const GetPost=()=>{
  const { data: post } = useAsyncValue();
  
  const { user } = useBoundStore((state) => state);
  const theme = useMantineTheme();
  
  const buttons = () => {
    if(user !== null && post.userId === user.id){
      return(
        <Container size="md">
          <Group gap={30}>
            <Button className={classes.view} variant="Black" color="dark" radius={10}>
              <Link to={`/posts/edit/${ post.id }`}>Edit</Link>
            </Button>
          </Group>
        </Container>
      )
    }
  };

  return (
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.cardSession}>
            <Image src={post.image} height={400} />
        </Card.Section>

        <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
          {post.category}
        </Badge>

        <Text className={classes.title} fw={500} component="a">
          {post.title}
        </Text>

        <Text fz="sm" c="dimmed" lineClamp={4}>
          {post.content}
        </Text>

        <Group justify="space-between" className={classes.footer}>
          <Center>
            <Avatar
              src= {post.avatar}
              size={24}
              radius="xl"
              mr="xs"
            />
            <Text fz="sm" inline>
              {post.userName}
            </Text>
          </Center>

          <Group gap={8} mr={0}>
            <ActionIcon className={classes.action}>
              <IconHeart style={{ width: rem(16), height: rem(16) }} color={theme.colors.red[6]} />
            </ActionIcon>
            <ActionIcon className={classes.action}>
              <IconBookmark
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.yellow[7]}
              />
            </ActionIcon>
            <ActionIcon className={classes.action}>
              <IconShare style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
            </ActionIcon>
          </Group>
        </Group>
        {buttons()}
      </Card>
    
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return defer({details: res});
};

export default PostDetailsPage;
