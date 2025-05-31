# React frontend for group-assignment.

### Assignment:

We are a group of students at Nackademin in Stockholm, Sweden, who have been tasked with starting an eventbooking-site with the use of microservices.

#### Our Team:

Benjamin           https://github.com/lobba1

Birger              https://github.com/Bir-San

Fredrik           https://github.com/5iqFreddie

Hampus            https://github.com/Hampus335

Shahad             https://github.com/ShahadAlkazzaz

Simon                https://github.com/SimonR-prog



## Pages:

```jsx
/ Ventixe - Event-page

/ ADMIN:
│
├── Bookings.jsx             # 
├── Dashboard.jsx            # 
├── EventDetails.jsx         # Page where admin can add even more information to av event.
├──                          # 
├──                          #  
├──                          # 
└──                          # 

/ AUTH:
├── SignIn.jsx               # Page for signing in. 
├── SignUp.jsx               # Page for signing up.
└── Unauthorized.jsx         # Page for unauthorized access.

/ USER:
│
├── Bookings.jsx             # 
├── Dashboard.jsx            # 
├── EVoucher.jsx             # Page where user can see their ticket and additional information about an event that they have booked.
├──                          # 
├──                          #  
├──                          # 
└──                          # 

```

## Installation:

To clone the repo:
```bash
git clone https://github.com/AspnetGroupOne/Frontend.git
cd Frontend
npm install
```
To run locally: 
```bash
npm run dev
```

## Static web app:

There are some issues that arise when deploying an static web app on azure which we did with this project.

### The first issue:

The reason it is need is simply because react apps are single page applications that use client side routing. (React router)
When refreshing or navigating directly to a nested route, the default behaviour of static web apps is to look for a file or folder at that path. Without a config file it won't find one and will return 404 not found.

You create the staticwebapp.config.json file to show how to handle incoming requests. You set up a fallback route that serves index.html which is your SPAs entry point. And add 

The location of where to put the file can differ on whether you initialized your project with vite or create-react-app. In our case, with vite, we created the file in the public folder and gave it the content:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": [
      "/assets/*",
      "/favicon.ico",
      "/robots.txt",
      "/manifest.webmanifest",
      "/apple-touch-icon.png",
      "/vite.svg",
      "/images/*",
      "/images/error_images/*",
      "/images/event_card_images/*",
      "/images/paid_status_icons/*",
      "/images/rules-icons/*",
      "/images/sidebar-images/*",
      "/images/SocialMedia-icons/*"
    ]
  }
}
```

***Source:*** https://learn.microsoft.com/en-us/azure/static-web-apps/configuration

***Chatgpt:*** Was shown our folder structure and helped with creating our config files content. 

### The second issue:

The other issue is after having deployed the static web app. 

There is a file which is created in which we need to change a single word from "build" to "dist" to make it work. The reason for this is once again because we used vite. 

You find the file:

<img src="https://github.com/user-attachments/assets/1e8d33ca-91be-41e6-a183-751e7fc1343a" height="100">

And scroll down to:

```yml
output_location: "dist" # Built app content directory - optional
```

When having just deployed the web app, it says "build" and it simply needs to be changed to "dist" and your static web app should soon be up and running. Again, this is because we used vite. If you're using create-react-app then the word "build" might be the correct word. 


## Components: 

Random components here for the purpose of showing which type of information needs to be added to use them.

### EventCard:

Event card will change the image depending on the category. If category is not found then it will display an "image not found" image.

<img src="https://github.com/user-attachments/assets/c2477a47-4994-4ccc-9e40-13c5062e33f1" height="200">

#### How to use: 

```jsx
const Eventcard = () => {
  const events = [
    {
      category: "Sport",
      title: "American Football",
      location: "Florida",
      date: "Apr 20, 2026",
      price: 2000
    }
  ]
  return (
    <>
      <div className='events'>
        {events.map((event, index) => ( <Event_card key={index} event={event} /> ))}
      </div>    
    </>
  )
}
export default Eventcard
```

### PaidStatusCard:

Paid status card will change the little icon depening on the status. (Paid/Unpaid/Overdue)

<img src="https://github.com/user-attachments/assets/6bff10ae-97b9-4e61-bf67-9ca50f377629" width="500">

#### How to use: 

```jsx
const PaidStatusesCard = () => {
    const payStatuses = [
        {
          status: "Paid",
          amount: 1250,
          lastMonth: 1500
        }
      ]
    return (
        <>
        <div className='paid-statuses'>
            {payStatuses.map((payStatus, index) => ( <PaidStatusCard key={index} payStatus={payStatus} /> ))}
        </div> 
        </>
    )
}
export default PaidStatusesCard
```

### CalendarDayCard:

The color on the calendar days card will change depending on if the day is even or not. 

<img src="https://github.com/user-attachments/assets/422d2eb1-6570-478c-9e0b-2790da8b919d" height="200">

#### How to use: 

```jsx
const CalendarDaysCard = () => {
    const calendar_days = [
        {
            date: "12",
            day: "Mon",
            title: "Fashion Show",
            description: "Fashion show for the homeless.",
            theme: "Fashion",
            startTime: "12:00",
            endTime: "13:30"
        }
    ]
    return (
        <>
            <div>
                {calendar_days.map((calendarDays, index) => ( <CalendarDayCard key={index} calendarDays={calendarDays} /> ))}
            </div>
        </>
    )
}
export default CalendarDaysCard
```
