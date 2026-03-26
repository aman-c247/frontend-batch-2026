
'use client'

import React from 'react'
import classNames from 'classnames'
import styles from './Button.module.scss'
import type { ButtonProps } from '@/types/activity.types'



export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  icon,
  iconPosition = 'right',
  className,
  disabled,
  size = "md",
   iconOnly=false,
  ...props

}) => {
  return (
    <button
      className={classNames(
        styles.btn,
        styles[variant],
        styles[size],
        {
          [styles.iconOnly]: iconOnly,
        },
        className,
      )}
      {...props}
    >
      {iconOnly ? (
        <span className={styles.icon}>{icon}</span>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className={styles.icon}>{icon}</span>
          )}
          <span>{children}</span>
          {icon && iconPosition === 'right' && (
            <span className={styles.icon}>{icon}</span>
          )}
        </>
      )}
    </button>
  )
}
