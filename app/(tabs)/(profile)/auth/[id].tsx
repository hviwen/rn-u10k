import { useState, useEffect } from "react"
import { Session } from "@supabase/supabase-js"
import { supabase } from "@/utils/supabase"
import Account from "@/components/Account"
import Auth from "@/components/Auth"

export default function AuthScreen() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return <>{session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}</>
}
