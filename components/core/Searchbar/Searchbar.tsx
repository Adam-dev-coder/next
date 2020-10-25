import { FC, useEffect } from 'react'
import cn from 'classnames'
import s from './Searchbar.module.css'
import { useRouter } from 'next/router'

interface Props {
  className?: string
}

const Searchbar: FC<Props> = ({ className }) => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/search')
  }, [])

  return (
    <label
      className={cn(
        'relative text-sm bg-accents-1 text-base w-full transition-colors duration-150',
        className
      )}
    >
      <input
        className={s.input}
        placeholder="Search for products..."
        defaultValue={router.query.q}
        onKeyUp={(e) => {
          e.preventDefault()

          if (e.key === 'Enter') {
            const q = e.currentTarget.value

            router.push(
              {
                pathname: `/search`,
                query: q ? { q } : {},
              },
              undefined,
              { shallow: true }
            )
          }
        }}
      />
      <div className={s.iconContainer}>
        <svg className={s.icon} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          />
        </svg>
      </div>
    </label>
  )
}

export default Searchbar
