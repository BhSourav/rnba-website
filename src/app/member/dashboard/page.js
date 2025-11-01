'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FiCalendar, 
  FiUser, 
  FiClock, 
  FiFileText, 
  FiLogOut, 
  FiArrowRight, 
  FiUpload
} from 'react-icons/fi';
import FileUploadDialog from '@/components/FileUploadDialog';
import FileList from '@/components/FileList';

export default function MemberDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [membershipStatus, setMembershipStatus] = useState('inactive');
  const [isMember, setIsMember] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [filesUpdated, setFilesUpdated] = useState(0); // Used to trigger re-fetch of files

  useEffect(() => {
    if (status === 'loading') return;
    
    if (status === 'unauthenticated') {
      router.push('/auth/login');
      return;
    }

    // Simulate fetching user data
    const fetchData = async () => {
      try {
        // In a real app, you would fetch this data from your API
        const mockUserData = {
          id: session?.user?.id || 'user123',
          name: session?.user?.name || 'Member',
          email: session?.user?.email || '',
          joinDate: '2023-01-15',
          membershipExpiry: '2024-01-15',
          membershipType: 'Annual',
          profileComplete: 75,
        };

        const mockEvents = [
          {
            id: 1,
            title: 'Annual General Meeting',
            date: '2023-11-15T18:00:00',
            location: 'Community Center',
            description: 'Join us for our yearly general meeting to discuss the future of our community.',
          },
          {
            id: 2,
            title: 'Holiday Party',
            date: '2023-12-20T19:00:00',
            location: 'Grand Ballroom',
            description: 'Celebrate the holiday season with your fellow members!',
          },
        ];

        setUserData(mockUserData);
        setUpcomingEvents(mockEvents);
        setMembershipStatus('active'); // or 'expired', 'pending', etc.
        setIsMember(true);
        setIsAdmin(session?.user?.email?.endsWith('@admin.com') || false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [status, session, router]);

  const handleFileUploaded = () => {
    setFilesUpdated(prev => prev + 1); // Trigger re-fetch of files
  };

  if (isLoading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session) {
    return null; // Will be redirected by the useEffect
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time for event cards
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Quick action items
  const quickActions = [
    {
      title: 'Update Profile',
      description: 'Complete your member profile',
      icon: <FiUser className="h-6 w-6 text-blue-500" />,
      href: '/member/profile',
      progress: userData?.profileComplete || 0,
    },
    {
      title: 'View Events',
      description: 'Browse upcoming events',
      icon: <FiCalendar className="h-6 w-6 text-green-500" />,
      href: '/events',
    },
    {
      title: 'Member Directory',
      description: 'Connect with other members',
      icon: <FiUser className="h-6 w-6 text-purple-500" />,
      href: '/member/directory',
    },
    {
      title: 'Resources',
      description: 'Access member-only resources',
      icon: <FiFileText className="h-6 w-6 text-yellow-500" />,
      href: '/member/resources',
    },
  ];

  // Admin quick actions (only shown to admins)
  const adminActions = isAdmin
    ? [
        {
          title: 'Manage Members',
          description: 'View and manage member accounts',
          icon: <FiUser className="h-6 w-6 text-red-500" />,
          href: '/admin/members',
        },
        {
          title: 'Create Event',
          description: 'Add a new event',
          icon: <FiCalendar className="h-6 w-6 text-indigo-500" />,
          href: '/admin/events/create',
        },
      ]
    : [];

  // Combine regular and admin actions
  const allActions = [...quickActions, ...adminActions];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* File Upload Dialog */}
      <FileUploadDialog 
        isOpen={isUploadDialogOpen} 
        onClose={() => setIsUploadDialogOpen(false)}
        onUpload={handleFileUploaded}
      />

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Member Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {userData?.name || 'Member'}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiLogOut className="mr-2 h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <FiUser className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    Welcome back, {userData?.name || 'Valued Member'}!
                  </h3>
                  <div className="mt-1 text-sm text-gray-500">
                    {membershipStatus === 'active' ? (
                      <p>Your membership is active until {userData?.membershipExpiry ? formatDate(userData.membershipExpiry) : 'N/A'}</p>
                    ) : (
                      <p>Your membership is {membershipStatus}. Please renew to access all features.</p>
                    )}
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <Link
                    href="/member/profile"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {allActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {action.icon}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {action.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {action.description}
                      </p>
                      {action.progress > 0 && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${action.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{action.progress}% complete</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* My Files Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">My Files</h2>
            <button
              onClick={() => setIsUploadDialogOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiUpload className="mr-2 h-4 w-4" />
              Upload Files
            </button>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <FileList key={filesUpdated} />
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Events</h2>
            <Link href="/events" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all events <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <li key={event.id}>
                    <Link href={`/events/${event.id}`} className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-blue-600 truncate">
                            {event.title}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {formatDate(event.date)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <FiClock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {formatTime(event.date)}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <FiUser className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {event.location}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <span className="inline-flex items-center text-sm">
                              View details
                              <FiArrowRight className="ml-1 h-4 w-4" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-4 py-5 text-center text-gray-500">
                  No upcoming events. Check back later!
                </li>
              )}
            </ul>
          </div>
        </div>

        {isMember && (
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Your Membership</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <FiUser className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {userData?.membershipType || 'Standard'} Membership
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>
                        Status:{' '}
                        <span className="font-medium text-green-600">
                          {membershipStatus === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </p>
                      <p className="mt-1">
                        Member since: {userData?.joinDate ? formatDate(userData.joinDate) : 'N/A'}
                      </p>
                      {membershipStatus === 'active' && userData?.membershipExpiry && (
                        <p className="mt-1">
                          Renewal date: {formatDate(userData.membershipExpiry)}
                        </p>
                      )}
                    </div>
                    <div className="mt-4">
                      <Link
                        href="/member/membership"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Manage Membership
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
