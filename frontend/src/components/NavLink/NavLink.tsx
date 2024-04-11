import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from '@/components/NavLink/NavLink.module.scss';

interface NavLinkProps{
    to:string,
    children:ReactNode,

}

const NavLink = ({children,to}:NavLinkProps) => {
    return (<Link className={styles.navlink} to={to}>
        {children}
    </Link>
    )
}

export default NavLink