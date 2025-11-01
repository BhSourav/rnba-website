import { FaBuilding, FaHandshake, FaHeart } from 'react-icons/fa'

export default function SponsorsPage() {
  // Mock data - in a real app, this would come from your database
  const sponsors = [
    {
      id: 1,
      name: 'TechCorp',
      tier: 'Platinum',
      logo: '/sponsors/techcorp.png',
      description: 'Leading technology solutions provider supporting community initiatives.',
      website: 'https://techcorp.example.com',
      since: 2020
    },
    {
      id: 2,
      name: 'GreenEarth',
      tier: 'Gold',
      logo: '/sponsors/greenearth.png',
      description: 'Dedicated to sustainable development and community growth.',
      website: 'https://greenearth.example.com',
      since: 2021
    },
    {
      id: 3,
      name: 'LocalBiz',
      tier: 'Silver',
      logo: '/sponsors/localbiz.png',
      description: 'Your neighborhood partner in building stronger communities.',
      website: 'https://localbiz.example.com',
      since: 2022
    },
    {
      id: 4,
      name: 'EduFuture',
      tier: 'Bronze',
      logo: '/sponsors/edufuture.png',
      description: 'Investing in education and youth development programs.',
      website: 'https://edufuture.example.com',
      since: 2023
    }
  ]

  const sponsorTiers = {
    'Platinum': {
      bgColor: 'from-gray-100 to-gray-200',
      borderColor: 'border-gray-300',
      icon: <FaBuilding className="text-4xl text-gray-700 mb-4" />
    },
    'Gold': {
      bgColor: 'from-yellow-50 to-yellow-100',
      borderColor: 'border-yellow-200',
      icon: <FaHandshake className="text-4xl text-yellow-600 mb-4" />
    },
    'Silver': {
      bgColor: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      icon: <FaHandshake className="text-4xl text-gray-400 mb-4" />
    },
    'Bronze': {
      bgColor: 'from-amber-50 to-amber-100',
      borderColor: 'border-amber-200',
      icon: <FaHeart className="text-4xl text-amber-600 mb-4" />
    }
  }

  const groupByTier = () => {
    return sponsors.reduce((acc, sponsor) => {
      if (!acc[sponsor.tier]) {
        acc[sponsor.tier] = []
      }
      acc[sponsor.tier].push(sponsor)
      return acc
    }, {})
  }

  const sponsorsByTier = groupByTier()

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Our Valued Sponsors
          </h1>
          <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-500">
            We are grateful for the generous support of our sponsors who make our community initiatives possible.
          </p>
        </div>

        <div className="space-y-16">
          {Object.entries(sponsorsByTier).map(([tier, tierSponsors]) => (
            <div key={tier} className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">{tier} Sponsors</h2>
                <div className="mt-2 h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tierSponsors.map((sponsor) => (
                  <div 
                    key={sponsor.id}
                    className={`bg-white rounded-xl shadow-md overflow-hidden border ${sponsorTiers[tier].borderColor} hover:shadow-lg transition-shadow duration-300`}
                  >
                    <div className={`p-8 bg-gradient-to-br ${sponsorTiers[tier].bgColor} text-center`}>
                      <div className="flex justify-center">
                        {sponsorTiers[tier].icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{sponsor.name}</h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                        {tier} Sponsor
                      </span>
                      <p className="text-gray-600 mb-4">{sponsor.description}</p>
                      <div className="text-sm text-gray-500 mb-4">
                        Supporting since {sponsor.since}
                      </div>
                      <a 
                        href={sponsor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Visit Website
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 md:p-12 lg:p-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Become a Sponsor</h2>
              <p className="mt-4 text-lg text-blue-100">
                Join our community of supporters and help us make a difference. Your sponsorship will directly impact our programs and initiatives.
              </p>
              <div className="mt-8">
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Learn More About Sponsorship
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Sponsorship Tiers</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  name: 'Platinum',
                  amount: '$10,000+',
                  benefits: [
                    'Logo placement on all event materials',
                    'Featured on homepage',
                    'Speaking opportunities at events',
                    'All benefits from lower tiers'
                  ]
                },
                {
                  name: 'Gold',
                  amount: '$5,000 - $9,999',
                  benefits: [
                    'Logo on website and select materials',
                    'Social media recognition',
                    'Recognition at events',
                    'All benefits from lower tiers'
                  ]
                },
                {
                  name: 'Silver',
                  amount: '$1,000 - $4,999',
                  benefits: [
                    'Logo on website',
                    'Social media mention',
                    'Event recognition',
                    'All benefits from lower tiers'
                  ]
                },
                {
                  name: 'Bronze',
                  amount: 'Up to $999',
                  benefits: [
                    'Name listed on website',
                    'Our sincere thanks',
                    'Newsletter mention'
                  ]
                }
              ].map((tier) => (
                <div key={tier.name} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{tier.name}</h4>
                  <p className="text-blue-600 font-semibold mb-4">{tier.amount}</p>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
