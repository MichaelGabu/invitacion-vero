import React, { useEffect, useRef } from 'react';
import { animate, createScope, utils, type Scope, onScroll } from '../../lib/anime.esm.min.js';
import './prayer.css';
import texture from '../../assets/images/prayer-texture.webp';

interface PrayerProps {
    prayer: string;
}

const Prayer: React.FC<PrayerProps> = ({ prayer }) => {
    const root = useRef<HTMLDivElement>(null);
    const scope = useRef<Scope | null>(null);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        scope.current = createScope({ root })
        scope.current.add(() => {
            const textureImage = utils.$('.prayer__texture-image');
            animate(textureImage, {
                opacity: [0.4, 1],
                scale: [0.95, 1],
                duration: 500,
                ease: 'easeOutQuad',
                autoplay: onScroll({ target: root.current!, enter: 'bottom top' })
            });
        });

        return () => scope.current?.revert();
    }, []);
    
    return (
        <div className="section prayer" ref={root}>
            <div className="section__container prayer__container">
                <figure className="prayer__texture">
                    <img className="prayer__texture-image" src={texture} alt="" />
                </figure>
                <blockquote className="prayer__text">{prayer}</blockquote>
            </div>
        </div>
    );
};

export default Prayer;
