import {IProduct} from 'boundless-api-client';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import MainLayout from '../layouts/Main';
import {apiClient} from '../lib/api';
import {makeAllMenus} from '../lib/menu';
import {IMenuItem} from '../@types/components';
import CoverTextInCenter from '../components/CoverTextInCenter';
import bgImg from '../assets/cover-bg.jpeg';
import bgPortraitImg from '../assets/cover-bg-portrait.jpg';
import ProductsSliderByQuery from '../components/ProductsSliderByQuery';

export default function IndexPage({products, mainMenu, footerMenu}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	console.log(products);
	return (
		<MainLayout mainMenu={mainMenu} footerMenu={footerMenu}>
			<div className='container'>
				{/*<MainPageSlider />*/}
				<div className='container'>
				<h2 className='page-heading page-heading_h1  page-heading_m-h1'>Our products:</h2>
				<ProductsSliderByQuery
					query={{collection: ['main-page'], sort: 'in_collection'}}
					wrapperClassName='page-block'
				/>
			</div>{/*

				<div className='row'>
					<nav className='col-lg-3 d-none d-lg-block'>
						{mainMenu && <VerticalMenu menuList={mainMenu} />}
					</nav>
			A		<div className='col-lg-9 col-md-12'>
						<h1 className='page-heading page-heading_h1  page-heading_m-h1'>Menguante rosa</h1>
						<ProductsList products={products} query={{}}/>
					</div>
				</div>
	*/}
			</div>
			<CoverTextInCenter
				showChevronDown
				img={bgImg.src}
				imgPortrait={bgPortraitImg.src}
				content={{
					intro: 'Who we are:',
					head: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit leo orci, sit amet condimentum felis faucibus non. Nulla facilisi',
					subHead: ''
				}}
				shadow={{
					opacity: 0.5,
					backgroundColor: '#000'
				}}
				link={'http://google.com'}
			/>

		</MainLayout>
	);
}

export const getServerSideProps: GetServerSideProps<IIndexPageProps> = async () => {
	const categoryTree = await apiClient.catalog.getCategoryTree({menu: 'category'});
	const {products} = await apiClient.catalog.getProducts({collection: ['main-page'], sort: 'in_collection'});

	const menus = makeAllMenus({categoryTree});

	return {
		props: {
			products,
			...menus
		}
	};
};

interface IIndexPageProps {
	products: IProduct[];
	mainMenu: IMenuItem[];
	footerMenu: IMenuItem[];
}
/*
function MainPageSlider() {
	const slides = [
		{
			'img': cliffImg.src,
			'link': '',
			'caption': 'Three things cannot be long hidden: The Sun, The Moon, and The Truth.',
			'captionPosition': 'center',
			'useFilling': true,
			'fillingColor': '#000000',
			'fillingOpacity': 0.40
		},
		{
			'img': cliff2Img.src,
			'link': '',
			'caption': 'Pray not for easy lives, pray to be stronger men.',
			'captionPosition': null,
			'useFilling': true,
			'fillingColor': '#000000',
			'fillingOpacity': 0.4
		}
	];

	return (
		<SwiperSlider
			showPrevNext
			roundCorners
			pagination='progressbar'
			size={'large'}
			slides={slides}
			className={'mb-4'}
		/>
	);
}*/