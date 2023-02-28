# Travel logger
- Make list of your visited places and add it's comments
- Look at what others have posted about that place as well
- Have ability to either publish your travel log to everyone or keep it just for
  yourself as well
- Dark mode & Light mode switch (very important)

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
- [x] Send cookies to frontend while register and login
      (mongodb id is used as a cookie for storing user login details)
- [x] Add role based authentitcation
- [x] Complete admin route to access all users
- [x] Finish all user routes
- [x] Finish all logs routes
- [x] Refactor code
- [ ] Add community feature
  - [ ] Community model
  - [ ] Add users to community array so we know which communities they have joined
  - [ ] Allow forum like discussions to occur within those communities.
        (LIKE Y.T. Comment section)

## Frontend
Api is not accessible so have to scrape from google maps. Instead of having
whole window as map, Will have to put todo list like structure with place's
google map clickable link. Just have to provide the right co-ordinates for it.
- [x] Design Navbar to the side
- [x] React router setup
- [x] Make navbar functional
- [x] Design the landing page
- [ ] Design the signup component
- [ ] Design the login component
- [ ] Design the Home component
- [ ] Design the Communities component
- [ ] Make the basic about and contact pages
- [ ] Implement the signup feature
- [ ] Implement the login feature
- [ ] Make login and signup button dissappear after user has logged in or signed up
- [ ] Make the profile button dissappear if the user is not logged in
- [ ] Check for cookies being stored on the frontend
- [ ] Add sure to have a profile icon in the navbar so you can quickly sign out if needed