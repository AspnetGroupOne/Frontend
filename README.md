# React frontend for group-assignment.

## Assignment: 

We are a group of students at Nackademin in Stockholm, Sweden, who have been tasked with starting an eventbooking-site with the use of microservices.

### Our Team:

Benjamin           https://github.com/lobba1

Birger              https://github.com/Bir-San

Fredrik           https://github.com/5iqFreddie

Hampus            https://github.com/Hampus335

Shahad             https://github.com/ShahadAlkazzaz

Simon                https://github.com/SimonR-prog





# Pages:

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



# Components: 

Random components here for the purpose of showing which type of information needs to be added to use them.

### EventCard:

Event card will change the image depending on the category. If category is not found then it will display an "image not found" image.

<img src="https://github.com/user-attachments/assets/c2477a47-4994-4ccc-9e40-13c5062e33f1" height="200">

### How to use: 

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

### How to use: 

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

### How to use: 

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

### Footer:

<img src="https://github.com/user-attachments/assets/f54f7313-d3a0-4e4a-94fe-6605dcfa3e31" width="700">
