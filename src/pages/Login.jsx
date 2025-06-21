import { useEffect } from 'react';
import LogingIn from '../Components/loggingin';
import pexels1 from '../assets/pexels-1.jpg';
import pexels2 from '../assets/pexels-2.jpg';
import pexels3 from '../assets/pexels-3.jpg';
import pexels4 from '../assets/pexels-4.jpg';
import pexels5 from '../assets/pexels-5.jpg';
import pexels6 from '../assets/pexels-6.jpg';
import pexels7 from '../assets/pexels-7.jpg';
import pexels8 from '../assets/pexels-8.jpg';
import pexels9 from '../assets/pexels-9.jpg';
import pexels10 from '../assets/pexels-10.jpg';
import pexels11 from '../assets/pexels-11.jpg';

const bgImages = [pexels1, pexels2, pexels3, pexels4, pexels5, pexels6, pexels7, pexels8, pexels9, pexels10, pexels11];

export default function Login() {
    const bgPicker = Math.floor(Math.random() * bgImages.length);
    const bgImg = bgImages[bgPicker];

    useEffect(() => {
        console.log('Selected image:', bgPicker + 1);
    }, []);

    return (
        <div
            className="relative w-screen h-screen flex items-center justify-center overflow-x-hidden"
            style={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '100vh',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute inset-0 bg-black h-fit opacity-40 backdrop-blur-sm bg-opacity-60 z-10"></div>

            <div className="relative z-20 w-full max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-10">
                <div className="text-white md:ml-7 w-full md:w-1/2 text-center md:text-left">
                    <img
                        className="w-30 h-auto select-none mx-auto md:mx-0 mb-4"
                        src="/bytemark-secondary-no-bg.png"
                        alt="BYTEMARK INSTITUTE LOGO"
                    />
                    <p className="text-xl md:text-2xl font-semibold shadow-5xl text-shadow-black leading-snug">
                        Sign In or Create Your Account
                    </p>
                </div>

                <div className="w-full lg:w-1/2 grid lg:grid-cols-2 grid-cols-1">
                        <LogingIn />
                </div>
            </div>
        </div>
    );
}
