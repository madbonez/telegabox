import { Button } from '@/components/Button'
import { YaButton } from '@/components/YaButton'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { RootState } from '@/store/store'
import { getToken, logout } from '@/store/tokenSlice'
import { getUserInfo } from '@/store/userSlice'
import { Inter } from '@next/font/google'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const user = useAppSelector((state: RootState) => state.user.user);
  const token = useAppSelector((state: RootState) => state.token.token);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;
    
    if (code && !Array.isArray(code)) {
      window.history.replaceState(null, '', window.location.pathname);
      console.log(code);
      dispatch(getToken(code))
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (token) {
      dispatch(getUserInfo());
    }
  }, [dispatch, token]);


  return (
    <div className='flex flex-col space-y-2 p-2'>
      <h1>Hello Page</h1>
      <h2>{JSON.stringify(user)}</h2>
      <div className='flex space-x-2'>
        {!user && <YaButton/>}     
        {!!user && <Button onClick={() => dispatch(logout())}>logout</Button>}      
      </div>
    </div>
  )
}
