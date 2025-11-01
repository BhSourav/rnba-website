// Mock Supabase client for testing without connecting to real Supabase instance

const mockData = {
  users: [
    {
      id: '1',
      email: 'test@example.com',
      user_metadata: {
        name: 'Test User',
        full_name: 'Test User'
      },
      created_at: new Date().toISOString()
    }
  ],
  profiles: [
    {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      company: 'Test Company',
      role: 'member',
      created_at: new Date().toISOString()
    }
  ],
  events: [
    {
      id: '1',
      title: 'Annual Business Summit 2024',
      description: 'Join us for our biggest event of the year!',
      date: '2024-03-15T09:00:00Z',
      location: 'Grand Convention Center',
      category: 'conference',
      capacity: 500,
      price: 99.99
    },
    {
      id: '2',
      title: 'Networking Mixer',
      description: 'Connect with fellow business professionals',
      date: '2024-03-22T18:00:00Z',
      location: 'Riverside Hotel',
      category: 'networking',
      capacity: 100,
      price: 25.00
    }
  ],
  files: [
    {
      id: '1',
      user_id: '1',
      name: 'welcome-guide.pdf',
      url: '/mock-files/welcome-guide.pdf',
      size: 1024000,
      mime_type: 'application/pdf',
      created_at: new Date().toISOString()
    }
  ]
};

const createMockSupabaseClient = () => {
  let currentUser = null;
  let isAuthenticated = false;

  return {
    auth: {
      signInWithPassword: async ({ email, password }) => {
        // Simulate authentication delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (email === 'test@example.com' && password === 'password123') {
          currentUser = mockData.users[0];
          isAuthenticated = true;
          return {
            data: {
              user: currentUser,
              session: {
                access_token: 'mock-access-token',
                refresh_token: 'mock-refresh-token'
              }
            },
            error: null
          };
        } else {
          return {
            data: { user: null, session: null },
            error: { message: 'Invalid login credentials' }
          };
        }
      },

      signUp: async ({ email, password, options }) => {
        // Simulate signup delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const newUser = {
          id: String(mockData.users.length + 1),
          email,
          user_metadata: {
            name: options?.data?.name || 'New User',
            full_name: options?.data?.full_name || options?.data?.name || 'New User'
          },
          created_at: new Date().toISOString()
        };
        
        mockData.users.push(newUser);
        
        return {
          data: {
            user: newUser,
            session: null // Email confirmation required
          },
          error: null
        };
      },

      signInWithOAuth: async ({ provider, options }) => {
        // Simulate OAuth delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For testing, we'll simulate successful OAuth
        currentUser = mockData.users[0];
        isAuthenticated = true;
        
        return {
          data: { url: `${window.location.origin}/auth/callback` },
          error: null
        };
      },

      signOut: async () => {
        currentUser = null;
        isAuthenticated = false;
        return {
          error: null
        };
      },

      getUser: async () => {
        return {
          data: { user: currentUser },
          error: null
        };
      },

      getSession: async () => {
        if (isAuthenticated && currentUser) {
          return {
            data: {
              session: {
                access_token: 'mock-access-token',
                refresh_token: 'mock-refresh-token',
                user: currentUser
              }
            },
            error: null
          };
        }
        return {
          data: { session: null },
          error: null
        };
      },

      onAuthStateChange: (callback) => {
        // Mock auth state changes
        const unsubscribe = () => {};
        
        // Simulate initial auth check
        setTimeout(() => {
          callback('INITIAL_SESSION', isAuthenticated ? { user: currentUser } : null);
        }, 100);
        
        return { data: { subscription: { unsubscribe } } };
      }
    },

    from: (table) => ({
      select: (columns = '*') => ({
        eq: (column, value) => ({
          async single() {
            const items = mockData[table] || [];
            const item = items.find(item => item[column] === value);
            return {
              data: item || null,
              error: item ? null : { message: 'Not found' }
            };
          },
          async then(resolve) {
            const items = mockData[table] || [];
            const filteredItems = items.filter(item => item[column] === value);
            resolve({
              data: filteredItems,
              error: null
            });
          }
        }),
        async then(resolve) {
          const items = mockData[table] || [];
          resolve({
            data: items,
            error: null
          });
        }
      }),

      insert: (data) => ({
        async select() {
          const items = mockData[table] || [];
          const newItem = {
            id: String(items.length + 1),
            ...data,
            created_at: new Date().toISOString()
          };
          items.push(newItem);
          return {
            data: [newItem],
            error: null
          };
        }
      }),

      update: (data) => ({
        eq: (column, value) => ({
          async select() {
            const items = mockData[table] || [];
            const itemIndex = items.findIndex(item => item[column] === value);
            if (itemIndex >= 0) {
              items[itemIndex] = { ...items[itemIndex], ...data, updated_at: new Date().toISOString() };
              return {
                data: [items[itemIndex]],
                error: null
              };
            }
            return {
              data: [],
              error: { message: 'Not found' }
            };
          }
        })
      }),

      delete: () => ({
        eq: (column, value) => ({
          async then(resolve) {
            const items = mockData[table] || [];
            const itemIndex = items.findIndex(item => item[column] === value);
            if (itemIndex >= 0) {
              const deletedItem = items.splice(itemIndex, 1)[0];
              resolve({
                data: [deletedItem],
                error: null
              });
            } else {
              resolve({
                data: [],
                error: { message: 'Not found' }
              });
            }
          }
        })
      })
    }),

    storage: {
      from: (bucket) => ({
        upload: async (path, file) => {
          // Simulate file upload delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockFileUrl = `/mock-storage/${bucket}/${path}`;
          return {
            data: {
              path: mockFileUrl,
              id: String(Date.now()),
              fullPath: mockFileUrl
            },
            error: null
          };
        },

        remove: async (paths) => {
          // Simulate file deletion delay
          await new Promise(resolve => setTimeout(resolve, 300));
          
          return {
            data: paths.map(path => ({ name: path })),
            error: null
          };
        },

        getPublicUrl: (path) => {
          return {
            data: {
              publicUrl: `/mock-storage/${bucket}/${path}`
            }
          };
        },

        list: async (folder = '') => {
          // Simulate listing delay
          await new Promise(resolve => setTimeout(resolve, 200));
          
          const mockFiles = [
            {
              name: 'sample-file.pdf',
              id: '1',
              updated_at: new Date().toISOString(),
              created_at: new Date().toISOString(),
              last_accessed_at: new Date().toISOString(),
              metadata: {
                size: 1024000,
                mimetype: 'application/pdf'
              }
            }
          ];
          
          return {
            data: mockFiles,
            error: null
          };
        }
      })
    }
  };
};

export { createMockSupabaseClient };
