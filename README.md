# Travel logger

-   Make list of your visited places and add it's comments
-   Look at what others have posted about that place as well
-   Have ability to either publish your travel log to everyone or keep it just for yourself as well
-   Dark mode & Light mode switch (Default on Light mode)

# TODO

## Backend

-   [x] Make logs model
-   [x] Make users model
-   [x] Link users model with logs model
-   [x] Make error handling middlewares
-   [x] Make logs api
-   [x] Make users api
-   [x] Create roles and seperate admin routes
-   [x] Add encryption to user passwords
-   [x] Learn how to send cookies to frontend and store them
-   [x] Send cookies to frontend while register and login(mongodb id is used as a cookie for storing user login details)
-   [x] Add role based authentitcation
-   [x] Complete admin route to access all users
-   [x] Finish all user routes
-   [x] Finish all logs routes
-   [x] Refactor code
-   [x] Add community feature
    -   [x] Community model
    -   [x] Add communities array to user model
    -   [x] Users will be able to add comments within a community
    -   [x] Setup community routes and controllers
    -   [x] Add CRUD functionality to the controllers
    -   [x] Add authorization to the CRUD controllers so unauthorized users can't access it
    -   [x] Add CRUD to comments within a community
    -   [x] Add user route to push add community to model array when user joins
-   [x] Add admin feature
    -   [x] Ability to delete users
    -   [x] Ability to delete communities
    -   [x] Ability to access every community
-   [x] Remove setting cookies to responses as it doesn't works
-   [ ] OPTIONAL
    -   [ ] Remove redundant try catch statements and add the error handling middleware to controllers

## Frontend

Maps api is not available for free. Instead trying to do an ad-hoc solution for map usage this will make a generated link for accessing maps using the latitude and longitude but will open the map in another tab

-   [x] Design Navbar to the side
-   [x] React router setup
-   [x] Make navbar functional
-   [x] Design the landing page
-   [x] Design the signup component
-   [x] Design the login component
-   [x] Make the basic about and contact pages
-   [x] Design the Home component with mock data for now
-   [x] Change the navbar and theme of the app
-   [x] Add image url to the logs so images can be displayed
-   [x] Design the Communities component
-   [x] Add background image like reddit has
-   [x] Find and add a minimalist background image that can enhance the looks of the entire app
-   [x] Fix the community page's styling so image doesn't span out
-   [x] Check for cookies being stored on the frontend
-   [x] Design the profile page
-   [x] Implement the login feature
-   [x] Implement the signup feature
-   [x] Set cookies getting from response
-   [x] Set user details on localstorage to access them later on
-   [x] Make login and signup button dissappear after user has logged in or signed up
-   [x] Make the profile button dissappear if the user is not logged in
-   [x] Implement the Home feature by getting data from backend
-   [ ] Implement the communities feature
    -   [ ] call create and join community simultaneously while creating new community
-   [ ] Design and Implement admin dashboard
-   [ ] Dark mode / Light mode switch
-   [ ] Add media queries to make mobile friendly
-   [ ] OPTIONAL
    -   [ ]Add react-transistion group for smooth transistions
