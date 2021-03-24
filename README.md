# Survey Buddy Coding interface 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Actions
- alert actions contains all the actions which are used in user authentication
- user actions contain all the API calls Which are used in our app

## Helpers
- Store.js is the store for redux 
- History.js has history variable declared which is used all over the app
- Auth header contains the function which gives two jwt token of the user logged in

## Utilities
- contains the reusable function like isIterable which is used to check whether the data fetched from the backened is iterable or not

## App
- app.jsx contains two useEffects from react to which are used to check the validity of jwt token of the user logged in , one  initially when the app starts or reloads and the another to check for every 60 seconds. 
- A function named hasQuite is also defined which solves the bug in the latest chrome version on scrolling.This contains the routes to all the Pages in the app

## Components
### CodeIt
- It is divided into left and right menu, 
- There is a folder called coding where there is a file Coding.js. In Coding.js which is the root for the CodeRow Component and the dialogue boxes Components which appear on clicking options in the context menu. 
- All the props with transferred from the coding.js to the codeRow and thee dialogue boxes
- In the right menu there is CodeIt RightMenu.js, Where the initial fetch of table data happens. As well as the progressbar fills up acc to “querstion-response-coded” socket
- There is a conditional statement at the end o HTML in the right menu.JS where we render the react-virtualized table only when the filter data is valid
- CodeIt_Table .js Is the previous version of table Implemented using material table
- material-ui- table.js  contains the react-virtualized table code  as well as the code needed to highlight  the search elements
- Tableicons.js contains the icons need to render the  react-virtualized table
### Custom button
- This is a custom made UI component used everywhere in the login register reset password and forgot password  pages,
### Dashboard
- This is divided into left and right menu , the left menu constitutes of showing text according to the progress number
- The rightMenu.js file,  contains condition statements  which conditionally renders different right menus according to the progress number 
- data contains the sample data which  which needs to be passed into a material tabe
- Excel reader file contains all the code  that reads the input excel file and post it to the backend and sets the progress Number == 2 in Redux
- Table.js contains the code for rendering progress Number==2 i.e., Code for rendering the table
- Review and Submit and survey details folders contains the code  progress number is equals to 4 and progress number is equal to 3 respectively
### FiltersBar
- Here is where all the filters on the table data in the coding tool are handled.
### Footer
 - This component renders the bottom of the uploader page ( the previous and next buttons are situated )and the incrementation and decrementation of progress number
- This component handles api call creating the project and getting the project details
### Login, forgot password, register, reset password
- The components are clones of each other using same reusable UI components
### Google sign in
- The code for hanging Google sign is placed here with the basic call for backend as well as integrated with the Google API dashboard
### Home page components
- we are using the navigation bar with created in the previous project here in the login register and forgot password pages
### Navigation
- the basic component in the uploaded page where the links to user projects dashboard and logout are situated
### Private route
- This component interest security to add by using a set of conditional statements which when passed the user can access the user projects dashboard page, uploaderer page ,coding page
### Profile pic components
- A card component to render the available surveys as cards
Custom Navbar made for profile page
- Each folder represents the respective UI components with the required functionality
### Progress bar 
-The progress bar component constitutes of showing the progress in the uploader page According to the changes in progress number
### User projects dashboard components
- The left menu contain the ui to show the Survey Buddy logo and Plus icon UI to redirect to a uploader page
- The right menu contains  Material table which render the user projects, the future functionality for the table like pagination is also included
 ### with Spinner
 - reusable HOC component
 
## Constants
 - User authentication reducer constans were declared here

## Data
- All the data which is hard coded in the app can be changed here


 ## Pages
- All the components are assembled here to make single pages, which are imported into the pp.jd and given to the respective routes

## Reducers
- All the user authentication reducers the placed here

## Redux
- Each folder represents a single reducer. Each folder contains 4 files,  one for action functions,  second one is for the selection of variable from the redux reducer,third one is the reducer and 4th one is for constants for reducer

## Services
 - Contains basic fetch calls for user authentication

## Config.js
- This contains Backend url and frontend url and Socket Configuration

# Structure of Files

## 📦src
- ┣ 📂App
- ┃ ┣ 📜app.css
- ┃ ┣ 📜App.jsx
- ┃ ┗ 📜index.js
- ┣ 📂components
- ┃ ┣ 📂CodeIt
- ┃ ┃ ┣ 📂CodeIt_LeftMenu
- ┃ ┃ ┃ ┣ 📂Coding
- ┃ ┃ ┃ ┃ ┣ 📂components
- ┃ ┃ ┃ ┃ ┃ ┣ 📜AddCategoryDialog.js
- ┃ ┃ ┃ ┃ ┃ ┣ 📜ChooseCategory.js
- ┃ ┃ ┃ ┃ ┃ ┣ 📜CodeRow.js
- ┃ ┃ ┃ ┃ ┃ ┣ 📜Data.js
- ┃ ┃ ┃ ┃ ┃ ┣ 📜FilterButton.js
- ┃ ┃ ┃ ┃ ┃ ┣ 📜Form.js
- ┃ ┃ ┃ ┃ ┃ ┣ 📜N_styles.css
- ┃ ┃ ┃ ┃ ┃ ┣ 📜styles.css
- ┃ ┃ ┃ ┃ ┃ ┗ 📜Test.js
- ┃ ┃ ┃ ┃ ┗ 📜Coding.js
- ┃ ┃ ┃ ┣ 📂styles
- ┃ ┃ ┃ ┃ ┣ 📜custom.css
- ┃ ┃ ┃ ┃ ┗ 📜react-contextmenu.css
- ┃ ┃ ┃ ┣ 📜CodeIt_LeftMenu.css
- ┃ ┃ ┃ ┣ 📜CodeIt_LeftMenu.js
- ┃ ┃ ┃ ┣ 📜LeftMenuTop.js
- ┃ ┃ ┃ ┗ 📜LeftMenu_EditOptions.js
- ┃ ┃ ┗ 📂CodeIt_RightMenu
- ┃ ┃ ┃ ┣ 📜CodeIt_RightMenu.js
- ┃ ┃ ┃ ┣ 📜CodeIt_RightMenu.scss
- ┃ ┃ ┃ ┣ 📜CodeIt_Table.js
- ┃ ┃ ┃ ┣ 📜ExcelReader.js
- ┃ ┃ ┃ ┣ 📜MakeColumns.js
- ┃ ┃ ┃ ┣ 📜material-ui-table.js
- ┃ ┃ ┃ ┣ 📜MultipleSelectStyles.js
- ┃ ┃ ┃ ┣ 📜TableIcons.js
- ┃ ┃ ┃ ┗ 📜types.js
- ┃ ┣ 📂custom-button
- ┃ ┃ ┣ 📜custom-buttom.styles.scss
- ┃ ┃ ┗ 📜custom-button.component.jsx
- ┃ ┣ 📂Dashboard
- ┃ ┃ ┣ 📂LeftMenu
- ┃ ┃ ┃ ┣ 📜LeftMenu.css
- ┃ ┃ ┃ ┗ 📜LeftMenu.js
- ┃ ┃ ┗ 📂RightMenu
- ┃ ┃ ┃ ┣ 📂Review & Submit
- ┃ ┃ ┃ ┃ ┣ 📜Summary.css
- ┃ ┃ ┃ ┃ ┗ 📜Summary.js
- ┃ ┃ ┃ ┣ 📂Survey-Details
- ┃ ┃ ┃ ┃ ┣ 📜SurveyDetails.css
- ┃ ┃ ┃ ┃ ┗ 📜SurveyDetails.js
- ┃ ┃ ┃ ┣ 📜Data.js
- ┃ ┃ ┃ ┣ 📜ExcelReader.js
- ┃ ┃ ┃ ┣ 📜MakeColumns.js
- ┃ ┃ ┃ ┣ 📜RightMenu.css
- ┃ ┃ ┃ ┣ 📜RightMenu.js
- ┃ ┃ ┃ ┣ 📜Table.js
- ┃ ┃ ┃ ┣ 📜TableIcons.js
- ┃ ┃ ┃ ┗ 📜types.js
- ┃ ┣ 📂FiltersBar
- ┃ ┃ ┣ 📜FiltersBar.css
- ┃ ┃ ┗ 📜FiltersBar.js
- ┃ ┣ 📂Footer
- ┃ ┃ ┣ 📜Footer.css
- ┃ ┃ ┗ 📜Footer.js
- ┃ ┣ 📂ForgotPassword
- ┃ ┃ ┣ 📜Forgotpassword.css
- ┃ ┃ ┣ 📜ForgotPassword.js
- ┃ ┃ ┗ 📜Timer.js
- ┃ ┣ 📂Google-SignIn
- ┃ ┃ ┗ 📜GoogleSignIn.js
- ┃ ┣ 📂HomePage-Components
- ┃ ┃ ┣ 📜Navigation.css
- ┃ ┃ ┣ 📜navigation.jsx
- ┃ ┃ ┗ 📜styles.css
- ┃ ┣ 📂Login
- ┃ ┃ ┣ 📜index.js
- ┃ ┃ ┣ 📜LoginPage.css
- ┃ ┃ ┗ 📜LoginPage.jsx
- ┃ ┣ 📂Navigation
- ┃ ┃ ┣ 📜Navigation.css
- ┃ ┃ ┗ 📜Navigation.js
- ┃ ┣ 📂PrivateRoute
- ┃ ┃ ┗ 📜PrivateRoute.js
- ┃ ┣ 📂ProfilePageComponents
- ┃ ┃ ┣ 📂Card
- ┃ ┃ ┃ ┣ 📜Card.css
- ┃ ┃ ┃ ┗ 📜Card.js
- ┃ ┃ ┣ 📂ContactInfo
- ┃ ┃ ┃ ┣ 📜Contact.css
- ┃ ┃ ┃ ┗ 📜Contact.js
- ┃ ┃ ┣ 📂Info
- ┃ ┃ ┃ ┣ 📜Info.css
- ┃ ┃ ┃ ┗ 📜Info.js
- ┃ ┃ ┣ 📂Navbar
- ┃ ┃ ┃ ┣ 📜Navbar.css
- ┃ ┃ ┃ ┗ 📜Navbar.js
- ┃ ┃ ┣ 📂Sidebar
- ┃ ┃ ┃ ┣ 📂SidebarCard
- ┃ ┃ ┃ ┃ ┣ 📜SidebarCard.css
- ┃ ┃ ┃ ┃ ┗ 📜SidebarCard.js
- ┃ ┃ ┃ ┣ 📂SideBarComponent
- ┃ ┃ ┃ ┃ ┣ 📜SidebarComponent.css
- ┃ ┃ ┃ ┃ ┗ 📜SidebarComponent.js
- ┃ ┃ ┃ ┣ 📜Sidebar.css
- ┃ ┃ ┃ ┗ 📜Sidebar.js
- ┃ ┃ ┣ 📂SurveyInfo
- ┃ ┃ ┃ ┗ 📜SurveyInfo.js
- ┃ ┃ ┣ 📂UserProfile
- ┃ ┃ ┃ ┣ 📜UserProfile.css
- ┃ ┃ ┃ ┗ 📜UserProfile.js
- ┃ ┃ ┗ 📂zoomPage
- ┃ ┃ ┃ ┣ 📜zoomPage.css
- ┃ ┃ ┃ ┗ 📜zoomPage.js
- ┃ ┣ 📂ProgressBar
- ┃ ┃ ┣ 📂ProgressBarItem
- ┃ ┃ ┃ ┗ 📜ProgressBarItem.js
- ┃ ┃ ┣ 📜ProgressBar.css
- ┃ ┃ ┗ 📜ProgressBar.js
- ┃ ┣ 📂Register
- ┃ ┃ ┣ 📜index.js
- ┃ ┃ ┗ 📜RegisterPage.jsx
- ┃ ┣ 📂Reset-Password
- ┃ ┃ ┣ 📂css
- ┃ ┃ ┃ ┣ 📂nivo-lightbox
- ┃ ┃ ┃ ┃ ┣ 📜close.png
- ┃ ┃ ┃ ┃ ┣ 📜close@2x.png
- ┃ ┃ ┃ ┃ ┣ 📜default.css
- ┃ ┃ ┃ ┃ ┣ 📜loading.gif
- ┃ ┃ ┃ ┃ ┣ 📜loading@2x.gif
- ┃ ┃ ┃ ┃ ┣ 📜next.png
- ┃ ┃ ┃ ┃ ┣ 📜next@2x.png
- ┃ ┃ ┃ ┃ ┣ 📜nivo-lightbox.css
- ┃ ┃ ┃ ┃ ┣ 📜prev.png
- ┃ ┃ ┃ ┃ ┗ 📜prev@2x.png
- ┃ ┃ ┃ ┣ 📜bootstrap.css
- ┃ ┃ ┃ ┣ 📜bootstrap.min.css
- ┃ ┃ ┃ ┗ 📜style.css
- ┃ ┃ ┣ 📂fonts
- ┃ ┃ ┃ ┣ 📂font-awesome
- ┃ ┃ ┃ ┃ ┣ 📂css
- ┃ ┃ ┃ ┃ ┃ ┣ 📜font-awesome.css
- ┃ ┃ ┃ ┃ ┃ ┗ 📜font-awesome.min.css
- ┃ ┃ ┃ ┃ ┣ 📂fonts
- ┃ ┃ ┃ ┃ ┃ ┣ 📜fontawesome-webfont.eot
- ┃ ┃ ┃ ┃ ┃ ┣ 📜fontawesome-webfont.svg
- ┃ ┃ ┃ ┃ ┃ ┣ 📜fontawesome-webfont.ttf
- ┃ ┃ ┃ ┃ ┃ ┣ 📜fontawesome-webfont.woff
- ┃ ┃ ┃ ┃ ┃ ┣ 📜fontawesome-webfont.woff2
- ┃ ┃ ┃ ┃ ┃ ┗ 📜FontAwesome.otf
- ┃ ┃ ┃ ┃ ┣ 📂less
- ┃ ┃ ┃ ┃ ┃ ┣ 📜animated.less
- ┃ ┃ ┃ ┃ ┃ ┣ 📜bordered-pulled.less
- ┃ ┃ ┃ ┃ ┃ ┣ 📜core.less
- ┃ ┃ ┃ ┃ ┃ ┣ 📜fixed-width.less
- ┃ ┃ ┃ ┃ ┃ ┣ 📜font-awesome.less
- ┃ ┃ ┃ ┃ ┃ ┣ 📜icons.less
- ┃ ┃ ┃ ┃ ┃ ┣ 📜larger.less
- ┃ ┃ ┃ ┃ ┃ ┣ 📜list.less
- ┃ ┃ ┃ ┃ ┃ ┣ 📜mixins.less
- ┃ ┃ ┃ ┃ ┃ ┣ 📜path.less
- ┃ ┃ ┃ ┃ ┃ ┣ 📜rotated-flipped.less
- ┃ ┃ ┃ ┃ ┃ ┣ 📜stacked.less
- ┃ ┃ ┃ ┃ ┃ ┗ 📜variables.less
- ┃ ┃ ┃ ┃ ┗ 📂scss
- ┃ ┃ ┃ ┃ ┃ ┣ 📜font-awesome.scss
- ┃ ┃ ┃ ┃ ┃ ┣ 📜_animated.scss
- ┃ ┃ ┃ ┃ ┃ ┣ 📜_bordered-pulled.scss
- ┃ ┃ ┃ ┃ ┃ ┣ 📜_core.scss
- ┃ ┃ ┃ ┃ ┃ ┣ 📜_fixed-width.scss
- ┃ ┃ ┃ ┃ ┃ ┣ 📜_icons.scss
- ┃ ┃ ┃ ┃ ┃ ┣ 📜_larger.scss
- ┃ ┃ ┃ ┃ ┃ ┣ 📜_list.scss
- ┃ ┃ ┃ ┃ ┃ ┣ 📜_mixins.scss
- ┃ ┃ ┃ ┃ ┃ ┣ 📜_path.scss
- ┃ ┃ ┃ ┃ ┃ ┣ 📜_rotated-flipped.scss
- ┃ ┃ ┃ ┃ ┃ ┣ 📜_stacked.scss
- ┃ ┃ ┃ ┃ ┃ ┗ 📜_variables.scss
- ┃ ┃ ┃ ┗ 📂fonts
- ┃ ┃ ┃ ┃ ┣ 📜glyphicons-halflings-regular.eot
- ┃ ┃ ┃ ┃ ┣ 📜glyphicons-halflings-regular.svg
- ┃ ┃ ┃ ┃ ┣ 📜glyphicons-halflings-regular.ttf
- ┃ ┃ ┃ ┃ ┣ 📜glyphicons-halflings-regular.woff
- ┃ ┃ ┃ ┃ ┗ 📜glyphicons-halflings-regular.woff2
- ┃ ┃ ┣ 📂img
- ┃ ┃ ┃ ┣ 📂portfolio
- ┃ ┃ ┃ ┃ ┣ 📜01-large.jpg
- ┃ ┃ ┃ ┃ ┣ 📜01-small.jpg
- ┃ ┃ ┃ ┃ ┣ 📜02-large.jpg
- ┃ ┃ ┃ ┃ ┣ 📜02-small.jpg
- ┃ ┃ ┃ ┃ ┣ 📜03-large.jpg
- ┃ ┃ ┃ ┃ ┣ 📜03-small.jpg
- ┃ ┃ ┃ ┃ ┣ 📜04-large.jpg
- ┃ ┃ ┃ ┃ ┣ 📜04-small.jpg
- ┃ ┃ ┃ ┃ ┣ 📜05-large.jpg
- ┃ ┃ ┃ ┃ ┣ 📜05-small.jpg
- ┃ ┃ ┃ ┃ ┣ 📜06-large.jpg
- ┃ ┃ ┃ ┃ ┣ 📜06-small.jpg
- ┃ ┃ ┃ ┃ ┣ 📜07-large.jpg
- ┃ ┃ ┃ ┃ ┣ 📜07-small.jpg
- ┃ ┃ ┃ ┃ ┣ 📜08-large.jpg
- ┃ ┃ ┃ ┃ ┣ 📜08-small.jpg
- ┃ ┃ ┃ ┃ ┣ 📜09-large.jpg
- ┃ ┃ ┃ ┃ ┗ 📜09-small.jpg
- ┃ ┃ ┃ ┣ 📂team
- ┃ ┃ ┃ ┃ ┣ 📜01.jpg
- ┃ ┃ ┃ ┃ ┣ 📜02.jpg
- ┃ ┃ ┃ ┃ ┣ 📜03.jpg
- ┃ ┃ ┃ ┃ ┗ 📜04.jpg
- ┃ ┃ ┃ ┣ 📂testimonials
- ┃ ┃ ┃ ┃ ┣ 📜01.jpg
- ┃ ┃ ┃ ┃ ┣ 📜02.jpg
- ┃ ┃ ┃ ┃ ┣ 📜03.jpg
- ┃ ┃ ┃ ┃ ┣ 📜04.jpg
- ┃ ┃ ┃ ┃ ┣ 📜05.jpg
- ┃ ┃ ┃ ┃ ┗ 📜06.jpg
- ┃ ┃ ┃ ┣ 📜about.jpg
- ┃ ┃ ┃ ┗ 📜intro-bg.jpg
- ┃ ┃ ┣ 📜ResetPassword.css
- ┃ ┃ ┗ 📜ResetPassword.js
- ┃ ┣ 📂UserProjectsDashboardComponents
- ┃ ┃ ┣ 📂UserProjectsDashboardHeader
- ┃ ┃ ┃ ┣ 📜UserProjectsDashboardHeader.css
- ┃ ┃ ┃ ┗ 📜UserProjectsDashboardHeader.js
- ┃ ┃ ┣ 📂UserProjectsDashboardLeftMenu
- ┃ ┃ ┃ ┣ 📜UserProjectsDashboardLeftMenu.js
- ┃ ┃ ┃ ┗ 📜UserProjectsDashboardLeftMenu.scss
- ┃ ┃ ┗ 📂UserProjectsDashboardRightMenu
- ┃ ┃ ┃ ┣ 📜data.js
- ┃ ┃ ┃ ┣ 📜TableIcons.js
- ┃ ┃ ┃ ┣ 📜UserProjectsDashboardRightMenu.css
- ┃ ┃ ┃ ┗ 📜UserProjectsDashboardRightMenu.js
- ┃ ┗ 📂with-spinner
- ┃ ┃ ┣ 📜with-spinner.component.jsx
- ┃ ┃ ┗ 📜with-spinner.styles.jsx
- ┣ 📂Constants
- ┃ ┣ 📜alert.constants.js
- ┃ ┣ 📜index.js
- ┃ ┗ 📜user.constants.js
- ┣ 📂data
- ┃ ┣ 📜data.json
- ┃ ┣ 📜Filters.js
- ┃ ┣ 📜HeaderData.js
- ┃ ┗ 📜uploader-leftmenu-data.js
- ┣ 📂pages
- ┃ ┣ 📂CodeIt
- ┃ ┃ ┣ 📜CodeIt.css
- ┃ ┃ ┗ 📜CodeIt.js
- ┃ ┣ 📂Profile
- ┃ ┃ ┣ 📜Profile.css
- ┃ ┃ ┗ 📜Profile.js
- ┃ ┣ 📂ProjectsDashboard
- ┃ ┃ ┣ 📜ProjectsDashboard.css
- ┃ ┃ ┗ 📜ProjectsDashboard.js
- ┃ ┣ 📂sign-in-and-sign-up
- ┃ ┃ ┣ 📜sign-in-and-sign-up.component.jsx
- ┃ ┃ ┗ 📜sign-in-and-sign-up.styles.scss
- ┃ ┣ 📂Uploader
- ┃ ┃ ┣ 📜UploaderPage.css
- ┃ ┃ ┗ 📜UploaderPage.js
- ┃ ┗ 📂UserProjectsDashboard
- ┃ ┃ ┣ 📜UserProjectsDashboard.css
- ┃ ┃ ┗ 📜UserProjectsDashboard.js
- ┣ 📂Reducers
- ┃ ┣ 📜alert.reducer.js
- ┃ ┣ 📜authentication.reducer.js
- ┃ ┣ 📜googleSignIn-Reducer.js
- ┃ ┣ 📜index.js
- ┃ ┣ 📜registration.reducer.js
- ┃ ┗ 📜users.reducer.js
- ┣ 📂Redux
- ┃ ┣ 📂ApiCalls
- ┃ ┃ ┣ 📜ApiCalls.actions.js
- ┃ ┃ ┣ 📜ApiCalls.reducer.js
- ┃ ┃ ┣ 📜ApiCalls.sagas.js
- ┃ ┃ ┣ 📜ApiCalls.selectors.js
- ┃ ┃ ┗ 📜ApiCalls.types.js
- ┃ ┣ 📂CodeitData
- ┃ ┃ ┣ 📜codeit-data.actions.js
- ┃ ┃ ┣ 📜codeit-data.reducer.js
- ┃ ┃ ┣ 📜codeit-data.selectors.js
- ┃ ┃ ┗ 📜codeit-data.types.js
- ┃ ┣ 📂ContainsKeyword
- ┃ ┃ ┣ 📜ContainsKeyword.actions.js
- ┃ ┃ ┣ 📜ContainsKeyword.reducer.js
- ┃ ┃ ┣ 📜ContainsKeyword.selectors.js
- ┃ ┃ ┗ 📜ContainsKeyword.types.js
- ┃ ┣ 📂ExcelData
- ┃ ┃ ┣ 📜excel-data.actions.js
- ┃ ┃ ┣ 📜excel-data.reducer.js
- ┃ ┃ ┣ 📜excel-data.selectors.js
- ┃ ┃ ┗ 📜excel-data.types.js
- ┃ ┣ 📂Filters
- ┃ ┃ ┣ 📜Filters.actions.js
- ┃ ┃ ┣ 📜Filters.reducer.js
- ┃ ┃ ┣ 📜Filters.selectors.js
- ┃ ┃ ┗ 📜Filters.types.js
- ┃ ┣ 📂Loading
- ┃ ┃ ┣ 📜Loading.actions.js
- ┃ ┃ ┣ 📜Loading.reducer.js
- ┃ ┃ ┣ 📜Loading.selectors.js
- ┃ ┃ ┗ 📜Loading.types.js
- ┃ ┣ 📂Progress-number
- ┃ ┃ ┣ 📜progress.actions.js
- ┃ ┃ ┣ 📜progress.reducer.js
- ┃ ┃ ┣ 📜progress.selectors.js
- ┃ ┃ ┗ 📜progress.types.js
- ┃ ┣ 📂SelectedRowandColumn
- ┃ ┃ ┣ 📜tableSelections.actions.js
- ┃ ┃ ┣ 📜tableSelections.reducer.js
- ┃ ┃ ┣ 📜tableSelections.selectors.js
- ┃ ┃ ┗ 📜tableSelections.types.js
- ┃ ┣ 📂Show_Coded_As
- ┃ ┃ ┣ 📜Show_Coded_As.actions.js
- ┃ ┃ ┣ 📜Show_Coded_As.reducer.js
- ┃ ┃ ┣ 📜Show_Coded_As.selectors.js
- ┃ ┃ ┗ 📜Show_Coded_As.types.js
- ┃ ┣ 📂SurveyDetails
- ┃ ┃ ┣ 📜survey-details.actions.js
- ┃ ┃ ┣ 📜survey-details.reducer.js
- ┃ ┃ ┣ 📜survey-details.selectors.js
- ┃ ┃ ┗ 📜survey-details.types.js
- ┃ ┗ 📂UploaderAlerts
- ┃ ┃ ┣ 📜UploaderAlerts.actions.js
- ┃ ┃ ┣ 📜UploaderAlerts.reducer.js
- ┃ ┃ ┣ 📜UploaderAlerts.selectors.js
- ┃ ┃ ┗ 📜UploaderAlerts.types.js
- ┣ 📂services
- ┃ ┣ 📜index.js
- ┃ ┗ 📜user.service.js
- ┣ 📂_actions
- ┃ ┣ 📜alert.actions.js
- ┃ ┣ 📜index.js
- ┃ ┗ 📜user.actions.js
- ┣ 📂_helpers
- ┃ ┣ 📜auth-header.js
- ┃ ┣ 📜history.js
- ┃ ┣ 📜index.js
- ┃ ┗ 📜store.js
- ┣ 📂_utilities
- ┃ ┗ 📜utilities.js
- ┣ 📜config.js
- ┣ 📜index.css
- ┣ 📜index.js
- ┗ 📜responseMessage.js
