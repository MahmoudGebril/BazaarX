/**
 * Admin route guard. In production, this would check auth and redirect.
 * For the demo, all users can access /admin.
 */
export const adminGuard = () => true;
