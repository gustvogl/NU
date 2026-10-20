import { Preferences } from '@capacitor/preferences';
export const SESSION_KEY='supabase_session';
export class InvalidStoredSession extends Error {}
export function credentials(session) {
 if(!session || typeof session.access_token!=='string' || !session.access_token || typeof session.refresh_token!=='string' || !session.refresh_token) throw new InvalidStoredSession('Sessão inválida.');
 return {access_token:session.access_token,refresh_token:session.refresh_token,...(Number.isFinite(session.expires_at)?{expires_at:session.expires_at}:{})};
}
export function createSessionStorage(preferences=Preferences) {
 return {
  async read(){const {value}=await preferences.get({key:SESSION_KEY});if(!value)return null;try{return credentials(JSON.parse(value));}catch{throw new InvalidStoredSession('Sessão salva inválida.');}},
  async save(session){await preferences.set({key:SESSION_KEY,value:JSON.stringify(credentials(session))});},
  async remove(){await preferences.remove({key:SESSION_KEY});}
 };
}
