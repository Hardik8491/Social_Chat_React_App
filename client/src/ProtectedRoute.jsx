21
Jump to Comments
253
Save

Cover image for Reactjs Protected Route
Collins Mbathi
Collins Mbathi
Posted on 18 Nov 2022

 109  
Reactjs Protected Route
#
javascript
#
react
#
tutorial
#
webdev
Introduction
React Router provides a convenient way to define protected routes that require authentication in order to access. By default, these routes are treated as public routes and anyone can access them.

To create a protected route, you need to use the React Router Route component and specify the path that you want to protect. Then, you can use the render prop function to conditionally render the component that you want to protect.

If the user is not authenticated, they will be redirected to the login page. Otherwise, they will be able to access the protected route.

In the following section, we will look at some of the prerequisites for this tutorial.

Prerequisites
The following are required to complete this tutorial:

Knowledge of JavaScript and React.

Knowledge about Redux toolkit

Nodejs should be installed on your system.

npm should be installed on your system.

In the following section, we will delve into the details of this protected Route.

About Protected Route
In web applications, routing is the process of determining how to respond to a client request for a specific URL. In React, this is typically accomplished using the React Router library.

React Router provides a number of different ways to configure how your application renders the different URLs that it supports. One of the options that you can specify is whether or not a given route should be protected.

A protected route is one that can only be accessed by an authenticated user. If a user tries to access a protected route and they are not logged in, they should be redirected to the login page.

In our next section we will be talking about Redux which we will be using in our tutorial

Understanding Redux toolkit
Redux is a toolkit for managing state in JavaScript applications. It is used in conjunction with React and other frameworks.

Redux provides a streamlined way to manage state changes in your application. It includes a set of tools for managing actions, reducers, and middleware. It also provides a way to connect your application to a store.

Redux is a great toolkit for managing state in JavaScript applications.

We are going to use it to store our user details .

In our next section, we are now going to get to the code

Building A simple Web Page with Reactjs demonstrating Protected Route
In this part of this tutorial, we will use Reactjs, Redux toolkit and react-router-dom to build a simple web page demonstrating protected Route. The project directory structure for our microservice app is shown below
|   .gitignore
|   package-lock.json
|   package.json
|   README.md
|   
+---public
|       favicon.ico
|       index.html
|       logo192.png
|       logo512.png
|       manifest.json
|       robots.txt
|       
\---src
    |   App.js
    |   index.js
    |   
    +---Home
    |       Home.jsx
    |       
    +---Login
    |       Login.jsx
    |       
    +---Redux
    |   |   store.js
    |   |   
    |   \---Slice
    |           Slice.js
    |           
    \---utils
            ProtectedRoute.js

First we need to create our React application boilerplate

Go to your terminal and run the following command below :

npx create-react-app protected-route

After it has been created, open the folder in a code editor, such as Visual Studio Code.
Remove any unnecessary files from the folder that will not be used in this tutorial.

Installing Dependencies
To install the dependencies needed for this tutorial, open your code editor's terminal and type the following command.

npm i react-router-dom react-redux redux

Creating a Home Page
Create a directory, call it Home, then inside it have a file Home.jsx with the following code.
import React from 'react'

const Home = () => {
  return (
    <div>Home</div>
  )
}

export default Home

Creating a Login Page
Create a directory, call it Home, then inside it have a file Login.jsx with the following code.
import React from 'react'

const Login = () => {
  return (
    <div>Login</div>
  )
}

export default Login

Setting up the routes
Navigate to your app.js file in your src directory and write the code below.
import Home from "./Home/Home";
import Login from "./Login/Login";
import {BrowserRouter,Route,Routes} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
lets look at some facinating code we have just written.

first we have imported react-router-dom package
import {BrowserRouter,Route,Routes} from "react-router-dom";
We have created Routes for our components so that we can navigate through them in our page, specifically the Home and Login components.

In the following section, we will set up our redux.

Creating our Redux
Create a new folder for redux and name it Redux. Within the Redux folder, create a new folder and name it Slice. Make a file called userSlice.js in the slice folder.
Inside the slice.js file write this code below :
import  {createSlice} from '@reduxjs/toolkit';

const initialState = {

    state: {
        isFetching: false,
    },
    user:{
  name:"collins",
  isAuthenticated:true
},
}


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsFetching : (state) => {
        state.state.isFetching = true;
  }, 
  }  
});

export const {
      setIsFetching,
    } = userSlice.actions;


export default userSlice.reducer;
In our code, we created a redux slice that only stores two properties in our user object.

These are the specifics we'll use to design our secure route. They are the qualifications.

Creating the redux store
Create a store.js file in the Redux folder and enter the code below.
import {configureStore} from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";

 import userReducer from "./Slice/Slice";

  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };

  const rootReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: { user: rootReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export let persistor = persistStore(store);
export default store;
As can be seen in the code above, this store.js file is where we pass our reducers and add logic about whether we want the data we're managing to persist or not.

Passing the Store Prop
Navigate to your src folder's index.js file and wrap the content within with the store module so that it is effective in all of our components ,We will accomplish this with the help of the Provider component imported from the react-redux package.
Insert it as shown in the code below.
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './Redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <App />
</Provider>
);

Creating the Protected Route File
Navigate to your src folder and make a folder called utils. Inside the utils folder, make a file called ProtectedRoute.js

Write the following code in the ProtectedRoute.js file.
import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const user = useSelector((state) => state.user);
    let location = useLocation();

    if(!user.state.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;
As seen in the code above, we first import our useSelector from our react-redux package, which will allow us to access our user object that is stored on our redux.

After that, as you can see, we write some logic to check if isAuthenticated is true, and if it is, we should return the user to the Home screen if its not then the user should be Navigated to the login.
In the following section, we will wrap our protected Route module.

Wrapping the Protected Route Module
Return to your app.js folder and update your code to the following.
import Home from "./Home/Home";
import Login from "./Login/Login";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={
        <ProtectedRoute>
        <Home/>
        </ProtectedRoute>
     }/>
        <Route path="/login" element={<Login/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
As seen in the code below, we've wrapped the module around the route we want to secure. In our case, the Home page must be authenticated in order to be accessed; otherwise, the user will be directed to the login page in order to be authenticated and able to access the Home page.

Congratulations, you now have a web page with a protected Route.

The complete source code is available here for your reference.

Congratulations, you have completed the tutorial. How did you find it? I'm sure it's fantastic.

Conclusion
In conclusion, the Reactjs Protected Route is a great way to keep your users' data safe and secure. By using this type of route, you can ensure that only authorized users can access certain areas of your website. This is a great way to keep your site's data safe and secure and to keep your users' information confidential.
Thank you for taking the time to read this, and I hope to see you in the next one. Have a good time exploring ✨✨✨.

Top comments (21)

Subscribe
pic
Add to the discussion
 
 
mounisbhat profile image
Mounis Bhat
•
19 Nov 22

I feel adding global state management for authentication is an overkill, it will be better/simpler to use context, even local storage will do the job for you if you’re using jwt auth.


9
 likes
Like
Reply
 
 
collins87mbathi profile image
Collins Mbathi 
•
19 Nov 22

Its an option but ,remember leta say in a scenario you are building a complex web application.you will need a state management


1
 like
Like
Reply
 
 
arjun259194 profile image
Arjun259194
•
30 Jan

but Localstorage a risk for XSS and it's not a good practice


2
 likes
Like
Reply
 
 
snehasishkonger profile image
Snehasish Konger
•
21 Nov 22 • Edited on 21 Nov

I was recently stuck in the same problem, protecting the routes. I was using Auth0 in my project. And I was facing the problem in this section-
<ProtectedRoute>
 <Home/>
</ProtectedRoute>
The error was coming from react-router-dom, cause the version 6 doesn't support this format.
So, if anyone is using Reactjs +Auth0 only then try to do like this instead:
<Route element={<ProtectedRoute/>}>
    <Route path="/" element={<Home />} />
</Route>
Although your article is great, I'm saving it for future.


5
 likes
Like
Reply
 
 
collins87mbathi profile image
Collins Mbathi 
•
21 Nov 22

Nice really appreciate .this is helpful i have also learnt.thanks manh


2
 likes
Like
Reply
 
 
madza profile image
Madza
•
25 Nov 22

Awesome share, thanks a lot 👍💯✨


2
 likes
Like
Reply
 
 
everbliss7 profile image
Blessing Tayedzerwa
•
18 Nov 22

Can you do one without Redux?


3
 likes
Like
Reply
 
 
collins87mbathi profile image
Collins Mbathi 
•
19 Nov 22

yes, sure its possibe very possible
i used redux assuming maybe you will be building maybe a large application.
but you can use without redux and instead use useContext and useReducer


3
 likes
Like
Reply
 
 
hassanzohdy profile image
Hasan Zohdy
•
20 Nov 22

What about building an app with a very simpler way instead of using Redux, works with small to very large scaled projects

yarn add @mongez/router

This will add Mongez Router in your project.

Now in your main/index file clean it up and add the following code
// src/index.ts
import router from "@mongez/react-router";
import HomePage from "./Home";
import LoginPage from "./Login";
import Guarded from './middleware/Guarded';

router.add("/", HomePage, [Guarded]);
router.add("/login", LoginPage);

// Start scanning for all of registered routes
router.scan(); 
Now implement the Guarded middleware
// src/middleware/Guarded.ts
import { navigateTo } from '@mongez/react-router';
import user from 'some-where';

export default function Guarded() {
    if (!user.isLoggedIn()) {
        navigateTo('/login');

        return true; // to stop the execution of the route
    }

    return null;
}
And that's it.

Thanks for the article though, it would be helpful for those who are not familiar with Redux.


2
 likes
Like
Reply
 
 
collins87mbathi profile image
Collins Mbathi 
•
20 Nov 22

I will make one .with usecontext


1
 like
Like
Reply
 
 
imsuvesh profile image
Suvesh K
•
20 Nov 22

State is lost when we refresh app, user needs to login again. LS and SS are better options.


1
 like
Like
Reply
 
 
collins87mbathi profile image
Collins Mbathi 
•
20 Nov 22

Nope. Redux has persist feature


1
 like
Like
Reply
 
 
athulchandroth profile image
athulchandroth
•
19 Feb

state will be lost when you do a browser page refresh


1
 like
Like
Thread
 
mozi47 profile image
Muzakir Shah
•
2 May

use redux-persist, then it wont be lost.


2
 likes
Like
Reply
 
 
athulchandroth profile image
athulchandroth
•
19 Feb

As you said redux state is not persistent between refreshes, u need LS or SS to store something to make a route protected.


1
 like
Like
Reply
 
 
mozi47 profile image
Muzakir Shah
•
2 May • Edited on 2 May

Now it is. Use redux-persist.


2
 likes
Like
Reply
 
 
scriptneutron profile image
script-neutron
•
27 Jan

Naa , it’s persist .. local storage


1
 like
Like
Reply
 
 
sudarshansb143 profile image
sudarshan
•
23 Nov 22 • Edited on 24 Nov

Can you explain from where you have imported ?
<Navigate />


1
 like
Like
Reply
 
 
collins87mbathi profile image
Collins Mbathi 
•
23 Nov 22

Imported wat ?


1
 like
Like
Reply
 
 
sudarshansb143 profile image
sudarshan
•
24 Nov 22

updated original comment ?


1
 like
Like
Reply
 
 
ilaroy611 profile image
ILA Saxena
•
9 May

Thank you! i was looking for the same thing and found it here, your article helped me a lot!


Like
Reply
View full discussion (21 comments)
Code of Conduct • Report abuse
DEV Community

Let's see what you can do with JavaScript and a bit of creativity

JS post
Fun with console.log() 💿
Read next
pguilbert profile image
A reason to choose React Native over Flutter for your next web application
Paul Guilbert - May 18

bmsteven profile image
Create and deploy react components with bit.dev
Benedict Steven - May 8

mikeyoung44 profile image
Filling in the Blanks with Stable Diffusion Inpainting
Mike Young - Apr 29

shreyvijayvargiya profile image
React Native + Redux Tool kit + AsyncStorage
shrey vijayvargiya - May 17


Collins Mbathi
Follow
LOCATION
Nairobi,Kenya
EDUCATION
Mathematics and computer science
WORK
software Engineer
JOINED
7 Jun 2021
More from Collins Mbathi
Getting Started With Nodejs and Docker
#javascript #tutorial #node #docker
Using Javascript to Implement Stacks
#javascript #beginners #programming #discuss
Blog API with Nodejs,Expressjs and Mongodb
#javascript #beginners #node #webdev
DEV Community

Deep Neural Network from Scratch in Rust : Part 1- Basics of Neural Network cover image

Deep Neural Network from Scratch in Rust : Part 1- Basics of Neural Network
In this series of about 5 parts, I'll take you through the basics of neural networks and show you how to implement them using Rust programming language.

Read full post

import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children,user}) => {
   

    if(!user) {
        return <Login/>; 
    }

    return children

};

export default ProtectedRoute;