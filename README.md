# Manage Technics

<h3><a href="https://manage-tech-frontend.vercel.app/">Live Demo</a></h3>

### Test account

```
ivanov@mail.ru
12345678
```

This is the solution of the case of the hackathon Casein 2022

The application allows you to manage construction equipment.

![background-system](https://user-images.githubusercontent.com/78900834/180208701-8b918016-af8f-40ab-921a-7c82fd865d16.png)

***
# About the app
By creating a personal account or logging in, the client part of the solution provides an opportunity to monitor the available units of equipment during construction. The user can add equipment, which will be able to monitor and control. Save the current state of the equipment for later viewing in the archive.
## Front-end 
The user must `log in` to the application or `register`. 

<img width="274" alt="image" src="https://user-images.githubusercontent.com/78900834/180209313-7f1e8b99-e7c0-4b71-be3d-734dd97b0e5c.png">

When registering, you must enter your `first name`, `last name`, `post`, `email` and `password`. 
After successful registration, you must enter your email and password for authorization.

<img width="268" alt="image" src="https://user-images.githubusercontent.com/78900834/180209334-c54cb7bf-155a-429d-886c-f6115b6e9514.png">

After authorization, you will be transferred to your `personal account`. Information related to the user is displayed in the personal account.

<img width="240" alt="image" src="https://user-images.githubusercontent.com/78900834/180209524-5519ce8e-48d6-421d-af4f-f638843e8dda.png">

On the page for viewing the `units of equipment` that the user controls, basic information about them is displayed.

<img width="241" alt="image" src="https://user-images.githubusercontent.com/78900834/180209606-5911756b-b19f-4fdd-b163-a10ce21589f6.png">

There is a possibility of `adding equipment`. To do this, select its `type` and enter the `number`.

<img width="242" alt="image" src="https://user-images.githubusercontent.com/78900834/180209779-10b6d731-5144-45dd-9223-d3442de532da.png">

By selecting a specific `unit of equipment`, you can find out more information about its `condition`, as well as `manage it`.

<img width="237" alt="image" src="https://user-images.githubusercontent.com/78900834/180209933-76e332bb-1c0e-45ac-b07d-658e82c7d673.png">

The `current situation` page displays information about `all the equipment`, as well as `recommendations for its management`. 
By choosing one or another section, you can view the machines filtered by operating mode.

<img width="244" alt="image" src="https://user-images.githubusercontent.com/78900834/180210520-4b7faf30-f640-47ec-b59c-9d977aafbc14.png">

It is also possible to `save the current moment` of the distribution of equipment. And viewing it in the `report archive`.

<img width="236" alt="image" src="https://user-images.githubusercontent.com/78900834/180210880-2d648e22-dbfa-47f6-82e3-c853b64469f2.png">

## Backend
When contacting via requests, information about the status of work and coordinates of the unit of equipment is received in real time.

<img width="600" alt="image" src="https://user-images.githubusercontent.com/78900834/180219253-cd22724e-8e53-444c-8377-ebef0b23543c.png">

# Technologies in the project
Frontend-part of the application is written using the Angular framework.

Backend-part of the application, which simulates data from construction machinery, is written using the Express framework.

# How to start
After downloading the project, you need to install the dependencies.
You need to write the command while in the frontend, backend/iot, backend/db directories

>npm install

To run, you need to write the command while in the frontend, backend/iot, backend/db directories

>npm run start

Open your browser at http://localhost:4200/
