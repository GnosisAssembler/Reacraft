import { ReactElement } from 'react';

import Footer from 'components/templates/Footer/Footer';
import TopBar from 'components/templates/TopBar/TopBar';

import styles from './Layout.module.scss';

type LayoutProps = {
	children: ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<main>
			<TopBar />
			<div className={styles.content}>{children}</div>
			<Footer />
		</main>
	);
};

export default Layout;
