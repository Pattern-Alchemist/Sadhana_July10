// Simple auth client for demo
export const auth = {
  api: {
    getSession: async ({ headers }: any) => {
      // In production, this would validate the session from headers
      return {
        user: {
          id: 'demo-user-id',
          email: 'user@sadhana.app',
          name: 'Spiritual Seeker',
        },
      }
    },
  },
}

export async function getUserIdFromSession() {
  const session = await auth.api.getSession({ headers: {} })
  return session?.user?.id || 'demo-user-id'
}
