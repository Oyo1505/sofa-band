'use client'

import { signIn, signOut } from '@/lib/auth';
import { URL_DASHBOARD } from '@/lib/routes';
import { useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';

const ButtonLogin = () => {
  const t = useTranslations('Header');
  const locale = useLocale();
  const session = useSession()
  return (
    <div>
      {session.status === 'unauthenticated' ? (
        <button onClick={() => signIn('google', { callbackUrl: `/${locale}/${URL_DASHBOARD
        }` })} className='hover:cursor-pointer'>
          {t('Signin')}
        </button>
      ) :
        <button onClick={() => signOut()} className='hover:cursor-pointer'>
          {t('Signout')}
        </button>
      }

    </div>
  )
}

export default ButtonLogin
