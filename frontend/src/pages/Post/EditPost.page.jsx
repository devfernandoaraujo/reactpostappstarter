import { TextInput, Button, Group, Box, Textarea, Input, Title  } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate, useLoaderData } from "react-router-dom";
import classes from "../../css/EditPostPage.module.css"

function EditPostPage() {
  const post = useLoaderData();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      id: post.id,
      title: post.title,
      category: post.category,
      image: post.image,
      content: post.content,
    },
  });

  const handleSubmit = async (values) => {
    const res = await axios.post(`${DOMAIN}/api/posts`, values);
    if (res?.data.success) {
      navigate("/posts");
    }
  };

  return (
    <Box maw={500} mx="auto" className={classes.formBox}>
      <Group mt="md">
          <Title order={6}>Update {post.title}</Title>
      </Group>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Input type="hidden"
          {...form.getInputProps("id")}
        />
        <TextInput
          label="Title"
          placeholder="Enter a Title"
          withAsterisk
          error="Field is Required"
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Category"
          placeholder="Enter a Category"
          withAsterisk
          error="Field is Required"
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image"
          withAsterisk
          error="Field is Required"
          placeholder="Enter an Image"
          {...form.getInputProps("image")}
        />

        <Textarea
          label="Content"
          withAsterisk
          error="Field is Required"
          autosize
          minRows={4}
          placeholder="Enter some content"
          {...form.getInputProps("content")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </Box>
  );
}

export const postEditLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default EditPostPage;
