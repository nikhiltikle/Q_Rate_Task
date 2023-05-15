"use client";
import React, { useState, useEffect } from "react";
import { Box, AppBar, Toolbar, Typography } from "../Mui/material";
import { useSelector } from "react-redux";
import { LinearProgressWithLabel } from "../PorgressBar";

const Progress = () => {
  const drawerWidth = 220;
  const [lessonProgress, setLessonProgress] = useState(0);
  const [courseProgress, setCourseProgress] = useState(0);
  const activeCourse = useSelector((state) => state.progress.activeCourse);
  const lessonsCompleted = useSelector(
    (state) => state.progress.lessonsCompleted
  );
  const inTotalLessons = 4;

  useEffect(() => {
    console.log(lessonsCompleted, activeCourse);
    const [lessonCount, totalLessons] = lessonsCompleted[activeCourse] || [
      0, 1,
    ];
    setLessonProgress((100 * lessonCount) / totalLessons);
    let totalLessonsDone = 0;
    for (const [_key, value] of Object.entries(lessonsCompleted)) {
      totalLessonsDone += value[0];
    }
    if (inTotalLessons == 0) {
      setCourseProgress(0);
    } else {
      setCourseProgress((100 * totalLessonsDone) / inTotalLessons);
    }
    console.log(lessonProgress, courseProgress);
  }, [activeCourse, courseProgress, lessonProgress, lessonsCompleted]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
        }}
      >
        <Toolbar sx={{ justifyContent: "end", gap: "4rem" }}>
          <Box display="flex" gap="2rem" alignItems="center">
            <Typography fontWeight="600">Current Course Progress:</Typography>
            <LinearProgressWithLabel value={lessonProgress} />
          </Box>
          <Box display="flex" gap="2rem" alignItems="center">
            <Typography fontWeight="600">Learning Progress:</Typography>
            <LinearProgressWithLabel value={courseProgress} />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Progress;