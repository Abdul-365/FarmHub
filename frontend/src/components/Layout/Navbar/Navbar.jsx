import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import SignIn from './SignIn'
import Cart from './Cart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const mainPages = [
    {
        name: 'Crops',
        link: '/crops'
    },
    {
        name: 'Services',
        link: '/services'
    },
    {
        name: 'Shop',
        link: '/shop'
    }
];

const shopPages = [
    {
        name: 'Shop Home',
        link: '/shop'
    },
    {
        name: 'Fertilizers',
        link: '/shop/products/category/Fertilizers'
    },
    {
        name: 'Pesticides',
        link: '/shop/products/category/Pesticides'
    },
    {
        name: 'Crop-Tonics',
        link: '/shop/products/category/Crop-Tonics'
    },
    {
        name: 'Seeds',
        link: '/shop/products/category/Seeds'
    },
    {
        name: 'Traps',
        link: '/shop/products/category/Traps'
    },
];

function NavBar({
    shopNav,
    setTrigger,
    user,
    loginDialog,
    setLoginDialog,
    updateInCart,
    removeFromCart,
    setUserTab
}) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [pages, setPages] = useState([]);

    useEffect(() => {
        shopNav ? setPages(shopPages) : setPages(mainPages);
    }, [shopNav])

    function signOut() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/logout`, { withCredentials: true })
            .then(() => setTrigger(prevValue => !prevValue))
            .catch((err) => console.log(err));
    }

    const [cartDrawer, setCartDrawer] = useState(false);

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* -------------------------------- Mobile View -------------------------------- */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon fontSize='inherit' />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            disableScrollLock={true}
                        >
                            {pages.map((page) => (
                                <MenuItem component={Link} to={page.link} key={page.name} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                            {!user ?
                                <MenuItem onClick={() => { handleCloseNavMenu(); setLoginDialog(true); }}>
                                    <Typography textAlign="center">Sign In</Typography>
                                </MenuItem>
                                : null
                            }
                        </Menu>
                    </Box>
                    <Box
                        component={Link}
                        to='/'
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            ml: 1
                        }}>
                        <Box
                            component='img'
                            src="/Images/main-logo.png"
                            alt='FarmHub Logo'
                            width='2.5rem'
                        />
                    </Box>
                    {/* -------------------------------- Desktop View -------------------------------- */}
                    <Box
                        sx={{
                            flex: '1 1 0',
                            width: 0,
                            display: { xs: 'none', md: 'flex' }
                        }}>
                        <Link to='/'>
                            <Box
                                component='img'
                                src="/Images/main-logo.png"
                                alt='FarmHub Logo'
                                width='3.5rem'
                            />
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            flex: '2 1 0',
                            width: 0,
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'center'
                        }}>
                        {pages.map((page) => (
                            <Button
                                component={Link}
                                to={page.link}
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, fontWeight: 'bold', minWidth: 0, color: 'tertiary.main', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                        {!user ?
                            <Button
                                onClick={() => { handleCloseNavMenu(); setLoginDialog(true); }}
                                sx={{ my: 2, fontWeight: 'bold', color: 'tertiary.main', display: 'block' }}
                            >
                                Sign In
                            </Button>
                            : null
                        }
                    </Box>
                    {/* -------------------------------- Universal View -------------------------------- */}
                    <Box
                        sx={{
                            display: 'flex',
                            flex: '1 1 0',
                            width: 0,
                            justifyContent: 'flex-end',
                        }}>
                        {/* <IconButton size='large'>
                            <SearchIcon color="tertiary" fontSize='inherit' />
                        </IconButton> */}
                        {user ?
                            <>
                                <IconButton onClick={() => setCartDrawer(true)} size='large'>
                                    <Badge badgeContent={user.cartItems} color="secondary">
                                        <ShoppingCartIcon color="tertiary" fontSize='inherit' />
                                    </Badge>
                                </IconButton>
                                <Cart
                                    user={user}
                                    cartDrawer={cartDrawer}
                                    setCartDrawer={setCartDrawer}
                                    updateInCart={updateInCart}
                                    removeFromCart={removeFromCart}
                                />
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mx: 1 }}>
                                        <Avatar alt="Remy Sharp" src={user.avatar} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                    disableScrollLock={true}
                                >
                                    <MenuItem component={Link} to='/user' onClick={() => setUserTab(0)} key="Profile">
                                        <Typography textAlign="center">Profile</Typography>
                                    </MenuItem>
                                    <MenuItem component={Link} to='/user' onClick={() => setUserTab(2)} key="Orders">
                                        <Typography textAlign="center">Orders</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => { signOut(); handleCloseUserMenu() }}>
                                        <Typography textAlign="center">Sign Out</Typography>
                                    </MenuItem>
                                    {user.role === 'admin' ?
                                        <MenuItem component={Link} to='/user' onClick={() => setUserTab(3)} key="Dashboard">
                                            <Typography textAlign="center">Dashboard</Typography>
                                        </MenuItem>
                                        :
                                        null
                                    }
                                </Menu>
                            </>
                            : null
                        }
                    </Box>
                </Toolbar>
            </Container>
            <SignIn open={loginDialog} setOpen={setLoginDialog} setTrigger={setTrigger} />
        </AppBar>
    );
}
export default NavBar;