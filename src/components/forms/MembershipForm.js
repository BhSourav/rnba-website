'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function MembershipForm() {
  const { data: session } = useSession()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: session?.user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    membershipType: 'individual',
    additionalMembers: [
      { name: '', relationship: '' }
    ],
    hearAboutUs: '',
    volunteerInterest: false,
    skills: '',
    agreeToTerms: false
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleAdditionalMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.additionalMembers]
    updatedMembers[index] = { ...updatedMembers[index], [field]: value }
    setFormData(prev => ({
      ...prev,
      additionalMembers: updatedMembers
    }))
  }
  
  const addAdditionalMember = () => {
    setFormData(prev => ({
      ...prev,
      additionalMembers: [...prev.additionalMembers, { name: '', relationship: '' }]
    }))
  }
  
  const removeAdditionalMember = (index) => {
    const updatedMembers = formData.additionalMembers.filter((_, i) => i !== index)
    setFormData(prev => ({
      ...prev,
      additionalMembers: updatedMembers
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // In a real app, you would send this data to your API
      console.log('Submitting membership application:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsSuccess(true)
    } catch (error) {
      console.error('Submission failed:', error)
      alert('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (isSuccess) {
    return (
      <div className="text-center p-8">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-semibold mb-2">Application Received!</h3>
        <p className="text-gray-600 mb-4">Thank you for applying for membership with RNBA.</p>
        <p className="text-gray-600">We'll review your application and get back to you shortly.</p>
      </div>
    )
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input
              type="text"
              name="firstName"
              required
              className="w-full rounded-md border-gray-300 shadow-sm"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
            <input
              type="text"
              name="lastName"
              required
              className="w-full rounded-md border-gray-300 shadow-sm"
              value={formData.lastName}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full rounded-md border-gray-300 shadow-sm"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Address</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
            <input
              type="text"
              name="address"
              required
              className="w-full rounded-md border-gray-300 shadow-sm"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <input
                type="text"
                name="city"
                required
                className="w-full rounded-md border-gray-300 shadow-sm"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
              <input
                type="text"
                name="state"
                required
                className="w-full rounded-md border-gray-300 shadow-sm"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
              <input
                type="text"
                name="zipCode"
                required
                className="w-full rounded-md border-gray-300 shadow-sm"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Membership Type *</h3>
        <div className="space-y-2">
          {[
            { id: 'individual', label: 'Individual ($50/year)', value: 'individual' },
            { id: 'family', label: 'Family ($100/year - up to 4 members)', value: 'family' },
            { id: 'student', label: 'Student/Senior ($25/year with valid ID)', value: 'student' },
            { id: 'lifetime', label: 'Lifetime Membership ($1,000 one-time)', value: 'lifetime' },
          ].map(option => (
            <div key={option.id} className="flex items-center">
              <input
                id={option.id}
                name="membershipType"
                type="radio"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                checked={formData.membershipType === option.value}
                onChange={() => setFormData(prev => ({
                  ...prev,
                  membershipType: option.value
                }))}
              />
              <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {formData.membershipType === 'family' && (
        <div>
          <h3 className="text-lg font-medium mb-4">Additional Family Members</h3>
          {formData.additionalMembers.map((member, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full rounded-md border-gray-300 shadow-sm"
                  value={member.name}
                  onChange={(e) => handleAdditionalMemberChange(index, 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <div className="flex">
                  <input
                    type="text"
                    className="w-full rounded-l-md border-gray-300 shadow-sm"
                    placeholder="e.g., Spouse, Child"
                    value={member.relationship}
                    onChange={(e) => handleAdditionalMemberChange(index, 'relationship', e.target.value)}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeAdditionalMember(index)}
                      className="ml-2 px-3 bg-red-100 text-red-600 rounded-r-md hover:bg-red-200"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addAdditionalMember}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            + Add another family member
          </button>
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-medium mb-4">Additional Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">How did you hear about us?</label>
            <select
              name="hearAboutUs"
              className="w-full rounded-md border-gray-300 shadow-sm"
              value={formData.hearAboutUs}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="friend">Friend or Family</option>
              <option value="social">Social Media</option>
              <option value="search">Search Engine</option>
              <option value="event">Community Event</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="volunteerInterest"
                name="volunteerInterest"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={formData.volunteerInterest}
                onChange={handleChange}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="volunteerInterest" className="font-medium text-gray-700">
                I'm interested in volunteering opportunities
              </label>
            </div>
          </div>
          
          {formData.volunteerInterest && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What skills or areas are you interested in volunteering for?
              </label>
              <textarea
                name="skills"
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., Event planning, Graphic design, Teaching, etc."
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
              I agree to the terms and conditions *
            </label>
            <p className="text-gray-500">
              By checking this box, you agree to our membership terms and privacy policy.
            </p>
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  )
}
