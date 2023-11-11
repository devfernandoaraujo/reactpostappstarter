import { Paper, Text, Title, Button, rem } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from '../../css/ArticleCardImage.module.css'

  


export function ArticleCardImage({ title, category, image, id }) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      < div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button className={classes.view} variant="white" color="dark" radius={10}>
        <Link to={id.toString()}>View</Link>
      </Button>
      </div>
    </Paper>
  );
}
