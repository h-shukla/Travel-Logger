# Travel logger

- Make list of your visited places and add it's comments
- Look at what others have posted about that place as well
- Have ability to either publish your travel log to everyone or keep it just for yourself as well
- Dark mode & Light mode switch (Default on Light mode)

# TODO

## Backend

- [x] Make logs model
- [x] Make users model
- [x] Link users model with logs model
- [x] Make error handling middlewares
- [x] Make logs api
- [x] Make users api
- [x] Create roles and seperate admin routes
- [x] Add encryption to user passwords
- [x] Learn how to send cookies to frontend and store them
- [x] Send cookies to frontend while register and login(mongodb id is used as a cookie for storing user login details)
- [x] Add role based authentitcation
- [x] Complete admin route to access all users
- [x] Finish all user routes
- [x] Finish all logs routes
- [x] Refactor code
- [ ] Add community feature
  - [x] Community model
  - [x] Add communities array to user model
  - [x] Users will be able to add comments within a community
  - [x] Setup community routes and controllers
  - [x] Add CRUD functionality to the controllers
  - [x] Add authorization to the CRUD controllers so unauthorized users can't access it
  - [ ] Add CRUD to comments within a community
  - [ ] Add user route to push add community to model array when user joins
- [ ] Add admin feature
  - [ ] Ability to ban users
  - [ ] Ability to ban communities
  - [ ] Ability to access every community
- [ ] Remove redundant try catch statements and add the error handling middleware to controllers

## Frontend

Api is not accessible so have to scrape from google maps. Instead of having whole window as map, Will have to put todo list like structure with place's google map clickable link. Just have to provide the right co-ordinates for it.

- [x] Design Navbar to the side
- [x] React router setup
- [x] Make navbar functional
- [x] Design the landing page
- [x] Design the signup component
- [x] Design the login component
- [x] Make the basic about and contact pages
- [x] Design the Home component with mock data for now
- [x] Change the navbar and theme of the app
- [x] Add image url to the logs so images can be displayed
- [x] Design the Communities component
- [x] Add background image like reddit has
- [x] Find and add a minimalist background image that can enhance the looks of the entire app
- [ ] Design the profile page
- [ ] Fix the community page's styling so image doesn't span out
- [ ] Implement the signup feature
- [ ] Implement the login feature
- [ ] Check for cookies being stored on the frontend
- [ ] Implement the communities feature
  - [ ] call create and join comm simultaneously while creating new comm
- [ ] Implement the Home feature by getting data from backend
- [ ] Make login and signup button dissappear after user has logged in or signed up
- [ ] Make the profile button dissappear if the user is not logged in
- [ ] Add profile icon in the navbar to sign out
- [ ] Dark mode / Light mode switch
- [ ] Add media queries to make mobile friendly
- [ ] Add react-transistion group for smooth transistions
