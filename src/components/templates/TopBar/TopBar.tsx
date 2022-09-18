import { useState, MouseEvent } from 'react';

import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { GiStoneBlock } from 'react-icons/gi';
import { Link } from 'react-router-dom';

import styles from './TopBar.module.scss';

const pages = [
	{
		name: 'Home',
		path: '/'
	}
];
const settings = ['Settings'];

const TopBar = () => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const Search = styled('div')(({ theme }) => {
		return {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: alpha(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: alpha(theme.palette.common.white, 0.25)
			},
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(1),
				width: 'auto'
			}
		};
	});

	const SearchIconWrapper = styled('div')(({ theme }) => {
		return {
			padding: theme.spacing(0, 2),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		};
	});

	const StyledInputBase = styled(InputBase)(({ theme }) => {
		return {
			color: 'inherit',
			'& .MuiInputBase-input': {
				padding: theme.spacing(1, 1, 1, 0),
				// vertical padding + font size from searchIcon
				paddingLeft: `calc(1em + ${theme.spacing(4)})`,
				transition: theme.transitions.create('width'),
				width: '100%',
				[theme.breakpoints.up('sm')]: {
					width: '12ch',
					'&:focus': {
						width: '20ch'
					}
				}
			}
		};
	});

	return (
		<AppBar position="static" color="primary">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
						<GiStoneBlock fontSize={25} />
					</Box>

					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						Reacraft
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' }
							}}
						>
							{pages.map((page) => {
								return (
									<Link key={page.name} to={page.path}>
										<MenuItem onClick={handleCloseNavMenu}>
											<Typography textAlign="center">{page.name}</Typography>
										</MenuItem>
									</Link>
								);
							})}
						</Menu>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
						<GiStoneBlock fontSize={35} />
					</Box>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						Reacraft
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => {
							return (
								<Link key={page.name} to={page.path}>
									<Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
										{page.name}
									</Button>
								</Link>
							);
						})}
					</Box>

					<Search sx={{ mr: 5, display: { xs: 'none', md: 'flex' } }}>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
					</Search>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => {
								return (
									<MenuItem key={setting} onClick={handleCloseUserMenu}>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								);
							})}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default TopBar;
