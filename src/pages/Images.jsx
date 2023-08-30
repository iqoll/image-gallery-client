import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AddModal from './AddModal'

function Images() {
	const [images, setImages] = useState([])
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

	const fetchAllImages = async () => {
		try {
			const res = await axios.get('http://localhost:5000/images')
			setImages(res.data)
			console.log(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchAllImages()
	}, [])

	return (
		<>
			{/* Navbar */}
			<div className='p-20 flex flex-col justify-between space-y-5 md:flex-row md:space-y-0'>
				<div className='flex justify-between border-b'>
					<input
						type='text'
						placeholder='Search'
						className='ml-6 border-none md:w-80 placeholder:font-thin focus:outline-none'
					/>
					<button>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-8 text-gray-300 duration-200 hover:scale-110'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							fill='none'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
							<circle cx='10' cy='10' r='7'></circle>
							<line x1='21' y1='21' x2='15' y2='15'></line>
						</svg>
					</button>
				</div>

				<button
					onClick={openModal}
					className='py-3 px-14 text-lg font-normal text-white bg-black border border-black rounded-md shadow-2xl duration-200 hover:bg-white hover:text-black'
				>
					Upload
				</button>
				<AddModal
					isOpen={isModalOpen}
					onRequestClose={closeModal}
					fetchAllImages={fetchAllImages}
				/>
			</div>

			{/* Gallery */}
			<div className='p-20 grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
				{images.map((image) => (
					<div className='relative group' key={images.id}>
						{image.url && (
							<img src={image.url} alt={image.name} className='w-74' />
						)}
						<div className='absolute bottom-0 left-0 right-0 p-2 px-4 text-white duration-500 bg-black opacity-0 group-hover:opacity-100 bg-opacity-40 w-full'>
							<div className='flex justify-between'>
								<div className='font-normal'>
									<p className='text-sm'>{image.name}</p>
									<p className='text-xs'>
										{image.likes} Likes - {image.type}
									</p>
								</div>
								<button className='flex items-center hover:scale-110'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
									>
										<path
											fill='currentColor'
											d='m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z'
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	)
}
export default Images
