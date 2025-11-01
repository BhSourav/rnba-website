import MembershipForm from '@/components/forms/MembershipForm'

export default function MembershipPage() {
  return (
    <div className="container mx-auto p-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Become a Member</h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Membership Benefits</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Exclusive Access</h3>
                  <p className="text-gray-600">Access to members-only events, workshops, and networking opportunities.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Discounts & Perks</h3>
                  <p className="text-gray-600">Special discounts on event tickets, merchandise, and partner offers.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Community Impact</h3>
                  <p className="text-gray-600">Your membership supports our community programs and initiatives.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg">Voting Rights</h3>
                  <p className="text-gray-600">Have a say in important organization decisions and elections.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg mt-8">
              <h3 className="font-semibold text-lg mb-2">Membership Tiers</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <span className="font-medium">Individual:</span> $50/year</li>
                <li>• <span className="font-medium">Family:</span> $100/year (up to 4 members)</li>
                <li>• <span className="font-medium">Student/Senior:</span> $25/year (with valid ID)</li>
                <li>• <span className="font-medium">Lifetime:</span> $1,000 (one-time payment)</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Membership Application</h2>
            <MembershipForm />
          </div>
        </div>
      </div>
    </div>
  )
}
