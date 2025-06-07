import { Link } from 'react-router-dom';
import { Typography, Stack, Divider } from '@mui/material';

const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white text-center p-5 absolute bottom-0 w-full border-t border-gray-500">
			<Typography variant="body1" color="inherit" className="">
				{'Made with ❤️ by '}
				<a
					href="https://portfolio-website-ocqb.vercel.app/"
					target="_blank"
					className="bg-gradient-to-r from-blue-300 via-purple-400 to-blue-300 bg-clip-text text-transparent italic"
				>
					Sarvesh Chaurasia
				</a>

			</Typography>

			<Typography variant="body2" color="inherit" className="italic">
				&copy; {new Date().getFullYear()} CryptoWorld | All rights reserved.
			</Typography>

			<div className="flex justify-center my-2">
				<Divider className="bg-gray-100 w-full md:w-[50vw] lg:w-[30vw]" />
			</div>

			<Stack direction="row" spacing={4} justifyContent="center" className="mt-2">
				<Link to="/" className="hover:text-blue-300">Home</Link>
				<Link to="/cryptocurrencies" className="hover:text-green-300">Cryptocurrencies</Link>
				<Link to="/exchanges" className="hover:text-yellow-300">Exchanges</Link>
				<Link to="/news" className="hover:text-red-300">News</Link>
			</Stack>
		</footer>
	)
}

export default Footer;