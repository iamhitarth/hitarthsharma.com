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

How can we navigate from a screen on a `StackNavigator` on one tab to a screen on the `StackNavigator` of another tab, when both tabs belong to the same `TabNavigator`?

The concept to keep in mind is that you can navigate between any two screens as long as they belong to the same navigator.

The general tendency is to have and create a tab navigator as the root navigator - however this leads to problems when attempting to navigate between screens on one tab to another.

To avoid this, the simple solution is to just wrap the tab navigator with a parent stack navigator that then in turn also maintains all the other app screens.

This simple shuffling around of our navigation structure allows us to navigate between any of the screens we want.

The simplest way to do this is to structure your navigators as shown below:

```javascript
// In your navigation config

// Stack for our first tab
const SavedStack = createStackNavigator(
  {
    SavedCoursesScreen
  }
);

// Stack for our second tab
const TeamStack = createStackNavigator(
  {
    TeamScreen
  }
);

// Our tab navigator
const HomeTabs = createBottomTabNavigator(
  {
    TeamStack
    SavedStack,
  },
  {
    initialRouteName: 'TeamStack'
  }
);

// Our app stack that contains the tabs and rest of the screens
// that we would like to navigate back and forth from
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
Maybe include a small example code project?
