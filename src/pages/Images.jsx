import { useEffect, useState } from 'react'
import axios from 'axios'
import AddModal from './AddModal'
import UpdateModal from './UpdateModal'

function Images() {
	const [images, setImages] = useState([])
	const [selectedImageId, setSelectedImageId] = useState(null)
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

	const openAddModal = () => {
		setIsAddModalOpen(true)
	}
	const openUpdateModal = (imageId) => {
		setSelectedImageId(imageId)
		setIsUpdateModalOpen(true)
	}

	const closeAddModal = () => {
		setIsAddModalOpen(false)
	}

	const closeUpdateModal = () => {
		setIsUpdateModalOpen(false)
	}

	const fetchAllImages = async () => {
		try {
			const res = await axios.get(
				'https://book-crud-heroku-679d519b0481.herokuapp.com/images'
			)
			setImages(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	const handleSearch = async (e) => {
		const q = e.target.value
		console.log(q)
		try {
			const res = await axios.get(
				`https://book-crud-heroku-679d519b0481.herokuapp.com/images/search`,
				{
					params: { name: q },
				}
			)
			console.log(res.data)
			setImages(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	const handleLike = async (imageId) => {
		try {
			await axios.put(
				`https://book-crud-heroku-679d519b0481.herokuapp.com/images/${imageId}/like`
			)
			fetchAllImages()
		} catch (error) {
			console.log(error)
		}
	}

	const handleDelete = async (imageId) => {
		try {
			const isConfirmed = window.confirm('Are you sure you want to delete?')

			if (!isConfirmed) {
				return
			}
			await axios.delete(
				`https://book-crud-heroku-679d519b0481.herokuapp.com/images/${imageId}`
			)
			fetchAllImages()
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
						onChange={handleSearch}
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
					onClick={openAddModal}
					className='py-3 px-14 text-lg font-normal text-white bg-black border border-black rounded-md shadow-2xl duration-200 hover:bg-white hover:text-black'
				>
					Upload
				</button>
				<AddModal
					isOpen={isAddModalOpen}
					onRequestClose={closeAddModal}
					fetchAllImages={fetchAllImages}
				/>
			</div>

			{/* Gallery */}
			<div className='p-20 grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
				{images.map((image) => (
					<div className='relative group' key={image.id}>
						{image.url && (
							<img src={image.url} alt={image.name} className='w-74' />
						)}
						<div className='absolute bottom-0 left-0 right-0 p-2 px-4 text-white duration-500 bg-black opacity-0 group-hover:opacity-100 bg-opacity-40 w-full'>
							<div className='flex justify-between'>
								<div className='font-normal'>
									<p className='text-sm'>{image.name}</p>
									<div className='flex space-x-2 items-center'>
										<p className='text-xs'>
											{image.likes} Likes - {image.type}
										</p>
										<button
											className='hover:scale-110'
											onClick={() => openUpdateModal(image.id)}
										>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												width='20'
												height='20'
												viewBox='0 0 24 24'
											>
												<path
													fill='none'
													stroke='currentColor'
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M4 20h4L18.5 9.5a2.828 2.828 0 1 0-4-4L4 16v4m9.5-13.5l4 4'
												/>
											</svg>
										</button>
										<UpdateModal
											isOpen={isUpdateModalOpen && selectedImageId === image.id}
											onRequestClose={closeUpdateModal}
											fetchAllImages={fetchAllImages}
											imageId={image.id}
											initialImage={image}
										/>
										<button
											onClick={() => handleDelete(image.id)}
											className='text-white'
										>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='w-5 h-5 text-white hover:scale-110'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='currentColor'
												fill='none'
												strokeLinecap='round'
												strokeLinejoin='round'
											>
												<path
													stroke='none'
													d='M0 0h24v24H0z'
													fill='none'
												></path>
												<line x1='18' y1='6' x2='6' y2='18'></line>
												<line x1='6' y1='6' x2='18' y2='18'></line>
											</svg>
										</button>
									</div>
								</div>
								<button
									onClick={() => handleLike(image.id)}
									className='flex items-center hover:scale-110'
								>
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
