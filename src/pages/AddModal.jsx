import { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'

function AddModal({ isOpen, onRequestClose, fetchAllImages }) {
	const [images, setImages] = useState({
		url: '',
		name: '',
		type: '',
	})

	const handleChange = (e) => {
		setImages((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleClick = async (e) => {
		e.preventDefault()
		try {
			await axios.post('http://localhost:5000/images', images)
			onRequestClose()
			fetchAllImages()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel='Add Image Modal'
		>
			<div className='flex flex-col items-center justify-center min-h-screen relative'>
				<h2 className='mb-4 font-bold text-2xl'>Add a New Image</h2>
				<div className='p-16 bg-slate-200 rounded-xl shadow-2xl'>
					<div className='flex flex-col space-y-3'>
						<input
							className='p-2 rounded-md'
							type='text'
							name='name'
							placeholder='name'
							onChange={handleChange}
						/>
						<input
							className='p-2 rounded-md'
							type='text'
							name='type'
							placeholder='type'
							onChange={handleChange}
						/>
						<input
							className='p-2 rounded-md'
							type='text'
							name='url'
							placeholder='image url'
							onChange={handleChange}
						/>
						<button
							onClick={handleClick}
							className='px-3 py-2 bg-blue-600 rounded-full text-white font-bold'
						>
							Add Image
						</button>
						{/* Close Modal Button */}
						<button
							onClick={onRequestClose}
							className='group absolute top-1 right-1 flex items-center justify-center w-8 h-8 bg-white rounded-full md:bg-white md:top-4 hover:cursor-pointer hover:-translate-y-0.5 transition duration-150'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='w-6 h-6 text-black group-hover:text-gray-600'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
								<line x1='18' y1='6' x2='6' y2='18'></line>
								<line x1='6' y1='6' x2='18' y2='18'></line>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</Modal>
	)
}
export default AddModal
