import React, { useEffect, useRef, useState } from 'react';
import { useOpenCv } from 'opencv-react';
import Results from '../modals/Results';
import { doOCR, doThreshold } from '../utils/OCR';
import { useCustomEventListener } from 'react-custom-events';
import LoadingScreen from '../utils/LoadingScreen';
import Modal from '../utils/Modal';
import { payment_methods, spending_categories } from '../utils/Options';

function HeroHome() {

    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [results, setResults] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const cv = useOpenCv().cv;

    const imageSrc = useRef(null);
    const outputCanvas = useRef(null);

    const onFileUpload = (e) => {
        imageSrc.current.src = URL.createObjectURL(e.target.files[0]);
        setIsLoading(true);
    }

    const onImageLoad = async() => {
        doThreshold(cv, imageSrc.current);
        setResults(await doOCR(outputCanvas.current));
        setShowResults(true);
    }

    useCustomEventListener('ocrprogress', data => {
        setProgress(data.detail.progress);
        console.log(data.detail.progress);
        if(data.detail.progress === 1) {
            console.log("end")
            setIsLoading(false);
        }
    });

    useEffect(() => {
        setIsLoading(false);
    }, [showResults, results]);

    return (
        <>
            {/*<Results show={true} results={*/}
            {/*    {*/}
            {/*        'total': 23,*/}
            {/*        'spending_category': spending_categories.indexOf('Entertainment/Games'),*/}
            {/*        'payment_method': payment_methods.indexOf('Visa Card')*/}
            {/*    }*/}
            {/*}/>*/}
            <section className="relative">
                <img alt='' ref={imageSrc} id="imageSrc" height="850" onLoad={onImageLoad}/>
                <canvas ref={outputCanvas} id="outputCanvas" height="850"/>
                {isLoading ? <LoadingScreen progress={progress}/> :
                    <div>
                        {(showResults && results) && (<Results show={showResults} results={{
                            'total': results.total,
                            'spending_category': spending_categories.indexOf(results.spending_category),
                            'payment_method': payment_methods.indexOf(results.payment_method)
                        }}/>)}
                        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
                             aria-hidden="true">
                            <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
                                        <stop stopColor="#FFF" offset="0%"/>
                                        <stop stopColor="#EAEAEA" offset="77.402%"/>
                                        <stop stopColor="#DFDFDF" offset="100%"/>
                                    </linearGradient>

                                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-02">
                                        <stop stopColor="#4FD1C5" offset="0%"/>
                                        <stop stopColor="#81E6D9" offset="25.871%"/>
                                        <stop stopColor="#338CF5" offset="100%"/>
                                    </linearGradient>
                                </defs>

                                <g fill="url(#illustration-01)" fillRule="evenodd">
                                    <circle cx="1232" cy="128" r="128"/>
                                </g>
                                <g fill="url(#illustration-02)" fillRule="evenodd">
                                    <circle cx="155" cy="443" r="64"/>
                                </g>
                            </svg>
                        </div>

                        <div className="max-w-6xl mx-auto px-4 sm:px-6">

                            {/* Hero content */}
                            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                                {/* Section header */}
                                <div className="text-center pb-12 md:pb-16">
                                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                                        data-aos="zoom-y-out">
                                        A quick
                                        <span
                                            className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"> ritual</span>
                                        <span
                                            className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"> after every</span>
                                        <span
                                            className="bg-clip-text text-transparent bg-gradient-to-l from-blue-600 to-teal-500"> receipt</span>
                                    </h1>
                                    <div className="max-w-3xl mx-auto">
                                        <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out"
                                           data-aos-delay="150">
                                            Don't waste time collecting receipts and recording them at home. Scan them here and now, to track your spending as you spend!
                                        </p>
                                        <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                                             data-aos="zoom-y-out"
                                             data-aos-delay="300">
                                            <div>

                                                <label htmlFor="upload" onChange={onFileUpload}>
                                                <span
                                                    className="btn cursor-pointer text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0">
                                                    Start using
                                                </span>
                                                    <input type="file" id="upload" style={{ "display": "none" }}
                                                           accept="image/jpeg, image/png"/>
                                                </label>
                                            </div>
                                            <div>
                                                <a
                                                    className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
                                                    href="https://github.com/Kenny2github/Rite"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Source code
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Hero image */}
                                <div>
                                    <div className="relative flex justify-center mb-8" data-aos="zoom-y-out"
                                         data-aos-delay="450">
                                        <div className="flex flex-col justify-center">
                                            <img className="mx-auto" src={require('../images/hero-image.png').default}
                                                 width="768"
                                                 height="432" alt="Hero"/>
                                            <svg className="absolute inset-0 max-w-full mx-auto md:max-w-none h-auto"
                                                 width="768"
                                                 height="432" viewBox="0 0 768 432" xmlns="http://www.w3.org/2000/svg"
                                                 xmlnsXlink="http://www.w3.org/1999/xlink">
                                                <g fill="none" fillRule="evenodd">
                                                    <circle fillOpacity=".04" fill="url(#hero-ill-a)" cx="384" cy="216"
                                                            r="128"/>
                                                    <circle fillOpacity=".16" fill="url(#hero-ill-b)" cx="384" cy="216"
                                                            r="96"/>
                                                    <g fillRule="nonzero">
                                                        <use fill="#000" xlinkHref="#hero-ill-d"/>
                                                        <use fill="url(#hero-ill-e)" xlinkHref="#hero-ill-d"/>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                        <button
                                            className="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setVideoModalOpen(true);
                                            }}
                                            aria-controls="modal">
                                            <svg
                                                className="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 flex-shrink-0"
                                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z"/>
                                                <path d="M10 17l6-5-6-5z"/>
                                            </svg>
                                            <span className="ml-3">Watch the demo (5 min)</span>
                                        </button>
                                    </div>

                                    {/* Modal */}
                                    <Modal id="modal" ariaLabel="modal-headline" show={videoModalOpen}
                                           handleClose={() => setVideoModalOpen(false)}>
                                        <div className="relative pb-9/16">
                                            <iframe
                                                className="absolute w-full h-full"
                                                src="https://www.youtube.com/embed/zzbQLMdjJQI"
                                                title="Video" allowFullScreen>

                                            </iframe>
                                        </div>
                                    </Modal>

                                </div>

                            </div>

                        </div>
                    </div>
                }
            </section>
        </>
    );
}

export default HeroHome;