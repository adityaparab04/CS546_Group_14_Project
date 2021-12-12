# Otaku Hub - Anime Review Forum
This is a CS 546 final project of Group 14:

Group Members:
Aditya Parab
Aditya Kotian
Vaibhav Vashisht
Seema Muchandi

##GitHub Link : https://github.com/adityaparab04/CS546_Group_14_Project.git

## API Website for project : https://kitsu.docs.apiary.io/#introduction/json:api

### A. Mandatory Steps:

1. #### PLEASE MAKE SURE YOU HAVE A PROPER INTERNET CONNECTION BEFORE STARTING THE APPLICATION AS THE API REQUIRES IT TO POPULATE THE DATA TO THE WEBSITE!

2. Pull the code from the main branch from the repository.

3. npm install 

4. Seed the database using the command: cd tasks -> node seed.js or use npm run seed

5. run npm start to start the server.

6. Click on http://localhost:3000 or copy this Local URL in your browser. You will be redirected to the Home Page of our project: Otaku Hub.

Once you populate the db these are the login credentials
### B. Login Credentials

#### admin
 username: admin
 password: 123456

#### users
username: aditya_parab
password: 123456

username: adityaKotian
password: 123456

username: vaibhav
password: 123456

username: seema
password: 123456

### C. These anime are populated with reviews and comments data
  Top trending pages anime
  anime name: One Piece
  anime id: 12
  
  anime name: Kimetsu no yaiba
  anime id: 41370
  
  anime name: Naruto Shippuden
  anime id: 1555
  
  anime name: Jujutsu Kaisen
  anime id: 42765
  
  after searching
  anime name: Naruto
  animde id: 11

### D. Otaku Hub: Home Page (http://localhost:3000/) (Landing Page)

1. On the navigation bar, you will get few links like Otaku Hub Logo, Login, Sign Up and Search Bar.

2. On clicking on the name Otaku Hub, you will get redirected to the Home Page.

3. This page explains the purpose of the website and recommends different categories of anime to the users using this website

4. The recommendations are as follows
    a. Top Trending anime
    b. Top Rated anime
    c. On going anime series
    d. Recommendation by Categories e.g. Comedy, action, thriller, horror...
    e. Age Rating e.g. R rated PG and G
    f. Demographic recommendation e.g. Shounen Seinen
 
5. On clicking on Sign up, you will get redirected to the Sign Up page of the user with the URL: (http://localhost:3000/users/signup) 
5.1 On new Sign Up for the user, you will get redirected to the Login Page where you will need to login again. 

6. On clicking on Login, you will get redirected to the login page with URL: (http://localhost:3000/users/login). Ajax form is used on login.
6.1 On clicking on Login, you will get redirected to the login page where you can use existing login details or can create new user login. On successful login, you will get redirected to the Home Page where you will get logout, user profile and cart links in the navigation bar.

7. When you search something it takes you too search route http://localhost:3000/search

8. When you click on anime  it takes you too anime route http://localhost:3000/anime/{id} where you can see the synopsis of the anime and if you're logged you get options of writing a review, go to individual episode discussion page route http://localhost:3000/anime/discussion/{anime_id}/{episode_no}, rate the anime and add anime to the favourites. You can also write comments on reviews.

9. admin page has the route http://localhost:3000/admin
9.1 admin can see the reviews and comments as well delete them, admin can also delete the users

10. every user has a profile which has routes http://localhost:3000/users/profile

11. user can update their profile which takes to the route http://localhost:3000/users/update_profile

12. User can also login in through social accounts like google and microsoft account by clicking on social account in nav bar.
