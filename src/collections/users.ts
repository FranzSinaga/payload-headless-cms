import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  hooks: {
    // Payload clears the lock counters itself on a successful login, but only
    // once the account is already locked: resetLoginAttempts() bails unless
    // lockUntil is set. Failed attempts short of the limit (5 by default) therefore
    // survive a successful login and keep counting up, so a user who mistypes
    // twice today and three times next week gets locked out on a correct
    // password. Clear both counters on every successful login instead.
    afterLogin: [
      async ({ req, user }) => {
        await req.payload.update({
          collection: 'users',
          id: user.id,
          data: { lockUntil: null, loginAttempts: 0 },
          depth: 0,
          overrideAccess: true,
          req,
        })
      },
    ],
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
