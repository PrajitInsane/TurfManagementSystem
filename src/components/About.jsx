import React from 'react'

const About = () => {
  return (
    <div className='bg-black text-purple-300 h-auto px-10'>
        <h1 className='text-4xl font-semibold flex justify-center pt-6 text-purple-900'>About Us</h1>
        <div className='text-2xl py-6'>
        <p>
        The BookTurf is an innovative web application developed to simplify the process of booking football turf slots in Kozhikode, Kerala. Designed with both players and turf owners in mind, this platform bridges the gap between demand and availability, 
        providing a streamlined solution for hassle-free scheduling.
        </p>
        <h1 className='text-3xl font-semibold text-purple-900 pt-5'>Key features</h1>
        <ol className='pt-4'>
            <li>Easy User Registration & Login:
            Users can sign up quickly and log in to manage their bookings, ensuring a secure and personalized experience.</li>
            <li>Real-Time Slot Availability:
            The system provides up-to-date information on available time slots, helping users plan their games without delays.</li>
            <li>Seamless Slot Booking:
            Users can book slots with just a few clicks, eliminating the need for phone calls or in-person reservations.</li>
            <li>Booking History Management:
            A dedicated section lets users track their past and upcoming bookings, providing a clear overview of their schedule.</li>
            <li>Cancellation Flexibility:
            Bookings can be canceled directly through the app, offering convenience for users facing last-minute changes.</li>
        </ol>
        <h1 className='text-3xl text-purple-900 pt-3 font-semibold'>Technology Stack:</h1>
        <ol className='pt-4'>
            <li>Frontend:
            Built with React.js to deliver a responsive and engaging user experience.</li>
            <li>Backend:
            Node.js and Express.js power the server-side, providing fast and reliable processing of requests. </li>
            <li>Database:
            MongoDB ensures efficient data storage and retrieval, enabling smooth management of user data and bookings.</li>
        </ol>
        <h1 className='text-3xl text-purple-900 pt-3 font-semibold'>Purpose and Benefits:</h1>
        <p className='pt-4 mb-10'>
        The Turf Management System simplifies the often cumbersome process of managing turf bookings, offering players an easy way to secure their desired slots while empowering turf owners with tools to optimize their operations. This platform enhances accessibility and efficiency, contributing to the growing sports culture in Kozhikode by fostering better organization and participation in football activities.

Whether you're planning a casual game or managing a busy schedule of bookings, the Turf Management System ensures a seamless experience for all.
        </p>
        </div>
    </div>
  )
}

export default About