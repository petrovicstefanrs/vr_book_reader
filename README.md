<p align="center"><img src="/src/assets/Home/logo.png" width=400 style="text-align: center"/> </p>

------

<p align="center">
  Made with: 
  <img src="https://aframe.io/images/blog/registry.svg" height=20 /> 
  <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" height=22 /> 
  <img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" height=20/>
</p>

------

<p align="center">Check the video:</br><a href="https://www.youtube.com/watch?v=rE4x1XCQsVo" target="_blank"><img src="https://img.youtube.com/vi/rE4x1XCQsVo/0.jpg"/></a></p>

------

# VR Book Reader

<sup>**alpha v0.1.0**</sup>

You can checkout the ***live version*** of this project [here](http://www.vrbookreader.io).

<sub>***Note:*** The app is hosted on **heroku**, if it can't load the first time, the dyno is probably down and you will have to reload the page.</sub>

------

###### Description

This repo is **Frontend** for the **VR Book Reader** application. 
It was made as a *graduation project*, that focused on building a consumer oriented platform using **WebVR**.

**Frontend** is built on top of **React** and **A-Frame** (specifically [A-Frame React](https://github.com/ngokevin/aframe-react)).

**Backend** is built on top of **Node** and **Express** with **Sequelize ORM** and **Passport**.

**STACK:**

- React
- Redux
- Material UI React
- React Router v4
- React A-Frame
- Node
- Express
- Sequelize
- Passport

------

###### Inspiration

This app was intended as a **web based application for reading books and comics in VR**. Inspired by [**MadeFire Comics**](https://www.madefire.com/), which is a mobile app for reading and distributing digital and motion comics with support for VR. 

As MadeFire is not available on the web, and the VR Feature is limited to only viewing the comics in VR space with a black background (Not sure if they updated it yet), I wanted ***to put my spin on it***, and let the user walk around in **large 3d environments** carying his comics or books around with him. Also I wanted to build a **platform** around it to allow the user to build his own **library of books and environments** which would compliment specific books or comics.

***Imagine reading a Batman comic on the roof of a Gotham City Police building standing next to the Bat Signal, while old Bats is fighting crime in the distance.***

------

###### Implementation

The initial idea was to create three separate projects: 

- **React:** for the platform that users would use as their books and environments libraries, with all the standard platform features (Profile editing, themes, organizing, etc...)
- **A-Frame:** for the VR part of the application used to render VR environments and books, with spacial audio and VR Headset support.
- **Node:** for the standard Restfull API that would serve the books, environments and all the user related data, and controll authentication.

However, due to this being a *graduation project*, and me **not having that much time** to complete it, I've decided to create a **single project** for **Frontend** where **React** and **A-Frame** parts would be **merged into a single codebase** (*Enter problems!*), and leave the API as a separate project. Because of that, the fastest way was to use the **A-Frame wrapper** for React. This proved to be **troublesome for performance** and the overall experience, but more on that in the [Issues](#Issues) section.

For state managment I've used a somewhat **custom Redux structure**, with **Redux-Thunk**, and for routing **React Router v4** with again a somewhat custom implementation.

To skip some troubles with styling and *speedup development*, I've decided to use **React Material UI**, which I used in the end to implement color themes into the platform.

------

###### Issues

**Frontend:** The **biggest problem** stems from the fact that **React was not intended to handle VR**. Being a library intended for *60fps 2d Web*, problems occur when you try to implement *90fps VR* into it. Since creating this app, I've done some experiments and **was able to optimise the code** so it runs better (still not perfect), by **removing the React A-Frame** completely and relying on **vanilla A-Frame**. This enabled me to speed up some environments from **~20fps** to **~50fps**, however I've never got around to actually completing that refactoring, so the current version it the one with React A-Frame.

**Backend:** Here, the nature of problems was a bit different, I had to choose which type (extension) of books will I support initialy and work from there. I decided to use oldschool **.cbz** and **.cbr** *comicbook formats* as they are *esentially .zip and .rar respectively,* and it would be the **fastest way** to build a **working prototype**. While **this works**, it consumes **a lot of memory**, *as all these formats are is a huge number of compressed JPEG images*, I needed separate tables to hold the extracted images with references to their book reccords, where if I went with **pdf** or **epub**, this could have been avoided.

------

###### Future Plans

- [ ] Refactor A-Frame part of the Frontend
- [ ] Optimize A-Frame to enable stable FPS on VR Headsets
- [ ] Implement VR Headset controller support
- [ ] Support additional ebook formats (pdf, epub, ...)

------

###### Codebase

Bellow is the table which lists all the repos this app is made of.

|             Project              |                         Description                          |                             Url                              |
| :------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|             Frontend             |    Frontend part of the app built with A-Frame and React     | [Open](https://github.com/petrovicstefanrs/vr_library_interface) |
|             Backend              |        API part of the app built with Node (Express)         |  [Open](https://github.com/petrovicstefanrs/vr_library_api)  |
|       A-Frame Environments       | Enviroment assets preparation for the app. Used in development of new environments | [Open](https://github.com/petrovicstefanrs/vr_library_enviroments) |
| A-Frame Bring To Front Component | Component I wrote in A-Frame to enable an object to be put in front of the player camera by pressing a specified trigger. | [Open](https://github.com/petrovicstefanrs/aframe-bring-to-front) |

------

