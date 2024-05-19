import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ images, onImageClick, lastImageRef }) => {
    if (images.length === 0){
        return null;
    }

return (
    <ul className={css.gallery}>
        {images.map((image, index) =>
            <li key={image.id}>
                <div>
                    <ImageCard
                        key={image.id}
                        image={image}
                        onClick={() => onImageClick(image)}
                    ref={index === images.length - 1 ? lastImageRef : null} />
                </div>
            </li>
        )}
    </ul>
    );
};


export default ImageGallery;