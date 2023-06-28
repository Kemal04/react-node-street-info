import React from 'react'

import ver_1 from '../../../assets/gallery/vertical/1.jpg'
import ver_2 from '../../../assets/gallery/vertical/2.jpg'
import ver_3 from '../../../assets/gallery/vertical/3.jpg'
import ver_4 from '../../../assets/gallery/vertical/4.jpg'
import ver_5 from '../../../assets/gallery/vertical/5.jpg'
import ver_6 from '../../../assets/gallery/vertical/6.jpg'
import ver_7 from '../../../assets/gallery/vertical/7.jpg'
import ver_8 from '../../../assets/gallery/vertical/8.jpg'
import ver_9 from '../../../assets/gallery/vertical/9.jpg'
import ver_10 from '../../../assets/gallery/vertical/10.jpg'
import ver_11 from '../../../assets/gallery/vertical/11.jpg'
import ver_12 from '../../../assets/gallery/vertical/12.jpg'

import hor_1 from '../../../assets/gallery/horizontal/1.jpg'
import hor_2 from '../../../assets/gallery/horizontal/2.jpg'
import hor_3 from '../../../assets/gallery/horizontal/3.jpg'
import hor_4 from '../../../assets/gallery/horizontal/4.jpg'
import hor_5 from '../../../assets/gallery/horizontal/5.jpg'
import hor_6 from '../../../assets/gallery/horizontal/6.jpg'
import hor_7 from '../../../assets/gallery/horizontal/7.jpg'
import hor_8 from '../../../assets/gallery/horizontal/8.jpg'
import hor_9 from '../../../assets/gallery/horizontal/9.jpg'
import hor_10 from '../../../assets/gallery/horizontal/10.jpg'
import hor_11 from '../../../assets/gallery/horizontal/11.jpg'
import hor_12 from '../../../assets/gallery/horizontal/12.jpg'

import { SlideshowLightbox } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'
import { useTranslation } from 'react-i18next'

const Galleries = () => {

    const { t } = useTranslation();

    return (
        <>
            <div className='container my-5 py-5'>
                <div className="text-center fw-bold my-5 display-5">{t('gallery')}</div>
                <div className="row g-3">
                    <div className='col-xl-3'>
                        <SlideshowLightbox showThumbnails>
                            <img src={ver_1} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={hor_1} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={ver_2} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={hor_2} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={ver_3} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={hor_3} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                        </SlideshowLightbox>
                    </div>
                    <div className='col-xl-3'>
                        <SlideshowLightbox showThumbnails>
                            <img src={hor_4} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={ver_4} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={hor_5} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={ver_5} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={hor_6} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={ver_6} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                        </SlideshowLightbox>
                    </div>
                    <div className='col-xl-3'>
                        <SlideshowLightbox showThumbnails>
                            <img src={ver_7} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={hor_7} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={ver_8} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={hor_8} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={ver_9} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={hor_9} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                        </SlideshowLightbox>
                    </div>
                    <div className='col-xl-3'>
                        <SlideshowLightbox showThumbnails>
                            <img src={hor_10} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={ver_10} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={hor_11} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={ver_11} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={hor_12} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                            <img src={ver_12} alt="Surat" className='img-fluid mb-3 shadow-sm' />
                        </SlideshowLightbox>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Galleries