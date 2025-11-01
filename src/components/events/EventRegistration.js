'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function EventRegistration({ event, onComplete }) {
  const { data: session } = useSession()
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    attendees: 1,
    foodPreferences: ['']
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAttendeeChange = (e) => {
    const count = parseInt(e.target.value) || 1
    const foodPreferences = Array(count).fill('').map((_, i) => 
      formData.foodPreferences[i] || ''
    )
    
    setFormData(prev => ({
      ...prev,
      attendees: count,
      foodPreferences
    }))
  }

  const handleFoodPreferenceChange = (index, value) => {
    const newFoodPreferences = [...formData.foodPreferences]
    newFoodPreferences[index] = value
    
    setFormData(prev => ({
      ...prev,
      foodPreferences: newFoodPreferences
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // In a real app, you would send this data to your API
      console.log('Registering for event:', {
        eventId: event.id,
        ...formData
      })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSuccess(true)
      setTimeout(() => {
        onComplete?.()
      }, 2000)
    } catch (error) {
      console.error('Registration failed:', error)
      alert('Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center p-8">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-semibold mb-2">Registration Successful!</h3>
        <p className="text-gray-600">Thank you for registering for {event.title}.</p>
        <p className="text-gray-600">A confirmation has been sent to your email.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-medium mb-4">Contact Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-md border-gray-300 shadow-sm"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-md border-gray-300 shadow-sm"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full rounded-md border-gray-300 shadow-sm"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Attendees *</label>
            <select
              name="attendees"
              className="w-full rounded-md border-gray-300 shadow-sm"
              value={formData.attendees}
              onChange={handleAttendeeChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Attendee Details</h3>
        <div className="space-y-4">
          {Array.from({ length: formData.attendees }).map((_, index) => (
            <div key={index} className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">Attendee {index + 1}</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Food Preference for Attendee {index + 1} *
                </label>
                <select
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm"
                  value={formData.foodPreferences[index] || ''}
                  onChange={(e) => handleFoodPreferenceChange(index, e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Gluten-Free</option>
                  <option value="other">Other (please specify)</option>
                </select>
                {formData.foodPreferences[index] === 'other' && (
                  <input
                    type="text"
                    placeholder="Please specify"
                    className="mt-2 w-full rounded-md border-gray-300 shadow-sm"
                    value={formData.foodPreferences.otherDetails || ''}
                    onChange={(e) => {
                      const newFoodPreferences = [...formData.foodPreferences]
                      newFoodPreferences.otherDetails = e.target.value
                      setFormData(prev => ({
                        ...prev,
                        foodPreferences: newFoodPreferences
                      }))
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={() => onComplete?.()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Complete Registration'}
        </button>
      </div>
    </form>
  )
}
