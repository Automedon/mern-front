import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import { ThumbUpAlt, MoreHoriz, Delete } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/post";
import useStyles from "./styles";
import moment from "moment";

const Post = ({
  post: {
    selectedFile,
    title,
    creator,
    createdAt,
    tags,
    message,
    likeCount,
    _id,
  },
  setCurrentId,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={selectedFile} title={title} />
      <div className={classes.overlay}>
        <Typography variant={"h6"}>{creator}</Typography>
        <Typography variant={"body2"}>{moment(createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size={"small"}
          onClick={() => {
            setCurrentId(_id);
          }}
        >
          <MoreHoriz fontSize={"default"} />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant={"body2"} color={"textSecondary"}>
          {tags && tags.map((tag) => `#${tag}`)}
        </Typography>
      </div>
      <Typography className={classes.title} variant={"h5"} gutterBottom>
        {title}
      </Typography>
      <CardContent>
        <Typography
          variant={"body"}
          gutterBottom
          color={"textSecondary"}
          component={"p"}
        >
          {message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          color={"primary"}
          size={"small"}
          onClick={() => dispatch(likePost(_id))}
        >
          <ThumbUpAlt fontSize={"small"} />
          &nbsp; Like &nbsp; {likeCount}
        </Button>
        <Button
          color={"primary"}
          size={"small"}
          onClick={() => dispatch(deletePost(_id))}
        >
          <Delete fontSize={"small"} />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
