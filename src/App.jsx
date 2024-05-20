import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

import ErrorMessage from './components/ErrorMessage/ErrorMessage'
import ImageGallery from './components/ImageGallery/ImageGallery'
import ImageModal from './components/ImageModal/ImageModal'
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn'
import Loader from './components/Loader/Loader'
import SearchBar from './components/SearchBar/SearchBar'

import { getData } from './gallery-api'


function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
   
  const lastImageRef = useRef(null);

  useEffect(() => {
    if (query !== '') {
      const fetchData = async () => {
      setLoading(true);
      try {
        const { data, total_pages } = await getData(query, page);
          if (page === 1) {
            setImages(data);
            
        } else {
          setImages(prevImages => [...prevImages, ...data]);
        }
        setShowBtn(total_pages && total_pages !== page);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    } else {
      setShowBtn(false);
  }
  }, [query, page]);
  
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };
    
 
  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  return (
    <div className="app">
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {showBtn && <LoadMoreBtn onLoadMore={loadMoreImages} />}
      {modalOpen && (
        <ImageModal
          image={selectedImage}
          onClose={closeModal}
        />
      )}
      <div ref={lastImageRef} />
      
    </div>
  )
}

export default App
