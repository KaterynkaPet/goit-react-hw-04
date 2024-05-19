import ReactModal from 'react-modal';
import css from './ImageModal.module.css'
import { useEffect } from 'react';

const ImageModal = ({ image, onClose }) => {
    useEffect(() => {
        ReactModal.setAppElement('#root');
    }, []);
    return (
        <ReactModal
            isOpen={!!image}
            onRequestClose={onClose}
            contentLabel='Image Modal'
            className={css.modal}
            overlayClassName={css.overlay}
            appElement={document.getElementById('root')}
        >
            {image && (
                <div className={css.imageContainer}>
                    <img src={image.urls.regular} alt={image.description} className={css.image} />
                </div>
            )}
        </ReactModal>
    );
}

export default ImageModal;