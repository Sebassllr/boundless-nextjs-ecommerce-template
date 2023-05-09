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
	return (
		<MainLayout mainMenu={mainMenu} footerMenu={footerMenu}>
			<div className='container'>
				<div className='container'>
				<h2 className='page-heading page-heading_h1  page-heading_m-h1'>Our products:</h2>
				<ProductsSliderByQuery
					query={{collection: ['main-page'], sort: 'in_collection'}}
					wrapperClassName='page-block'
				/>
				</div>
			</div>
			<CoverTextInCenter
				showChevronDown
				img={bgImg.src}
				imgPortrait={bgPortraitImg.src}
				content={{
					intro: 'Who we are:',
					head:  '',
					subHead: 'Waning Rose boutique: We are a Colombian E-commerce whose main purpose is to provide women in Colombia and South America with exclusive and accessible beauty products. We promote love, self-acceptance and self-worth. We try to meet the needs of both beauty and care and well-being of the target audience. Offering everything from personal care products to clothing and complementary accessories. It should be noted that we faithfully believe in the Colombian industry, therefore in our company only articles produced in Colombia are offered.'
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