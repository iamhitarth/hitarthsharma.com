---
title: Navigating Between Stacks in Different Tabs with React Navigation
categories: [tech]
tags:
  [
    navigation,
    react native,
    react,
    react navigation,
    stack navigator,
    tab navigator,
    javascript,
    typescript,
    screen,
    scene,
  ]
---

How can we navigate between a screen on a `StackNavigator` on one tab to a screen on the `StackNavigator` on another tab of a `TabNavigator`?

Well there is no out of the box solution but the simplest way to do this is to structure your navigators as shown below:

```javascript
// In your navigation config
const AppStack = createStackNavigator({
  HomeTabs,
  CoursesListScreen,
  CourseDetailsScreen,
  LessonEditorScreen,
  LessonPreviewScreen,
})
```

Explain the problem with a diagram: tabs + stacks
Draw arrows on the diagram to explain what we are trying to do
Restructured diagram to show how we will get around the problem
Then show the code.
