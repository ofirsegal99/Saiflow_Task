import styles from '@/components/Button/Button.module.scss';
import { HTMLAttributes } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>{
    children:React.ReactNode;

}

const Button = ({children,...props}:ButtonProps) => {
  return (
    <button className={styles.button} {...props}>

        {children}
    </button>
  )
}

export default Button