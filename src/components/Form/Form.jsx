import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { createPost, updatePost } from "../../actions/post";

const Form = ({ currentId, setCurrentId }) => {
  const post = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant={"h6"}>
          {currentId ? `Editing a Memory` : `Creating a Memory`}
        </Typography>
        <TextField
          name={"creator"}
          variant={"outlined"}
          label={"Creator"}
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name={"title"}
          variant={"outlined"}
          label={"Title"}
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name={"message"}
          variant={"outlined"}
          label={"Message"}
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name={"tags"}
          variant={"outlined"}
          label={"Tags"}
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase64
            type={"file"}
            multiple={false}
            onDone={({ base64 }) => {
              setPostData({ ...postData, selectedFile: base64 });
            }}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant={"contained"}
          color={"primary"}
          size={"large"}
          type={"submit"}
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant={"contained"}
          color={"secondary"}
          size={"small"}
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
