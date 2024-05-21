import css from './ImageCard.module.css'

const ImageCard = ({ image, onClick }) => {
  
    return (
        <div className={css.card} >
            <img src={image.urls.small} alt={image.description} onClick={onClick} />
        </div>
    );
};

export default ImageCard;