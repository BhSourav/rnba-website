'use client'

import { useState } from 'react'
import EventRegistration from './EventRegistration'

// Mock data - in a real app, this would come from your database
const mockEvents = [
  {
    id: '1',
    title: 'Community Meetup',
    description: 'Join us for our monthly community meetup with food and networking.',
    date: '2023-12-15T18:00:00Z',
    location: 'Community Center, 123 Main St',
    capacity: 100,
  },
  {
    id: '2',
    title: 'Annual Gala',
    description: 'Our biggest fundraising event of the year with dinner and live music.',
    date: '2023-12-20T19:00:00Z',
    location: 'Grand Ballroom, 456 Park Ave',
    capacity: 200,
  },
]

export default function EventList() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  const handleRegisterClick = (event) => {
    setSelectedEvent(event)
  }

  const handleRegistrationComplete = () => {
    setSelectedEvent(null)
    // You might want to refresh the events list here
  }

  if (selectedEvent) {
    return (
      <div className="mt-8">
        <button 
          onClick={() => setSelectedEvent(null)}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back to events
        </button>
        <h2 className="text-2xl font-semibold mb-4">Register for {selectedEvent.title}</h2>
        <EventRegistration 
          event={selectedEvent} 
          onComplete={handleRegistrationComplete} 
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {mockEvents.map((event) => (
        <div key={event.id} className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold">{event.title}</h2>
          <p className="text-gray-600 mt-2">{event.description}</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>📅 {new Date(event.date).toLocaleDateString()}</p>
            <p>📍 {event.location}</p>
            <p>👥 Capacity: {event.capacity} people</p>
          </div>
          <button
            onClick={() => handleRegisterClick(event)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Register Now
          </button>
        </div>
      ))}
    </div>
  )
}
